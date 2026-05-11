'use client';

import { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/cn';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  disabled = false,
  placeholder = 'Posez votre question…',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 180) + 'px';
  }, [value]);

  // Focus glow animation
  useEffect(() => {
    if (!wrapperRef.current) return;
    if (focused) {
      gsap.to(wrapperRef.current, {
        boxShadow:
          '0 0 0 1px rgba(245,208,66,0.35), 0 0 30px rgba(245,208,66,0.08)',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(wrapperRef.current, {
        boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [focused]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="sticky bottom-0 left-0 right-0 z-20 px-4 pb-5 pt-3">
      {/* Gradient fade above input */}
      <div className="absolute bottom-full left-0 right-0 h-16 bg-gradient-to-t from-ink to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        <div
          ref={wrapperRef}
          className="flex items-end gap-3 px-4 py-3 rounded-2xl bg-ink-card border border-rim backdrop-blur-xl transition-none"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.5)' }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              'flex-1 resize-none bg-transparent text-snow/90 placeholder-snow/25 text-sm leading-relaxed outline-none',
              'scrollbar-none overflow-hidden',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
            style={{ maxHeight: '180px' }}
          />

          {/* Model indicator */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 mb-0.5">
            <span className="text-[10px] text-snow/30 font-medium">GPT-5</span>
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={cn(
              'shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150',
              canSend
                ? 'bg-gold text-ink hover:brightness-105 hover:scale-105 active:scale-95'
                : 'bg-snow-dim text-snow/20 cursor-not-allowed',
            )}
            aria-label="Envoyer"
          >
            <SendIcon />
          </button>
        </div>

        <p className="text-center text-[10px] text-snow/20 mt-2">
          ChatLine peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M12.5 1.5L6.5 7.5M12.5 1.5L9 12.5L6.5 7.5M12.5 1.5L1.5 5L6.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
