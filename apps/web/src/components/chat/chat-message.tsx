'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/cn';
import type { Message } from '@/store/chat-store';

interface ChatMessageProps {
  message: Message;
  isNew?: boolean;
}

export default function ChatMessage({ message, isNew = false }: ChatMessageProps) {
  const msgRef = useRef<HTMLDivElement>(null);
  const isUser = message.role === 'user';

  useEffect(() => {
    if (!isNew || !msgRef.current) return;
    gsap.fromTo(
      msgRef.current,
      {
        y: isUser ? 10 : 10,
        opacity: 0,
        scale: 0.98,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
      },
    );
  }, [isNew, isUser]);

  return (
    <div
      ref={msgRef}
      className={cn(
        'flex w-full px-4 md:px-8',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'max-w-[78%] md:max-w-[65%]',
          isUser ? 'order-2' : 'order-1',
        )}
      >
        {/* Avatar for AI */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-gold/15 border border-gold/20 flex items-center justify-center">
              <AIIcon />
            </div>
            <span className="text-xs text-snow/35 font-medium">
              {message.model ?? 'ChatLine'}
            </span>
          </div>
        )}

        <div
          className={cn(
            'relative px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-gold text-ink font-medium rounded-2xl rounded-br-md shadow-md'
              : 'bg-ink-surface border border-rim text-snow/85 rounded-2xl rounded-bl-md shadow-card',
          )}
        >
          {message.content ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <TypingIndicator />
          )}
        </div>

        <p
          className={cn(
            'text-[10px] mt-1.5 text-snow/25',
            isUser ? 'text-right' : 'text-left',
          )}
        >
          {formatTime(message.createdAt)}
        </p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-0.5">
      {[0, 0.2, 0.4].map((delay, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-snow/40 animate-bounce"
          style={{ animationDelay: `${delay}s`, animationDuration: '1s' }}
        />
      ))}
    </div>
  );
}

function AIIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="2.5" stroke="#F5D042" strokeWidth="1.2" />
      <path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11" stroke="#F5D042" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
