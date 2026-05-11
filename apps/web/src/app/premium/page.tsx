'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AppShell from '@/components/layout/app-shell';
import PricingCard from '@/components/premium/pricing-card';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Ultra rapide',
    description: 'Réponses en moins d\'une seconde grâce à notre infrastructure GPU dédiée.',
  },
  {
    icon: '🔒',
    title: 'Privé & sécurisé',
    description: 'Vos conversations ne sont jamais utilisées pour entraîner nos modèles.',
  },
  {
    icon: '∞',
    title: 'Sans limites',
    description: 'Conversations illimitées, pas de minuteries, pas de files d\'attente.',
  },
  {
    icon: '✦',
    title: 'Meilleurs modèles',
    description: 'Accès à GPT Plus, Claude Opus et tous les modèles de pointe.',
  },
];

function PremiumPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0);
    }
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.fromTo(words, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out' }, 0.15);
    }
    if (subRef.current) {
      tl.fromTo(subRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.45);
    }
  }, []);

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 35% at 50% 15%, rgba(245,208,66,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-20">
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs text-gold/80 font-medium tracking-wide">
              Accès illimité à l'IA premium
            </span>
          </div>

          <h1
            ref={headingRef}
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-6"
          >
            {['L\'IA', 'sans', 'compromis.'].map((word, i) => (
              <span
                key={i}
                className={`word inline-block mr-[0.25em] ${word === 'sans' ? 'text-gradient' : 'text-snow'}`}
              >
                {word}
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="text-snow/45 text-lg max-w-lg mx-auto leading-relaxed"
          >
            Accédez à des modèles de classe mondiale, sans attente ni limitation.
            Une expérience pensée pour les professionnels exigeants.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {FEATURES.map((feat, i) => (
            <FeatureCard key={feat.title} {...feat} delay={0.5 + i * 0.08} />
          ))}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
          <PricingCard plan="free" delay={0.7} />
          <PricingCard plan="premium" delay={0.8} />
        </div>

        {/* FAQ teaser */}
        <div className="text-center">
          <p className="text-snow/25 text-sm">
            Des questions ?{' '}
            <button className="text-gold/60 hover:text-gold transition-colors underline underline-offset-4">
              Consultez notre FAQ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay },
    );
  }, [delay]);

  return (
    <div
      ref={ref}
      className="p-5 rounded-2xl border border-rim bg-ink-surface hover:border-gold/15 transition-colors duration-300"
    >
      <span className="text-2xl mb-3 block">{icon}</span>
      <p className="font-semibold text-snow/80 text-sm mb-1.5">{title}</p>
      <p className="text-xs text-snow/35 leading-relaxed">{description}</p>
    </div>
  );
}

export default function PremiumPageWrapper() {
  return (
    <AppShell>
      <PremiumPage />
    </AppShell>
  );
}
