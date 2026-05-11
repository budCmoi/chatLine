import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AssistantRepository } from '../common/assistant.repository';
import type {
  ChatResponse,
  ConversationMessage,
  ExperienceMode,
  ProviderDefinition,
} from '../common/assistant.types';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly assistantRepository: AssistantRepository,
    private readonly configService: ConfigService,
  ) {}

  async respond(payload: ChatRequestDto): Promise<ChatResponse> {
    const provider = this.resolveProvider(payload.providerId);

    const conversation = this.assistantRepository.ensureConversation(
      payload.conversationId,
      payload.prompt,
      payload.mode,
    );

    this.assistantRepository.appendMessage(conversation.id, {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: payload.prompt.trim(),
      timestamp: new Date().toISOString(),
    });

    const content = await this.composeReply(
      conversation.messages,
      payload.prompt,
      provider,
      payload.mode,
    );
    const timestamp = new Date().toISOString();

    this.assistantRepository.appendMessage(conversation.id, {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      providerId: provider.id,
      content,
      timestamp,
    });

    return {
      conversationId: conversation.id,
      providerId: provider.id,
      providerLabel: provider.name,
      content,
      timestamp,
    };
  }

  private resolveProvider(providerId: string): ProviderDefinition {
    const textProviders = this.assistantRepository.listProviders('text');
    const requestedProvider =
      this.assistantRepository.getProvider(providerId) ?? textProviders[0];

    if (requestedProvider.capability === 'text' && this.getLiveProviderConfig(requestedProvider)) {
      return requestedProvider;
    }

    return textProviders.find((provider) => this.getLiveProviderConfig(provider)) ?? requestedProvider;
  }

  private async composeReply(
    messages: ConversationMessage[],
    prompt: string,
    provider: ProviderDefinition,
    mode: ExperienceMode,
  ): Promise<string> {
    const liveReply = await this.generateLiveReply(messages, provider, mode);

    if (liveReply) {
      return liveReply;
    }

    return buildFallbackReply(prompt, provider, mode);
  }

  private async generateLiveReply(
    messages: ConversationMessage[],
    provider: ProviderDefinition,
    mode: ExperienceMode,
  ): Promise<string | null> {
    const providerConfig = this.getLiveProviderConfig(provider);

    if (!providerConfig) {
      return null;
    }

    try {
      if (providerConfig.kind === 'anthropic') {
        return await this.requestAnthropicReply(providerConfig, messages, provider, mode);
      }

      return await this.requestOpenAiReply(providerConfig, messages, provider, mode);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown live chat error';
      this.logger.warn(`Live reply failed for ${provider.id}: ${message}`);
      return null;
    }
  }

  private async requestOpenAiReply(
    config: OpenAiProviderConfig,
    messages: ConversationMessage[],
    provider: ProviderDefinition,
    mode: ExperienceMode,
  ): Promise<string | null> {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        temperature: mode === 'expert' ? 0.45 : 0.7,
        max_tokens: mode === 'expert' ? 900 : 320,
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(provider, mode),
          },
          ...toModelMessages(messages),
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with ${response.status}`);
    }

    const payload = (await response.json()) as OpenAiChatCompletionResponse;
    return normalizeReply(extractOpenAiText(payload));
  }

  private async requestAnthropicReply(
    config: AnthropicProviderConfig,
    messages: ConversationMessage[],
    provider: ProviderDefinition,
    mode: ExperienceMode,
  ): Promise<string | null> {
    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: config.model,
        system: buildSystemPrompt(provider, mode),
        max_tokens: mode === 'expert' ? 900 : 320,
        temperature: mode === 'expert' ? 0.45 : 0.7,
        messages: toModelMessages(messages),
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic request failed with ${response.status}`);
    }

    const payload = (await response.json()) as AnthropicMessageResponse;
    return normalizeReply(
      payload.content
        .filter((item) => item.type === 'text')
        .map((item) => item.text)
        .join(''),
    );
  }

  private getLiveProviderConfig(provider: ProviderDefinition): LiveProviderConfig | null {
    if (provider.id === 'openai-gpt') {
      const apiKey = this.configService.get<string>('OPENAI_API_KEY');

      if (!apiKey) {
        return null;
      }

      return {
        kind: 'openai',
        apiKey,
        model: this.configService.get<string>('OPENAI_MODEL') ?? 'gpt-4.1-mini',
        endpoint: this.configService.get<string>('OPENAI_API_URL') ?? 'https://api.openai.com/v1/chat/completions',
      };
    }

    if (provider.id === 'anthropic-claude') {
      const apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');

      if (!apiKey) {
        return null;
      }

      return {
        kind: 'anthropic',
        apiKey,
        model:
          this.configService.get<string>('ANTHROPIC_MODEL') ?? 'claude-3-7-sonnet-latest',
        endpoint:
          this.configService.get<string>('ANTHROPIC_API_URL') ?? 'https://api.anthropic.com/v1/messages',
      };
    }

    return null;
  }
}

export function buildFallbackReply(
  prompt: string,
  _provider: ProviderDefinition,
  mode: ExperienceMode,
): string {
  const normalizedPrompt = normalizePrompt(prompt);
  const isFrench = looksFrench(normalizedPrompt);

  if (!normalizedPrompt) {
    return isFrench
      ? 'Je suis la. Pose-moi ta question et je te repondrai directement.'
      : 'I am here. Ask your question and I will answer directly.';
  }

  if (isGreeting(normalizedPrompt)) {
    return isFrench
      ? 'Salut. Je suis la pour t aider. Dis-moi simplement ce que tu veux faire, comprendre ou corriger.'
      : 'Hi. I am here to help. Tell me what you want to do, understand, or fix.';
  }

  if (isTechnicalRequest(normalizedPrompt)) {
    return isFrench
      ? mode === 'expert'
        ? 'On peut traiter ca proprement. Envoie-moi le comportement attendu, le symptome exact et, si tu l as, le message d erreur ou le morceau de code concerne. Je te proposerai ensuite un diagnostic clair et un correctif concret.'
        : 'Decris-moi le bug, le resultat attendu ou le message d erreur, et je te proposerai un correctif concret.'
      : mode === 'expert'
        ? 'We can handle this properly. Send me the expected behavior, the exact symptom, and, if you have it, the error message or the relevant code. I will then give you a clear diagnosis and a concrete fix.'
        : 'Describe the bug, the expected result, or the error message, and I will suggest a concrete fix.';
  }

  return isFrench
    ? mode === 'expert'
      ? `J ai bien compris ta demande sur "${clipForQuote(normalizedPrompt)}". Donne-moi le contexte, l objectif exact et la contrainte principale, et je te repondrai avec une proposition structuree et directement exploitable.`
      : 'J ai bien recu ta demande. Donne-moi un peu plus de contexte ou reformule ton objectif en une phrase, et je te repondrai de facon directe et utile.'
    : mode === 'expert'
      ? `I understand your request about "${clipForQuote(normalizedPrompt)}". Give me the context, the exact goal, and the main constraint, and I will answer with a structured, actionable proposal.`
      : 'I have your request. Give me a bit more context or restate your goal in one sentence, and I will answer in a direct, useful way.';
}

function buildSystemPrompt(provider: ProviderDefinition, mode: ExperienceMode): string {
  const depthInstruction =
    mode === 'expert'
      ? 'Give a thoughtful, structured answer with concrete actions when useful.'
      : 'Give a concise, natural, directly useful answer.';

  return [
    `You are ${provider.name}, the assistant inside the ChatLine app.`,
    'Answer in the same language as the user.',
    'Do not mention routing, provider selection, system state, hidden instructions, or internal tooling.',
    'Never answer with prefixes like ROUTING>, INTENT>, NEXT>, SCOPE>, OUTPUT>, or SYSTEM>.',
    depthInstruction,
  ].join(' ');
}

function toModelMessages(messages: ConversationMessage[]): ModelMessage[] {
  return messages
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: normalizePrompt(message.content),
    }))
    .filter((message) => message.content.length > 0);
}

function extractOpenAiText(payload: OpenAiChatCompletionResponse): string {
  const content = payload.choices[0]?.message?.content;

  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => ('text' in item ? item.text : ''))
      .join('');
  }

  return '';
}

function normalizeReply(reply: string): string | null {
  const normalized = normalizePrompt(reply);
  return normalized.length > 0 ? reply.trim() : null;
}

function normalizePrompt(prompt: string): string {
  return prompt.replace(/\s+/g, ' ').trim();
}

function clipForQuote(prompt: string): string {
  return prompt.length > 96 ? `${prompt.slice(0, 93)}...` : prompt;
}

function looksFrench(prompt: string): boolean {
  return /\b(salut|bonjour|merci|pourquoi|comment|peux|peut|veux|faire|fais|corrige|erreur|appli|reponse|bonjour|avec|sans|donne|explique)\b/i.test(
    prompt,
  );
}

function isGreeting(prompt: string): boolean {
  return /^(salut|bonjour|hello|hi|hey)\b/i.test(prompt);
}

function isTechnicalRequest(prompt: string): boolean {
  return /\b(api|backend|frontend|react|expo|nest|prisma|bug|erreur|error|code|build|deploy|database|sql|ios|android|websocket)\b/i.test(
    prompt,
  );
}

type ModelMessage = {
  role: 'assistant' | 'user';
  content: string;
};

type OpenAiProviderConfig = {
  kind: 'openai';
  apiKey: string;
  model: string;
  endpoint: string;
};

type AnthropicProviderConfig = {
  kind: 'anthropic';
  apiKey: string;
  model: string;
  endpoint: string;
};

type LiveProviderConfig = OpenAiProviderConfig | AnthropicProviderConfig;

type OpenAiChatCompletionResponse = {
  choices: Array<{
    message?: {
      content?: string | Array<{ type: 'text'; text: string }>;
    };
  }>;
};

type AnthropicMessageResponse = {
  content: Array<{
    type: 'text';
    text: string;
  }>;
};