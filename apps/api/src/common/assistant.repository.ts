import { Injectable, NotFoundException } from '@nestjs/common';

import type {
  ContentKind,
  ConversationMessage,
  ConversationRecord,
  ConversationSummary,
  ExperienceMode,
  LibraryAsset,
  ProviderDefinition,
} from './assistant.types';

@Injectable()
export class AssistantRepository {
  private readonly providers: ProviderDefinition[] = [
    {
      id: 'openai-gpt',
      name: 'GPT-4.1',
      vendor: 'OpenAI',
      capability: 'text',
      summary: 'Chat, reasoning and structured outputs',
      latency: 'FAST',
    },
    {
      id: 'anthropic-claude',
      name: 'Claude 3.7',
      vendor: 'Anthropic',
      capability: 'text',
      summary: 'Long context, analysis and writing depth',
      latency: 'DEEP',
    },
    {
      id: 'openai-dalle',
      name: 'DALL-E 3',
      vendor: 'OpenAI',
      capability: 'image',
      summary: 'Concept visuals and campaign images',
      latency: 'IMAGE',
    },
    {
      id: 'sdxl',
      name: 'SDXL',
      vendor: 'Stability',
      capability: 'image',
      summary: 'Style exploration and art direction',
      latency: 'IMAGE',
    },
    {
      id: 'runway',
      name: 'Runway',
      vendor: 'Runway',
      capability: 'video',
      summary: 'Text to video and motion editing',
      latency: 'VIDEO',
    },
    {
      id: 'pika',
      name: 'Pika',
      vendor: 'Pika',
      capability: 'video',
      summary: 'Fast video ideation loops',
      latency: 'VIDEO',
    },
    {
      id: 'whisper',
      name: 'Whisper',
      vendor: 'OpenAI',
      capability: 'audio',
      summary: 'Speech to text transcription',
      latency: 'AUDIO',
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      vendor: 'ElevenLabs',
      capability: 'audio',
      summary: 'Text to speech voice rendering',
      latency: 'VOICE',
    },
  ];

  private readonly conversations: ConversationRecord[] = [
    {
      id: 'conv-primary',
      title: 'Launch workspace',
      mode: 'expert',
      lastActivity: '2026-05-04T09:34:00.000Z',
      messages: [
        {
          id: 'msg-1',
          role: 'assistant',
          providerId: 'openai-gpt',
          content:
            'SYSTEM ONLINE. Multi-IA routing, context memory and generation modules are ready.',
          timestamp: '2026-05-04T09:32:00.000Z',
        },
        {
          id: 'msg-2',
          role: 'user',
          content: 'Build a premium launch plan for a black and white AI assistant app.',
          timestamp: '2026-05-04T09:33:00.000Z',
        },
        {
          id: 'msg-3',
          role: 'assistant',
          providerId: 'anthropic-claude',
          content:
            'ROUTING>Claude 3.7\nFOCUS>MVP, premium UX, performance and staged rollout.\nNEXT>Define product pillars, screens, provider orchestration and measurable releases.',
          timestamp: '2026-05-04T09:34:00.000Z',
        },
      ],
    },
  ];

  private readonly library: LibraryAsset[] = [
    {
      id: 'asset-1',
      title: 'Launch brief / GPT-4.1',
      summary: 'Product positioning, acquisition hooks and retention loops.',
      kind: 'text',
      folder: 'Strategy',
      providerId: 'openai-gpt',
      status: 'ready',
      updatedAt: '2026-05-04T09:40:00.000Z',
    },
    {
      id: 'asset-2',
      title: 'Hero concept / DALL-E 3',
      summary: 'Monochrome product hero with dense terminal composition.',
      kind: 'image',
      folder: 'Campaign',
      providerId: 'openai-dalle',
      status: 'draft',
      updatedAt: '2026-05-04T09:44:00.000Z',
    },
    {
      id: 'asset-3',
      title: 'Teaser scene / Runway',
      summary: '15 second interface reveal with layered overlays and motion cadence.',
      kind: 'video',
      folder: 'Campaign',
      providerId: 'runway',
      status: 'queued',
      updatedAt: '2026-05-04T09:46:00.000Z',
    },
  ];

  listProviders(capability?: string): ProviderDefinition[] {
    if (!capability) {
      return this.providers;
    }

    return this.providers.filter((provider) => provider.capability === capability);
  }

  getProvider(providerId: string): ProviderDefinition | undefined {
    return this.providers.find((provider) => provider.id === providerId);
  }

  listConversationSummaries(): ConversationSummary[] {
    return this.conversations.map((conversation) => ({
      id: conversation.id,
      title: conversation.title,
      mode: conversation.mode,
      lastActivity: conversation.lastActivity,
      lastMessage: conversation.messages.at(-1)?.content ?? '',
    }));
  }

  getConversation(conversationId: string): ConversationRecord {
    const conversation = this.conversations.find((item) => item.id === conversationId);

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} not found`);
    }

    return conversation;
  }

  ensureConversation(
    conversationId: string,
    prompt: string,
    mode: ExperienceMode,
  ): ConversationRecord {
    const existing = this.conversations.find((conversation) => conversation.id === conversationId);

    if (existing) {
      return existing;
    }

    const conversation: ConversationRecord = {
      id: conversationId,
      title: `Session / ${prompt.trim().slice(0, 32) || 'new request'}`,
      mode,
      lastActivity: new Date().toISOString(),
      messages: [],
    };

    this.conversations.unshift(conversation);
    return conversation;
  }

  appendMessage(conversationId: string, message: ConversationMessage): ConversationMessage {
    const conversation = this.getConversation(conversationId);
    conversation.messages.push(message);
    conversation.lastActivity = message.timestamp;
    return message;
  }

  listLibrary(): LibraryAsset[] {
    return this.library;
  }

  prependAsset(asset: LibraryAsset): LibraryAsset {
    this.library.unshift(asset);
    return asset;
  }

  resolveFolder(kind: ContentKind): string {
    return folderByKind[kind];
  }
}

const folderByKind: Record<ContentKind, string> = {
  text: 'Strategy',
  image: 'Visuals',
  video: 'Motion',
  audio: 'Voice',
};