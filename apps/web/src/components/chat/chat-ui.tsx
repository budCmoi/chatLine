'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';
import type { Message } from '@/store/chat-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

interface ChatUIProps {
  conversationId: string;
}

export default function ChatUI({ conversationId }: ChatUIProps) {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const conversations = useChatStore((s) => s.conversations);
  const addMessage = useChatStore((s) => s.addMessage);
  const updateLastAssistantMessage = useChatStore((s) => s.updateLastAssistantMessage);
  const setStreaming = useChatStore((s) => s.setStreaming);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const incrementRequestCount = useChatStore((s) => s.incrementRequestCount);
  const isPremium = useChatStore((s) => s.isPremium);

  const conversation = conversations.find((c) => c.id === conversationId);
  const messages = conversation?.messages ?? [];

  // Scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant',
    });
  }, []);

  useEffect(() => {
    scrollToBottom(false);
  }, [conversationId, scrollToBottom]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages.length, scrollToBottom]);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
    );
  }, [conversationId]);

  const handleSend = useCallback(
    async (text: string) => {
      if (isStreaming) return;

      // Check limit (silent — no UI counter shown)
      const exceeded = incrementRequestCount();
      if (exceeded) return; // Premium overlay is shown by the store

      // Add user message
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        createdAt: Date.now(),
      };
      addMessage(conversationId, userMsg);

      // Add empty assistant placeholder
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        model: isPremium ? 'GPT Plus' : 'GPT-5',
        createdAt: Date.now(),
      };
      addMessage(conversationId, assistantMsg);
      setStreaming(true);

      try {
        const res = await fetch(`${API_URL}/api/v1/chat/respond`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: text,
            provider: isPremium ? 'gpt-plus' : 'gpt-5',
            mode: 'fast',
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const content: string =
          data.content ?? data.text ?? data.reply ?? JSON.stringify(data);

        updateLastAssistantMessage(conversationId, content);
      } catch {
        updateLastAssistantMessage(
          conversationId,
          'Une erreur est survenue. Vérifiez votre connexion et réessayez.',
        );
      } finally {
        setStreaming(false);
      }
    },
    [
      conversationId,
      isStreaming,
      isPremium,
      addMessage,
      updateLastAssistantMessage,
      setStreaming,
      incrementRequestCount,
    ],
  );

  if (!conversation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-snow/30 text-sm">Conversation introuvable.</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex flex-col h-screen pt-20">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6 space-y-5">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-snow/20 text-sm">Envoyez un message pour démarrer</p>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isNew={i === messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} className="h-1" />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        disabled={isStreaming}
        placeholder={isStreaming ? 'ChatLine génère une réponse…' : 'Posez votre question…'}
      />
    </div>
  );
}
