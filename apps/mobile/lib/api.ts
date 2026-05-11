import * as Linking from 'expo-linking';

import type { ChatReply, ChatRequestInput } from '@/types/assistant';

const API_URL = resolveApiUrl();

const providerLabels: Record<string, string> = {
  'openai-gpt': 'GPT-4.1',
  'anthropic-claude': 'Claude 3.7',
};

export async function requestAssistantReply(input: ChatRequestInput): Promise<ChatReply> {
  if (API_URL) {
    try {
      const response = await fetch(`${API_URL}/api/v1/chat/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        const payload = (await response.json()) as ChatReply;

        return {
          content: payload.content,
          providerId: payload.providerId ?? input.providerId,
          providerLabel:
            payload.providerLabel ??
            providerLabels[payload.providerId ?? input.providerId] ??
            providerLabels[input.providerId] ??
            'AI CORE',
        };
      }
    } catch {
      return createLocalReply(input);
    }
  }

  return createLocalReply(input);
}

function createLocalReply(input: ChatRequestInput): ChatReply {
  const providerLabel = providerLabels[input.providerId] ?? 'AI CORE';
  const prompt = normalizePrompt(input.prompt);

  if (!prompt) {
    return {
      providerId: input.providerId,
      providerLabel,
      content: 'Je suis la. Dis-moi simplement ce que tu veux faire, comprendre ou corriger.',
    };
  }

  if (/^(salut|bonjour|hello|hi|hey)\b/i.test(prompt)) {
    return {
      providerId: input.providerId,
      providerLabel,
      content: 'Salut. Je suis la pour t aider. Envoie-moi ta question ou ta tache, et je te repondrai directement.',
    };
  }

  if (input.mode === 'expert') {
    return {
      providerId: input.providerId,
      providerLabel,
      content:
        'Je peux t aider sur ca. Donne-moi le contexte, l objectif exact et la contrainte principale, et je te repondrai avec une proposition structuree et exploitable.',
    };
  }

  return {
    providerId: input.providerId,
    providerLabel,
    content:
      'Je peux t aider. Formule simplement la question complete ou le resultat attendu, et je te repondrai de facon directe et utile.',
  };
}

function normalizePrompt(prompt: string): string {
  return prompt.replace(/\s+/g, ' ').trim();
}

function resolveApiUrl(): string | null {
  const explicitUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ?? '';
  const detectedHost = extractHost(Linking.createURL('/'));

  if (explicitUrl && !isLoopbackUrl(explicitUrl)) {
    return explicitUrl;
  }

  if (detectedHost) {
    return `http://${detectedHost}:3000`;
  }

  return explicitUrl || null;
}

function extractHost(url: string): string | null {
  const match = url.match(/^[a-z]+:\/\/([^/:]+)/i);
  return match?.[1] ?? null;
}

function isLoopbackUrl(url: string): boolean {
  return /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url);
}