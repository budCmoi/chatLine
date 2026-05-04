export type ContentKind = 'text' | 'image' | 'video' | 'audio';
export type ExperienceMode = 'fast' | 'expert';
export type MessageRole = 'assistant' | 'user';

export interface ProviderDefinition {
  id: string;
  name: string;
  vendor: string;
  capability: ContentKind;
  summary: string;
  latency: string;
}

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  providerId?: string;
}

export interface ConversationRecord {
  id: string;
  title: string;
  mode: ExperienceMode;
  lastActivity: string;
  messages: ConversationMessage[];
}

export interface ConversationSummary {
  id: string;
  title: string;
  mode: ExperienceMode;
  lastActivity: string;
  lastMessage: string;
}

export interface LibraryAsset {
  id: string;
  title: string;
  summary: string;
  kind: ContentKind;
  folder: string;
  providerId: string;
  status: 'ready' | 'queued' | 'draft';
  updatedAt: string;
}

export interface ChatResponse {
  conversationId: string;
  providerId: string;
  providerLabel: string;
  content: string;
  timestamp: string;
}