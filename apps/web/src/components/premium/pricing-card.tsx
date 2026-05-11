'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface PricingCardProps {
  plan: 'free' | 'premium';
  delay?: number;
}

export default function PricingCard({ plan, delay = 0 }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isPremium = plan === 'premium';

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay },
    );
  }, [delay]);

  const features = isPremium
    ? [
        'Conversations illimitées',
        'GPT Plus (dernière version)',
        'Claude Opus 4',
        'Gemini Ultra',
        'Réponses prioritaires ultra-rapides',
        'Historique illimité',
        'Accès anticipé aux nouveaux modèles',
        'Support premium 24/7',
      ]
    : [
        '20 messages par session',
        'GPT-5 standard',
        'Historique de session',
        'Accès à la communauté',
      ];

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative flex flex-col rounded-3xl border p-7 transition-all duration-300',
        isPremium
          ? 'border-gold/25 bg-gradient-to-b from-ink-surface to-ink-card shadow-gold'
          : 'border-rim bg-ink-surface',
      )}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Background glow for premium */}
      {isPremium && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% -10%, rgba(245,208,66,0.07) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Badge */}
      {isPremium && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold text-ink text-xs font-bold tracking-wide shadow-gold-sm">
            ✦ Recommandé
          </span>
        </div>
      )}

      {/* Plan name */}
      <div className="relative mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-snow/35 mb-2">
          {isPremium ? 'Premium' : 'Gratuit'}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-4xl text-snow">
            {isPremium ? '19' : '0'}
          </span>
          <span className="text-snow/40 text-sm">€ / mois</span>
        </div>
        {isPremium && (
          <p className="text-xs text-snow/35 mt-1.5">
            ou <span className="text-gold/60">190€ / an</span>{' '}
            <span className="text-snow/25">— économisez 2 mois</span>
          </p>
        )}
      </div>

      {/* Separator */}
      <div className={cn('h-px mb-5', isPremium ? 'bg-gold/10' : 'bg-rim')} />

      {/* Features */}
      <ul className="relative flex-1 space-y-3 mb-7">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-3">
            <div
              className={cn(
                'w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                isPremium
                  ? 'bg-gold/20 border border-gold/30'
                  : 'bg-snow-dim border border-rim',
              )}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                  d="M1 4l2 2 4-4"
                  stroke={isPremium ? '#F5D042' : 'rgba(242,242,242,0.4)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              className={cn(
                'text-sm leading-relaxed',
                isPremium ? 'text-snow/75' : 'text-snow/45',
              )}
            >
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="relative">
        {isPremium ? (
          <Button size="lg" className="w-full">
            Commencer — 19€ / mois
          </Button>
        ) : (
          <Button variant="outline" size="lg" className="w-full">
            Continuer gratuitement
          </Button>
        )}
        {isPremium && (
          <p className="text-center text-xs text-snow/25 mt-3">
            Sans engagement · Annulez à tout moment
          </p>
        )}
      </div>
    </div>
  );
}
