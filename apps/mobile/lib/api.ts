import type {
  ChatReply,
  ChatRequestInput,
  GenerationRequestInput,
  GenerationResult,
} from '@/types/assistant';

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

const providerLabels: Record<string, string> = {
  'openai-gpt': 'GPT-4.1',
  'anthropic-claude': 'Claude 3.7',
  'openai-dalle': 'DALL-E 3',
  sdxl: 'SDXL',
  runway: 'Runway',
  pika: 'Pika',
  whisper: 'Whisper',
  elevenlabs: 'ElevenLabs',
};

export async function requestAssistantReply(input: ChatRequestInput): Promise<ChatReply> {
  if (API_URL) {
    const response = await fetch(`${API_URL}/api/v1/chat/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      return (await response.json()) as ChatReply;
    }
  }

  return createMockReply(input);
}

export async function requestGenerationJob(
  input: GenerationRequestInput,
): Promise<GenerationResult> {
  if (API_URL) {
    const response = await fetch(`${API_URL}/api/v1/generation/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      return (await response.json()) as GenerationResult;
    }
  }

  return createMockGeneration(input);
}

function createMockReply(input: ChatRequestInput): ChatReply {
  const providerLabel = providerLabels[input.providerId] ?? 'AI CORE';
  const prompt = normalizePrompt(input.prompt);
  const excerpt = prompt.length > 96 ? `${prompt.slice(0, 93)}...` : prompt;

  if (input.mode === 'expert') {
    return {
      providerLabel,
      content: [
        `ROUTING>${providerLabel}`,
        `INTENT>${excerpt}`,
        'OUTPUT> Plan d action, priorites produit, risques et prochaine etape immediate.',
      ].join('\n'),
    };
  }

  return {
    providerLabel,
    content: `${providerLabel} actif. Je peux transformer cette demande en reponse claire, actionnable et multi-format a partir de: "${excerpt}".`,
  };
}

function createMockGeneration(input: GenerationRequestInput): GenerationResult {
  const providerLabel = providerLabels[input.providerId] ?? 'AI CORE';
  const kindLabel = input.kind.toUpperCase();

  return {
    id: `asset-${Date.now()}`,
    title: `${kindLabel} / ${providerLabel}`,
    summary: `${input.style} :: ${normalizePrompt(input.prompt)}`,
    kind: input.kind,
    providerId: input.providerId,
    status: 'queued',
    updatedAt: new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

function normalizePrompt(prompt: string): string {
  return prompt.replace(/\s+/g, ' ').trim();
}