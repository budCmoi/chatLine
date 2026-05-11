'use client';

import { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/cn';
import { useChatStore } from '@/store/chat-store';

const MODELS = ['GPT-5', 'GPT Plus', 'Claude Sonnet', 'Claude Opus'];
const MODES = ['Rapide', 'Précis', 'Créatif'];

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
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const selectedModel = useChatStore((s) => s.selectedModel);
  const setSelectedModel = useChatStore((s) => s.setSelectedModel);
  const selectedMode = useChatStore((s) => s.selectedMode);
  const setSelectedMode = useChatStore((s) => s.setSelectedMode);
  const setVoiceModeOpen = useChatStore((s) => s.setVoiceModeOpen);

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
        boxShadow: '0 0 0 1px rgba(246,211,101,0.3), 0 0 28px rgba(246,211,101,0.06)',
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(wrapperRef.current, {
        boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.5)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [focused]);

  // Options popup animation
  useEffect(() => {
    if (!optionsRef.current) return;
    if (showOptions) {
      gsap.fromTo(
        optionsRef.current,
        { opacity: 0, y: 6, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: 'power2.out' },
      );
    }
  }, [showOptions]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') setShowOptions(false);
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="sticky bottom-0 left-0 right-0 z-20 px-4 pb-5 pt-3">
      {/* Gradient fade above input */}
      <div className="absolute bottom-full left-0 right-0 h-16 bg-gradient-to-t from-ink to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* AI Options popup */}
        {showOptions && (
          <div
            ref={optionsRef}
            className="absolute bottom-full mb-2 left-0 z-30 w-72 p-4 rounded-2xl border border-rim bg-ink-card backdrop-blur-xl"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
          >
            <div className="mb-3">
              <p className="text-[10px] text-snow/30 uppercase tracking-widest mb-2">Modèle</p>
              <div className="flex flex-wrap gap-1.5">
                {MODELS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedModel(m)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150',
                      selectedModel === m ? 'bg-gold text-ink' : 'bg-snow/[0.05] text-snow/50 hover:bg-snow/[0.08] border border-rim',
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-snow/30 uppercase tracking-widest mb-2">Mode</p>
              <div className="flex gap-1.5">
                {MODES.map((md) => (
                  <button
                    key={md}
                    onClick={() => setSelectedMode(md)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150',
                      selectedMode === md ? 'bg-gold text-ink' : 'bg-snow/[0.05] text-snow/50 hover:bg-snow/[0.08] border border-rim',
                    )}
                  >
                    {md}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          ref={wrapperRef}
          className="flex items-end gap-2 px-3 py-3 rounded-2xl bg-ink-card border border-rim backdrop-blur-xl transition-none"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.5)' }}
        >
          {/* AI Options button */}
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={cn(
              'shrink-0 mb-0.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-all duration-150',
              showOptions
                ? 'border-gold/25 bg-gold/[0.08] text-gold/80'
                : 'border-rim bg-snow/[0.04] text-snow/35 hover:text-snow/60 hover:border-rim/80',
            )}
          >
            <SparkIcon />
            <span className="hidden sm:inline">{selectedModel}</span>
          </button>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { setFocused(true); setShowOptions(false); }}
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

          {/* Mic button */}
          <button
            onClick={() => setVoiceModeOpen(true)}
            className="shrink-0 mb-0.5 w-8 h-8 rounded-xl flex items-center justify-center text-snow/30 hover:text-snow/70 hover:bg-snow/[0.06] border border-transparent hover:border-rim transition-all duration-150"
            aria-label="Mode voix"
          >
            <MicIcon />
          </button>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={cn(
              'shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150',
              canSend
                ? 'bg-gold text-ink hover:brightness-105 hover:scale-105 active:scale-95'
                : 'bg-snow/[0.05] text-snow/20 cursor-not-allowed',
            )}
            aria-label="Envoyer"
          >
            <SendIcon />
          </button>
        </div>

        <p className="text-center text-[10px] text-snow/15 mt-2">
          ChatLine peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12.5 1.5L6.5 7.5M12.5 1.5L9 12.5L6.5 7.5M12.5 1.5L1.5 5L6.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MicIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="5" y="1" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 7a4.5 4.5 0 009 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7 11.5V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1l1 3.5L10.5 6 7 7l-1 4L5 7 1.5 6 5 4.5 6 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}
