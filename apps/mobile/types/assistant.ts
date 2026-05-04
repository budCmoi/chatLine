export type ContentKind = 'text' | 'image' | 'video' | 'audio';
export type ExperienceMode = 'fast' | 'expert';
export type MessageRole = 'assistant' | 'user';

export interface Provider {
  id: string;
  name: string;
  vendor: string;
  capability: ContentKind;
  summary: string;
  latency: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  providerId?: string;
}

export interface GenerationModule {
  id: string;
  label: string;
  description: string;
  kind: ContentKind;
  providerId: string;
  status: 'ready' | 'queued' | 'active';
}

export interface LibraryItem {
  id: string;
  title: string;
  summary: string;
  kind: ContentKind;
  folder: string;
  providerId: string;
  status: 'ready' | 'queued' | 'draft';
  updatedAt: string;
}

export interface AssistantPreferences {
  memory: boolean;
  streaming: boolean;
  semanticSearch: boolean;
  voice: boolean;
}

export interface ChatRequestInput {
  conversationId: string;
  prompt: string;
  providerId: string;
  mode: ExperienceMode;
}

export interface ChatReply {
  content: string;
  providerLabel: string;
}

export interface GenerationRequestInput {
  prompt: string;
  kind: ContentKind;
  providerId: string;
  style: string;
}

export interface GenerationResult {
  id: string;
  title: string;
  summary: string;
  kind: ContentKind;
  providerId: string;
  status: 'ready' | 'queued';
  updatedAt: string;
}