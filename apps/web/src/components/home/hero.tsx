'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { FoxLineArt, DeerLineArt, HeronLineArt } from '@/components/ui/line-art';
import ChatInput from '@/components/chat/chat-input';
import { useChatStore } from '@/store/chat-store';

// ─── Quick action prompts ─────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  {
    icon: '◈',
    label: 'Créer une image',
    prompt: 'Décris-moi une image que tu aimerais générer, et je te donnerai un prompt détaillé pour la créer.',
  },
  {
    icon: '✦',
    label: 'Donne-moi une idée',
    prompt: 'Donne-moi 5 idées originales et innovantes pour un projet personnel ou professionnel en 2025.',
  },
  {
    icon: '⬡',
    label: 'Fais une checklist',
    prompt: 'Crée une checklist complète et structurée pour m\'aider à organiser mon prochain projet.',
  },
  {
    icon: '⬦',
    label: 'Commencer un chat',
    prompt: 'Bonjour ! Je suis prêt à discuter de tout sujet. Comment puis-je t\'aider aujourd\'hui ?',
  },
];

// ─── Feature sections ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    Animal: FoxLineArt,
    flip: false,
    label: 'Intelligence adaptative',
    heading: "Comprend le contexte,\npas juste les mots.",
    description:
      "ChatLine analyse la nuance de chaque échange pour vous offrir des réponses précises, contextuelles et toujours pertinentes.",
    accentBg: 'rgba(246,211,101,0.025)',
  },
  {
    Animal: DeerLineArt,
    flip: true,
    label: 'Création sans effort',
    heading: "Écrivez, créez, planifiez\nen quelques secondes.",
    description:
      "Emails professionnels, plans de projet, idées créatives — ChatLine génère des contenus prêts à l'emploi en une seule requête.",
    accentBg: 'rgba(245,245,245,0.012)',
  },
  {
    Animal: HeronLineArt,
    flip: false,
    label: 'Analyse approfondie',
    heading: "Décryptez l'information,\nprenez de meilleures décisions.",
    description:
      "Résumés, analyses comparatives, critique constructive — obtenez une expertise instantanée sur n'importe quel sujet.",
    accentBg: 'rgba(246,211,101,0.018)',
  },
] as const;

// ─── Feature block ────────────────────────────────────────────────────────────
function FeatureBlock({
  Animal,
  flip,
  label,
  heading,
  description,
  accentBg,
}: (typeof FEATURES)[number]) {
  const blockRef = useRef<HTMLDivElement>(null);
  const animalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
          if (animalRef.current) {
            const paths = animalRef.current.querySelectorAll('path, ellipse, circle');
            gsap.set(paths, { strokeDasharray: 2000, strokeDashoffset: 2000, opacity: 0 });
            gsap.to(paths, {
              strokeDashoffset: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 2.2,
              ease: 'power2.out',
              delay: 0.4,
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const textBlock = (
    <div className="flex-1 flex flex-col justify-center">
      <div className="inline-flex items-center gap-2 mb-5">
        <div className="w-1 h-1 rounded-full bg-gold" />
        <span className="text-[10px] text-gold/70 font-medium tracking-widest uppercase">
          {label}
        </span>
      </div>
      <h2
        className="heading-mono text-2xl sm:text-3xl md:text-4xl text-snow/90 mb-5"
        style={{ whiteSpace: 'pre-line' }}
      >
        {heading}
      </h2>
      <p className="text-gray text-sm sm:text-base leading-relaxed max-w-md">
        {description}
      </p>
    </div>
  );

  const animalBlock = (
    <div
      ref={animalRef}
      className="flex-1 flex items-center justify-center relative"
      style={{ minHeight: '280px' }}
    >
      <div
        className="absolute inset-8 rounded-3xl"
        style={{ background: accentBg }}
      />
      <Animal
        className="relative w-52 h-64 sm:w-60 sm:h-80 text-snow/25"
        strokeWidth={0.85}
      />
    </div>
  );

  return (
    <div
      ref={blockRef}
      className="flex flex-col md:flex-row items-center gap-12 md:gap-20 opacity-0"
    >
      {flip ? <>{animalBlock}{textBlock}</> : <>{textBlock}{animalBlock}</>}
    </div>
  );
}

// ─── Hero heading ─────────────────────────────────────────────────────────────
function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, 0);
    }
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.fromTo(words, { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, 0.15);
    }
    if (subRef.current) {
      tl.fromTo(subRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.55);
    }
  }, []);

  return (
    <div className="text-center pt-36 pb-24 px-4">
      <div
        ref={badgeRef}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/15 bg-gold/[0.05] mb-10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-dot" />
        <span className="text-[10px] text-gold/75 font-medium tracking-widest uppercase">
          Intelligence artificielle
        </span>
      </div>

      <h1
        ref={headingRef}
        className="heading-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-7 max-w-5xl mx-auto"
        aria-label="L'IA qui pense avec vous."
      >
        {["L'IA", 'qui', 'pense', 'avec', 'vous.'].map((word, i) => (
          <span
            key={i}
            className={`word inline-block mr-[0.2em] ${word === 'vous.' ? 'text-gradient' : 'text-snow/90'}`}
          >
            {word}
          </span>
        ))}
      </h1>

      <p ref={subRef} className="text-gray text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
        Conversez, créez et analysez avec un assistant conçu pour les esprits exigeants.
      </p>
    </div>
  );
}

// ─── Quick actions ────────────────────────────────────────────────────────────
function QuickActionsSection({ onAction }: { onAction: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            el.querySelectorAll('.q-btn'),
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' },
          );
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-20 px-4">
      <div className="max-w-app mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px w-16 bg-rim" />
          <span className="text-gray/40 text-[10px] tracking-widest uppercase">Actions rapides</span>
          <div className="h-px w-16 bg-rim" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a.label}
              onClick={() => onAction(a.prompt)}
              className="q-btn opacity-0 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gold text-ink font-semibold text-sm tracking-tight hover:brightness-105 hover:scale-[1.02] active:scale-95 transition-all duration-150"
            >
              <span className="text-base leading-none">{a.icon}</span>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function Hero() {
  const router = useRouter();
  const createConversation = useChatStore((s) => s.createConversation);
  const addMessage = useChatStore((s) => s.addMessage);

  const handlePrompt = (prompt: string) => {
    const id = createConversation(prompt);
    addMessage(id, {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt,
      createdAt: Date.now(),
    });
    router.push(`/c/${id}`);
  };

  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 30% at 50% 8%, rgba(246,211,101,0.04) 0%, transparent 60%)' }}
      />

      <HeroSection />

      <div className="max-w-app mx-auto px-6 sm:px-10 space-y-28 pb-28">
        {FEATURES.map((feat) => (
          <FeatureBlock key={feat.label} {...feat} />
        ))}
      </div>

      <div className="border-t border-rim">
        <QuickActionsSection onAction={handlePrompt} />
      </div>

      <ChatInput onSend={handlePrompt} placeholder="Posez n'importe quelle question…" />
    </div>
  );
}

