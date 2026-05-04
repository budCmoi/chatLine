import { Injectable } from '@nestjs/common';

import { AssistantRepository } from '../common/assistant.repository';
import type { ChatResponse, ProviderDefinition } from '../common/assistant.types';
import { ChatRequestDto } from './dto/chat-request.dto';

@Injectable()
export class ChatService {
  constructor(private readonly assistantRepository: AssistantRepository) {}

  async respond(payload: ChatRequestDto): Promise<ChatResponse> {
    const provider =
      this.assistantRepository.getProvider(payload.providerId) ??
      this.assistantRepository.listProviders('text')[0];

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

    const content = composeReply(payload.prompt, provider, payload.mode);
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
}

function composeReply(prompt: string, provider: ProviderDefinition, mode: 'fast' | 'expert'): string {
  const normalizedPrompt = prompt.replace(/\s+/g, ' ').trim();
  const excerpt =
    normalizedPrompt.length > 120 ? `${normalizedPrompt.slice(0, 117)}...` : normalizedPrompt;

  if (mode === 'expert') {
    return [
      `ROUTING>${provider.name}`,
      `INTENT>${excerpt}`,
      'NEXT>Clarify scope, produce the first deliverable and preserve reusable context.',
    ].join('\n');
  }

  return `${provider.name} active. Returning a compact execution-ready answer for: "${excerpt}".`;
}