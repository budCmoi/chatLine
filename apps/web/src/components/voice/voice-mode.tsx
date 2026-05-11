'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import { RabbitLineArt } from '@/components/ui/line-art';

export default function VoiceMode() {
  const open = useChatStore((s) => s.voiceModeOpen);
  const setVoiceModeOpen = useChatStore((s) => s.setVoiceModeOpen);

  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const micRef = useRef<HTMLButtonElement>(null);

  // Entrance animation
  useEffect(() => {
    if (!containerRef.current) return;

    if (open) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, backdropFilter: 'blur(0px)' },
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
      );
      // Stagger in logo + status + bars
      if (logoRef.current) {
        gsap.fromTo(logoRef.current, { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.15, ease: 'power3.out' });
      }
      if (statusRef.current) {
        gsap.fromTo(statusRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, delay: 0.3, ease: 'power3.out' });
      }
      // Bars entrance
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        gsap.fromTo(
          bar,
          { scaleY: 0.15, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.6, delay: 0.2 + i * 0.04, ease: 'power3.out' },
        );
      });
    } else {
      gsap.to(containerRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' });
    }
  }, [open]);

  if (!open) return null;

  const BAR_COUNT = 9;
  const barHeights = [28, 48, 70, 90, 100, 90, 70, 48, 28]; // percent of 80px max

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: '#0B0B0B' }}
    >
      {/* Subtle animal background */}
      <div className="absolute inset-0 flex items-end justify-end pointer-events-none opacity-[0.04] pr-16 pb-16">
        <RabbitLineArt style={{ width: 260, height: 'auto', color: '#F5F5F5' }} />
      </div>

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 40% 28% at 50% 52%, rgba(246,211,101,0.04) 0%, transparent 60%)' }}
      />

      {/* Logo */}
      <div ref={logoRef} className="mb-12">
        <span className="font-display font-bold text-2xl text-snow tracking-tight">
          Chat<span className="text-gold">Line</span>
        </span>
      </div>

      {/* Waveform bars */}
      <div className="flex items-center gap-[5px] mb-10" style={{ height: '80px' }}>
        {barHeights.map((h, i) => (
          <div
            key={i}
            ref={(el) => { barsRef.current[i] = el; }}
            className="rounded-full"
            style={{
              width: 4,
              height: `${h}%`,
              background: i === Math.floor(BAR_COUNT / 2) ? '#F6D365' : 'rgba(245,245,245,0.35)',
              animation: `wave ${0.9 + (i % 3) * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Status */}
      <p ref={statusRef} className="text-snow/40 text-sm tracking-wider mb-10">
        Écoute en cours<span className="animate-pulse">…</span>
      </p>

      {/* Mic button */}
      <button
        ref={micRef}
        className="relative group w-16 h-16 rounded-2xl bg-snow/[0.04] border border-rim flex items-center justify-center hover:border-gold/25 hover:bg-gold/[0.06] transition-all duration-200"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-2xl animate-ping bg-gold/10 pointer-events-none" />
        <MicIcon />
      </button>

      {/* Close */}
      <button
        onClick={() => setVoiceModeOpen(false)}
        className="absolute top-6 right-6 w-10 h-10 rounded-xl flex items-center justify-center text-snow/25 hover:text-snow/70 hover:bg-snow/[0.06] transition-all"
      >
        <CloseIcon />
      </button>

      {/* Hint */}
      <p className="absolute bottom-8 text-[11px] text-snow/15 tracking-widest uppercase">
        Tapez Échap pour fermer
      </p>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-snow/70">
      <rect x="8" y="1" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 11a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 18v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
