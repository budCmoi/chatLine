import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  model?: string;
  createdAt: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  archived?: boolean;
}

interface ChatStore {
  // State
  conversations: Conversation[];
  currentConversationId: string | null;
  isStreaming: boolean;
  isPremium: boolean;
  requestCount: number;
  showPremiumOverlay: boolean;
  sidebarOpen: boolean;
  rightSidebarOpen: boolean;
  voiceModeOpen: boolean;
  searchQuery: string;
  selectedModel: string;
  selectedMode: string;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setRightSidebarOpen: (open: boolean) => void;
  toggleRightSidebar: () => void;
  setVoiceModeOpen: (open: boolean) => void;
  setSearchQuery: (q: string) => void;
  setSelectedModel: (model: string) => void;
  setSelectedMode: (mode: string) => void;
  setCurrentConversation: (id: string | null) => void;
  createConversation: (firstMessage: string) => string;
  deleteConversation: (id: string) => void;
  archiveConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateLastAssistantMessage: (conversationId: string, content: string) => void;
  setStreaming: (streaming: boolean) => void;
  incrementRequestCount: () => boolean;
  setShowPremiumOverlay: (show: boolean) => void;
  setPremium: (isPremium: boolean) => void;
  getCurrentConversation: () => Conversation | null;
}

const FREE_REQUEST_LIMIT = 20;

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      conversations: [],
      currentConversationId: null,
      isStreaming: false,
      isPremium: false,
      requestCount: 0,
      showPremiumOverlay: false,
      sidebarOpen: false,
      rightSidebarOpen: false,
      voiceModeOpen: false,
      searchQuery: '',
      selectedModel: 'GPT-5',
      selectedMode: 'fast',

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setRightSidebarOpen: (open) => set({ rightSidebarOpen: open }),
      toggleRightSidebar: () => set((s) => ({ rightSidebarOpen: !s.rightSidebarOpen })),
      setVoiceModeOpen: (open) => set({ voiceModeOpen: open }),
      setSearchQuery: (q) => set({ searchQuery: q }),
      setSelectedModel: (model) => set({ selectedModel: model }),
      setSelectedMode: (mode) => set({ selectedMode: mode }),

      setCurrentConversation: (id) => set({ currentConversationId: id }),

      createConversation: (firstMessage) => {
        const id = crypto.randomUUID();
        const title =
          firstMessage.length > 45
            ? firstMessage.slice(0, 45).trimEnd() + '…'
            : firstMessage;

        const now = Date.now();
        const conversation: Conversation = {
          id,
          title,
          messages: [],
          createdAt: now,
          updatedAt: now,
          archived: false,
        };

        set((state) => ({
          conversations: [conversation, ...state.conversations],
          currentConversationId: id,
        }));

        return id;
      },

      deleteConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          currentConversationId:
            state.currentConversationId === id ? null : state.currentConversationId,
        })),

      archiveConversation: (id) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, archived: true } : c,
          ),
        })),

      addMessage: (conversationId, message) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, messages: [...c.messages, message], updatedAt: Date.now() }
              : c,
          ),
        })),

      updateLastAssistantMessage: (conversationId, content) =>
        set((state) => ({
          conversations: state.conversations.map((c) => {
            if (c.id !== conversationId) return c;
            const messages = [...c.messages];
            const lastIdx = messages.length - 1;
            if (lastIdx >= 0 && messages[lastIdx].role === 'assistant') {
              messages[lastIdx] = { ...messages[lastIdx], content };
            }
            return { ...c, messages, updatedAt: Date.now() };
          }),
        })),

      setStreaming: (streaming) => set({ isStreaming: streaming }),

      incrementRequestCount: () => {
        const { requestCount, isPremium } = get();
        if (isPremium) return false;
        const newCount = requestCount + 1;
        set({ requestCount: newCount });
        if (newCount >= FREE_REQUEST_LIMIT) {
          set({ showPremiumOverlay: true });
          return true;
        }
        return false;
      },

      setShowPremiumOverlay: (show) => set({ showPremiumOverlay: show }),
      setPremium: (isPremium) => set({ isPremium }),

      getCurrentConversation: () => {
        const { conversations, currentConversationId } = get();
        return conversations.find((c) => c.id === currentConversationId) ?? null;
      },
    }),
    {
      name: 'chatline-web-store',
      partialize: (state) => ({
        conversations: state.conversations,
        isPremium: state.isPremium,
        requestCount: state.requestCount,
        selectedModel: state.selectedModel,
      }),
    },
  ),
);
