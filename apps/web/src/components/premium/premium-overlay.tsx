'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import { Button } from '@/components/ui/button';

export default function PremiumOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const setShowPremiumOverlay = useChatStore((s) => s.setShowPremiumOverlay);

  useEffect(() => {
    if (!overlayRef.current || !cardRef.current) return;

    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' },
    );
    gsap.fromTo(
      cardRef.current,
      { y: 24, scale: 0.95, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.1 },
    );
  }, []);

  const handleDismiss = () => {
    if (!overlayRef.current || !cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 16,
      scale: 0.96,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      delay: 0.1,
      onComplete: () => setShowPremiumOverlay(false),
    });
  };

  const handleUpgrade = () => {
    handleDismiss();
    setTimeout(() => router.push('/premium'), 350);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-sm rounded-3xl border border-rim bg-ink-card p-8 text-center shadow-card"
      >
        {/* Glow accent */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(245,208,66,0.08) 0%, transparent 65%)',
          }}
        />

        {/* Icon */}
        <div className="relative mx-auto w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
          <StarIcon />
        </div>

        {/* Heading */}
        <h2 className="font-display font-bold text-2xl text-snow mb-3 relative">
          Passez à Premium
        </h2>
        <p className="text-snow/45 text-sm leading-relaxed mb-8 relative">
          Vous avez exploré tout ce que l'offre gratuite propose.
          Débloquez l'accès illimité, Claude Opus et GPT Plus.
        </p>

        {/* Features */}
        <div className="relative space-y-2.5 mb-8 text-left">
          {[
            'Conversations illimitées',
            'GPT Plus & Claude Opus',
            'Réponses prioritaires',
            'Accès aux derniers modèles',
          ].map((feat) => (
            <div key={feat} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <CheckIcon />
              </div>
              <span className="text-sm text-snow/70">{feat}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={handleUpgrade}
          size="lg"
          className="relative w-full"
        >
          Passer à Premium — 8,99€/mois
        </Button>

        <button
          onClick={handleDismiss}
          className="relative mt-4 text-xs text-snow/25 hover:text-snow/50 transition-colors"
        >
          Continuer sans premium
        </button>
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l2.618 5.51L21 8.618l-4.5 4.382 1.063 6.182L12 16.51l-5.563 2.672L7.5 13l-4.5-4.382 6.382-1.108L12 2z"
        stroke="#F5D042"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="rgba(245,208,66,0.15)"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path
        d="M1 4l2 2 4-4"
        stroke="#F5D042"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
