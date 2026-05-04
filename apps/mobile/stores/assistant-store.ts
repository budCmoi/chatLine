import { create } from 'zustand';

import { requestAssistantReply, requestGenerationJob } from '@/lib/api';
import type {
  AssistantPreferences,
  ChatMessage,
  ContentKind,
  ExperienceMode,
  GenerationModule,
  LibraryItem,
  Provider,
} from '@/types/assistant';

interface AssistantState {
  conversationId: string;
  activeProviderId: string;
  mode: ExperienceMode;
  draft: string;
  isSending: boolean;
  providers: Provider[];
  generationModules: GenerationModule[];
  messages: ChatMessage[];
  libraryItems: LibraryItem[];
  preferences: AssistantPreferences;
  setActiveProvider: (providerId: string) => void;
  setMode: (mode: ExperienceMode) => void;
  updateDraft: (draft: string) => void;
  sendMessage: () => Promise<void>;
  createAsset: (kind: ContentKind, providerId: string, prompt: string, style: string) => Promise<void>;
  togglePreference: (key: keyof AssistantPreferences) => void;
}

const providers: Provider[] = [
  {
    id: 'openai-gpt',
    name: 'GPT-4.1',
    vendor: 'OpenAI',
    capability: 'text',
    summary: 'Chat, reasoning, product answers',
    latency: 'FAST',
  },
  {
    id: 'anthropic-claude',
    name: 'Claude 3.7',
    vendor: 'Anthropic',
    capability: 'text',
    summary: 'Long context, writing, analysis',
    latency: 'DEEP',
  },
  {
    id: 'openai-dalle',
    name: 'DALL-E 3',
    vendor: 'OpenAI',
    capability: 'image',
    summary: 'Image concepts and campaign visuals',
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
    summary: 'Text to video and motion cuts',
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
    summary: 'Speech to text and meeting capture',
    latency: 'AUDIO',
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    vendor: 'ElevenLabs',
    capability: 'audio',
    summary: 'Text to speech and voice output',
    latency: 'VOICE',
  },
];

const generationModules: GenerationModule[] = [
  {
    id: 'module-text',
    label: 'TEXT OPS',
    description: 'Briefs, scripts, summaries and strategic drafts',
    kind: 'text',
    providerId: 'openai-gpt',
    status: 'ready',
  },
  {
    id: 'module-image',
    label: 'IMAGE LAB',
    description: 'Black and white visuals, concept frames, product assets',
    kind: 'image',
    providerId: 'openai-dalle',
    status: 'ready',
  },
  {
    id: 'module-video',
    label: 'VIDEO FLOW',
    description: 'Teasers, previews and interface motion cuts',
    kind: 'video',
    providerId: 'runway',
    status: 'queued',
  },
  {
    id: 'module-audio',
    label: 'AUDIO CAST',
    description: 'Speech capture, TTS and voice assisted prompts',
    kind: 'audio',
    providerId: 'elevenlabs',
    status: 'active',
  },
];

const initialMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    providerId: 'openai-gpt',
    content:
      'SYSTEM ONLINE. Multi-IA routing, context memory and generation modules are ready.',
    timestamp: '09:32',
  },
  {
    id: 'msg-2',
    role: 'user',
    content: 'Build a premium launch plan for a black and white AI assistant app.',
    timestamp: '09:33',
  },
  {
    id: 'msg-3',
    role: 'assistant',
    providerId: 'anthropic-claude',
    content:
      'ROUTING>Claude 3.7\nFOCUS>MVP, premium UX, performance and staged rollout.\nNEXT>Define product pillars, screens, provider orchestration and measurable releases.',
    timestamp: '09:34',
  },
];

const initialLibraryItems: LibraryItem[] = [
  {
    id: 'lib-1',
    title: 'Launch brief / GPT-4.1',
    summary: 'Product positioning, acquisition hooks and retention loops.',
    kind: 'text',
    folder: 'Strategy',
    providerId: 'openai-gpt',
    status: 'ready',
    updatedAt: '09:40',
  },
  {
    id: 'lib-2',
    title: 'Hero concept / DALL-E 3',
    summary: 'Monochrome product hero with dense terminal composition.',
    kind: 'image',
    folder: 'Campaign',
    providerId: 'openai-dalle',
    status: 'draft',
    updatedAt: '09:44',
  },
  {
    id: 'lib-3',
    title: 'Teaser scene / Runway',
    summary: '15 second interface reveal with layered overlays and motion cadence.',
    kind: 'video',
    folder: 'Campaign',
    providerId: 'runway',
    status: 'queued',
    updatedAt: '09:46',
  },
  {
    id: 'lib-4',
    title: 'Onboarding voice / ElevenLabs',
    summary: 'Dry premium voiceover for setup and mode explanation.',
    kind: 'audio',
    folder: 'Voice',
    providerId: 'elevenlabs',
    status: 'ready',
    updatedAt: '09:51',
  },
];

const initialPreferences: AssistantPreferences = {
  memory: true,
  streaming: true,
  semanticSearch: true,
  voice: false,
};

export const useAssistantStore = create<AssistantState>((set, get) => ({
  conversationId: 'conv-primary',
  activeProviderId: 'openai-gpt',
  mode: 'expert',
  draft: 'Draft a launch narrative and a high level product roadmap.',
  isSending: false,
  providers,
  generationModules,
  messages: initialMessages,
  libraryItems: initialLibraryItems,
  preferences: initialPreferences,
  setActiveProvider: (providerId) => set({ activeProviderId: providerId }),
  setMode: (mode) => set({ mode }),
  updateDraft: (draft) => set({ draft }),
  sendMessage: async () => {
    const state = get();
    const prompt = state.draft.trim();

    if (!prompt || state.isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: getTimeLabel(),
    };

    set((current) => ({
      draft: '',
      isSending: true,
      messages: [...current.messages, userMessage],
    }));

    try {
      const reply = await requestAssistantReply({
        conversationId: state.conversationId,
        prompt,
        providerId: state.activeProviderId,
        mode: state.mode,
      });

      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: reply.content,
        providerId: state.activeProviderId,
        timestamp: getTimeLabel(),
      };

      set((current) => ({
        isSending: false,
        messages: [...current.messages, assistantMessage],
      }));
    } catch {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'SYSTEM>Fallback response. API unavailable, local orchestration still active.',
        providerId: state.activeProviderId,
        timestamp: getTimeLabel(),
      };

      set((current) => ({
        isSending: false,
        messages: [...current.messages, assistantMessage],
      }));
    }
  },
  createAsset: async (kind, providerId, prompt, style) => {
    const result = await requestGenerationJob({
      kind,
      providerId,
      prompt,
      style,
    });

    const item: LibraryItem = {
      id: result.id,
      title: result.title,
      summary: result.summary,
      kind: result.kind,
      folder: folderByKind[result.kind],
      providerId: result.providerId,
      status: result.status,
      updatedAt: result.updatedAt,
    };

    set((current) => ({
      libraryItems: [item, ...current.libraryItems],
    }));
  },
  togglePreference: (key) =>
    set((current) => ({
      preferences: {
        ...current.preferences,
        [key]: !current.preferences[key],
      },
    })),
}));

const folderByKind: Record<ContentKind, string> = {
  text: 'Strategy',
  image: 'Visuals',
  video: 'Motion',
  audio: 'Voice',
};

function getTimeLabel(): string {
  return new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}