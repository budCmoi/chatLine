import type { ChatReply, ChatRequestInput } from '@/types/assistant';

const API_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

const providerLabels: Record<string, string> = {
  'llama-3-free': 'Llama 3.1',
  'mistral-small': 'Mistral Small',
  'gemma-2': 'Gemma 2',
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

function createMockReply(input: ChatRequestInput): ChatReply {
  const providerLabel = providerLabels[input.providerId] ?? 'AI CORE';
  const prompt = normalizePrompt(input.prompt);
  const excerpt = prompt.length > 96 ? `${prompt.slice(0, 93)}...` : prompt;

  if (input.mode === 'expert') {
    return {
      providerLabel,
      content: [
        `ROUTING>${providerLabel}`,
        `SCOPE>${excerpt}`,
        'OUTPUT> Action plan, product priority, main risk and next concrete step.',
      ].join('\n'),
    };
  }

  return {
    providerLabel,
    content: `${providerLabel} ready. I can keep the answer concise, useful and oriented around: "${excerpt}".`,
  };
}

function normalizePrompt(prompt: string): string {
  return prompt.replace(/\s+/g, ' ').trim();
}