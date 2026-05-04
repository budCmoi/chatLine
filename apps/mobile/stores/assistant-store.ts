import { create } from 'zustand';

import { requestAssistantReply } from '@/lib/api';
import type {
  AccountProfile,
  ChatMessage,
  ConversationSummary,
  DiscussionTone,
  ExperienceMode,
  InterfaceColor,
  NotificationSettings,
  Provider,
  SessionDevice,
  SubscriptionPlan,
} from '@/types/assistant';

interface AssistantState {
  activeConversationId: string | null;
  selectedProviderId: string;
  mode: ExperienceMode;
  draft: string;
  isSending: boolean;
  subscriptionPlan: SubscriptionPlan;
  freeRequestsUsed: number;
  upgradePromptDismissed: boolean;
  providers: Provider[];
  conversations: ConversationSummary[];
  messagesByConversation: Record<string, ChatMessage[]>;
  profile: AccountProfile;
  notifications: NotificationSettings;
  sessions: SessionDevice[];
  setActiveProvider: (providerId: string) => void;
  setMode: (mode: ExperienceMode) => void;
  updateDraft: (draft: string) => void;
  startFreshChat: () => void;
  openConversation: (conversationId: string) => void;
  archiveConversation: (conversationId: string) => void;
  restoreConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  deleteAllData: () => void;
  upgradeToPremium: () => void;
  dismissUpgradePrompt: () => void;
  updateAlias: (alias: string) => void;
  setTone: (tone: DiscussionTone) => void;
  setInterfaceColor: (interfaceColor: InterfaceColor) => void;
  toggleNotification: (key: keyof NotificationSettings) => void;
  closeOtherSessions: () => void;
  sendMessage: () => Promise<void>;
}

const providers: Provider[] = [
  {
    id: 'llama-3-free',
    name: 'Llama 3.1',
    vendor: 'Meta',
    summary: 'Open, versatile and good for daily conversations',
    free: true,
  },
  {
    id: 'mistral-small',
    name: 'Mistral Small',
    vendor: 'Mistral',
    summary: 'Compact reasoning with a fast response profile',
    free: true,
  },
  {
    id: 'gemma-2',
    name: 'Gemma 2',
    vendor: 'Google',
    summary: 'Lightweight model for short answers and ideation',
    free: true,
  },
];

const conversationsSeed: ConversationSummary[] = [
  {
    id: 'conv-launch',
    title: 'Lancement premium',
    preview: 'Plan produit, positionnement et premiers ecrans pour Chatline.',
    updatedAt: minutesAgo(18),
    archived: false,
  },
  {
    id: 'conv-growth',
    title: 'Boucle d activation',
    preview: 'Scenario freemium, overlay et conversion vers Chatline Plus.',
    updatedAt: minutesAgo(180),
    archived: false,
  },
  {
    id: 'conv-ux',
    title: 'Audit navigation',
    preview: 'Drawer, profil, ecran accueil et composition du chat.',
    updatedAt: minutesAgo(620),
    archived: false,
  },
  {
    id: 'conv-archive-1',
    title: 'Ancien brief marque',
    preview: 'Pistes de branding conservees pour reference.',
    updatedAt: minutesAgo(1900),
    archived: true,
  },
];

const messagesSeed: Record<string, ChatMessage[]> = {
  'conv-launch': [
    {
      id: 'msg-launch-1',
      role: 'assistant',
      providerId: 'llama-3-free',
      content: 'Chatline est pret. On peut clarifier le plan de lancement, le parcours freemium et la navigation principale.',
      createdAt: minutesAgo(21),
    },
    {
      id: 'msg-launch-2',
      role: 'user',
      content: 'Structure une app IA mobile professionnelle type ChatGPT.',
      createdAt: minutesAgo(19),
    },
    {
      id: 'msg-launch-3',
      role: 'assistant',
      providerId: 'mistral-small',
      content: 'Je propose une navigation par drawer, une page profil riche, un plan freemium lisible et une page premium dediee.',
      createdAt: minutesAgo(18),
    },
  ],
  'conv-growth': [
    {
      id: 'msg-growth-1',
      role: 'user',
      content: 'Comment monetiser sans casser la simplicite ?',
      createdAt: minutesAgo(185),
    },
    {
      id: 'msg-growth-2',
      role: 'assistant',
      providerId: 'gemma-2',
      content: 'Un quota gratuit simple, un mode expert reserve au premium et un CTA discret au bon moment suffisent pour le MVP.',
      createdAt: minutesAgo(180),
    },
  ],
  'conv-ux': [
    {
      id: 'msg-ux-1',
      role: 'assistant',
      providerId: 'llama-3-free',
      content: 'Le point prioritaire: sortir les conversations de l accueil et les regrouper dans une sidebar claire.',
      createdAt: minutesAgo(620),
    },
  ],
  'conv-archive-1': [
    {
      id: 'msg-archive-1',
      role: 'assistant',
      providerId: 'gemma-2',
      content: 'Conversation archivee conservee pour reference.',
      createdAt: minutesAgo(1900),
    },
  ],
};

const profileSeed: AccountProfile = {
  email: 'ibr.drame@chatline.app',
  alias: 'ibr. drame',
  tone: 'strategic',
  interfaceColor: 'gold',
};

const notificationSeed: NotificationSettings = {
  product: true,
  billing: true,
  security: true,
};

const sessionSeed: SessionDevice[] = [
  {
    id: 'session-current',
    label: 'iPhone 15 Pro',
    location: 'Paris',
    lastActiveAt: minutesAgo(2),
    current: true,
  },
  {
    id: 'session-desktop',
    label: 'MacBook Pro',
    location: 'Lyon',
    lastActiveAt: minutesAgo(74),
    current: false,
  },
  {
    id: 'session-web',
    label: 'Chrome Web',
    location: 'Marseille',
    lastActiveAt: minutesAgo(320),
    current: false,
  },
];

export const useAssistantStore = create<AssistantState>((set, get) => ({
  activeConversationId: null,
  selectedProviderId: 'llama-3-free',
  mode: 'fast',
  draft: '',
  isSending: false,
  subscriptionPlan: 'free',
  freeRequestsUsed: 0,
  upgradePromptDismissed: false,
  providers,
  conversations: conversationsSeed,
  messagesByConversation: messagesSeed,
  profile: profileSeed,
  notifications: notificationSeed,
  sessions: sessionSeed,
  setActiveProvider: (providerId) => set({ selectedProviderId: providerId }),
  setMode: (mode) =>
    set((current) => {
      if (mode === 'expert' && current.subscriptionPlan === 'free') {
        return { upgradePromptDismissed: false };
      }

      return { mode };
    }),
  updateDraft: (draft) => set({ draft }),
  startFreshChat: () => set({ activeConversationId: null, draft: '', mode: 'fast' }),
  openConversation: (conversationId) => set({ activeConversationId: conversationId }),
  archiveConversation: (conversationId) =>
    set((current) => ({
      activeConversationId:
        current.activeConversationId === conversationId ? null : current.activeConversationId,
      conversations: current.conversations.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, archived: true } : conversation,
      ),
    })),
  restoreConversation: (conversationId) =>
    set((current) => ({
      activeConversationId: conversationId,
      conversations: current.conversations.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, archived: false } : conversation,
      ),
    })),
  deleteConversation: (conversationId) =>
    set((current) => ({
      activeConversationId:
        current.activeConversationId === conversationId ? null : current.activeConversationId,
      conversations: current.conversations.filter((conversation) => conversation.id !== conversationId),
      messagesByConversation: Object.fromEntries(
        Object.entries(current.messagesByConversation).filter(([key]) => key !== conversationId),
      ),
    })),
  deleteAllData: () =>
    set({
      activeConversationId: null,
      conversations: [],
      messagesByConversation: {},
      draft: '',
      freeRequestsUsed: 0,
      upgradePromptDismissed: false,
    }),
  upgradeToPremium: () =>
    set({
      subscriptionPlan: 'premium',
      upgradePromptDismissed: true,
    }),
  dismissUpgradePrompt: () => set({ upgradePromptDismissed: true }),
  updateAlias: (alias) =>
    set((current) => ({
      profile: {
        ...current.profile,
        alias,
      },
    })),
  setTone: (tone) =>
    set((current) => ({
      profile: {
        ...current.profile,
        tone,
      },
    })),
  setInterfaceColor: (interfaceColor) =>
    set((current) => ({
      profile: {
        ...current.profile,
        interfaceColor,
      },
    })),
  toggleNotification: (key) =>
    set((current) => ({
      notifications: {
        ...current.notifications,
        [key]: !current.notifications[key],
      },
    })),
  closeOtherSessions: () =>
    set((current) => ({
      sessions: current.sessions.filter((session) => session.current),
    })),
  sendMessage: async () => {
    const state = get();
    const prompt = state.draft.trim();

    if (!prompt || state.isSending) {
      return;
    }

    const conversationId = state.activeConversationId ?? createConversationId();
    const requestCreatedAt = new Date().toISOString();
    const effectiveMode = state.subscriptionPlan === 'premium' ? state.mode : 'fast';

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: 'user',
      content: prompt,
      createdAt: requestCreatedAt,
    };

    set((current) => ({
      activeConversationId: conversationId,
      draft: '',
      isSending: true,
      conversations: upsertConversation(current.conversations, {
        id: conversationId,
        title: resolveConversationTitle(current.conversations, conversationId, prompt),
        preview: summarizeContent(prompt),
        updatedAt: requestCreatedAt,
        archived: false,
      }),
      messagesByConversation: {
        ...current.messagesByConversation,
        [conversationId]: [...(current.messagesByConversation[conversationId] ?? []), userMessage],
      },
    }));

    try {
      const reply = await requestAssistantReply({
        conversationId,
        prompt,
        providerId: state.selectedProviderId,
        mode: effectiveMode,
      });

      const responseCreatedAt = new Date().toISOString();
      const nextFreeCount =
        state.subscriptionPlan === 'free' ? state.freeRequestsUsed + 1 : state.freeRequestsUsed;

      const assistantMessage: ChatMessage = {
        id: createMessageId(),
        role: 'assistant',
        content: reply.content,
        providerId: state.selectedProviderId,
        createdAt: responseCreatedAt,
      };

      set((current) => ({
        isSending: false,
        freeRequestsUsed: nextFreeCount,
        upgradePromptDismissed:
          current.subscriptionPlan === 'free' && nextFreeCount >= 5 ? false : current.upgradePromptDismissed,
        conversations: upsertConversation(current.conversations, {
          id: conversationId,
          title: resolveConversationTitle(current.conversations, conversationId, prompt),
          preview: summarizeContent(reply.content),
          updatedAt: responseCreatedAt,
          archived: false,
        }),
        messagesByConversation: {
          ...current.messagesByConversation,
          [conversationId]: [...(current.messagesByConversation[conversationId] ?? []), assistantMessage],
        },
      }));
    } catch {
      const responseCreatedAt = new Date().toISOString();
      const nextFreeCount =
        state.subscriptionPlan === 'free' ? state.freeRequestsUsed + 1 : state.freeRequestsUsed;

      const assistantMessage: ChatMessage = {
        id: createMessageId(),
        role: 'assistant',
        content: 'SYSTEM>Fallback active. Chatline keeps working locally while the API is unavailable.',
        providerId: state.selectedProviderId,
        createdAt: responseCreatedAt,
      };

      set((current) => ({
        isSending: false,
        freeRequestsUsed: nextFreeCount,
        upgradePromptDismissed:
          current.subscriptionPlan === 'free' && nextFreeCount >= 5 ? false : current.upgradePromptDismissed,
        conversations: upsertConversation(current.conversations, {
          id: conversationId,
          title: resolveConversationTitle(current.conversations, conversationId, prompt),
          preview: summarizeContent(assistantMessage.content),
          updatedAt: responseCreatedAt,
          archived: false,
        }),
        messagesByConversation: {
          ...current.messagesByConversation,
          [conversationId]: [...(current.messagesByConversation[conversationId] ?? []), assistantMessage],
        },
      }));
    }
  },
}));

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

function createConversationId(): string {
  return `conv-${Date.now()}`;
}

function createMessageId(): string {
  return `msg-${Date.now()}-${Math.round(Math.random() * 10_000)}`;
}

function summarizeContent(content: string): string {
  const normalized = content.replace(/\s+/g, ' ').trim();
  return normalized.length > 96 ? `${normalized.slice(0, 93)}...` : normalized;
}

function buildConversationTitle(prompt: string): string {
  const normalized = summarizeContent(prompt);
  return normalized.length > 36 ? `${normalized.slice(0, 33)}...` : normalized;
}

function resolveConversationTitle(
  conversations: ConversationSummary[],
  conversationId: string,
  prompt: string,
): string {
  return conversations.find((conversation) => conversation.id === conversationId)?.title ?? buildConversationTitle(prompt);
}

function upsertConversation(
  conversations: ConversationSummary[],
  nextConversation: ConversationSummary,
): ConversationSummary[] {
  const filtered = conversations.filter((conversation) => conversation.id !== nextConversation.id);

  return [...filtered, nextConversation].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  );
}

function getTimeLabel(): string {
  return new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}