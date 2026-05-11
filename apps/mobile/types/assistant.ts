export type ExperienceMode = 'fast' | 'expert';
export type MessageRole = 'assistant' | 'user';
export type SubscriptionPlan = 'free' | 'premium';
export type DiscussionTone = 'balanced' | 'direct' | 'strategic';
export type InterfaceColor = 'gold' | 'graphite' | 'violet';

export interface Provider {
  id: string;
  name: string;
  vendor: string;
  summary: string;
  free: boolean;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  providerId?: string;
}

export interface ConversationSummary {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  archived: boolean;
}

export interface AccountProfile {
  email: string;
  alias: string;
  tone: DiscussionTone;
  interfaceColor: InterfaceColor;
}

export interface NotificationSettings {
  product: boolean;
  billing: boolean;
  security: boolean;
}

export interface SessionDevice {
  id: string;
  label: string;
  location: string;
  lastActiveAt: string;
  current: boolean;
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
  providerId?: string;
}