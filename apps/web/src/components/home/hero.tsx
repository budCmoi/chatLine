'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import PromptCard from './prompt-card';
import ChatInput from '@/components/chat/chat-input';
import { useChatStore } from '@/store/chat-store';

const PROMPTS = [
  {
    icon: '✦',
    title: 'Expliquer un concept',
    description: 'Rendez n\'importe quel sujet simple et clair',
    prompt: 'Explique-moi le concept de l\'intelligence artificielle comme si j\'avais 15 ans.',
  },
  {
    icon: '◈',
    title: 'Idées business',
    description: 'Générez des idées innovantes pour votre activité',
    prompt: 'Donne-moi 5 idées de business innovantes pour 2025 avec un faible investissement initial.',
  },
  {
    icon: '⬡',
    title: 'Texte professionnel',
    description: 'Rédigez emails, présentations et contenus',
    prompt: 'Écris un email professionnel pour relancer un client qui n\'a pas répondu depuis 2 semaines.',
  },
  {
    icon: '◎',
    title: 'Checklist & Plan',
    description: 'Organisez vos projets pas à pas',
    prompt: 'Crée une checklist complète pour lancer un projet web de A à Z.',
  },
  {
    icon: '⟐',
    title: 'Analyse & Critique',
    description: 'Obtenez un regard expert sur vos travaux',
    prompt: 'Analyse les forces et faiblesses de ce modèle économique et propose des améliorations.',
  },
  {
    icon: '⬦',
    title: 'Code & Technique',
    description: 'Résolvez vos problèmes techniques',
    prompt: 'Explique-moi la différence entre REST et GraphQL et quand utiliser l\'un ou l\'autre.',
  },
];

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const createConversation = useChatStore((s) => s.createConversation);
  const addMessage = useChatStore((s) => s.addMessage);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        0,
      );
    }

    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.65, ease: 'power3.out' },
        0.1,
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.45,
      );
    }
  }, []);

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

  const handleSend = (text: string) => {
    handlePrompt(text);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 45% at 50% 25%, rgba(245,208,66,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Content — centred, max-width */}
      <div className="flex-1 flex flex-col items-center justify-start pt-28 sm:pt-36 pb-8 px-4 sm:px-6">
        <div className="w-full max-w-4xl flex flex-col items-center">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] sm:text-xs text-gold/80 font-medium tracking-wide">
              Intelligence artificielle premium
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-center font-display font-bold text-[2.1rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-5 sm:mb-6"
            aria-label="L'IA qui vous comprend vraiment."
          >
            {["L'IA", 'qui', 'vous', 'comprend', 'vraiment.'].map((word, i) => (
              <span
                key={i}
                className={`word inline-block mr-[0.25em] sm:mr-[0.3em] ${
                  word === 'vraiment.' ? 'text-gradient' : 'text-snow'
                }`}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-center text-snow/45 text-sm sm:text-base md:text-lg max-w-sm sm:max-w-lg leading-relaxed mb-10 sm:mb-14 px-2"
          >
            Conversez, créez et explorez avec une intelligence artificielle
            pensée dans les moindres détails.
          </p>

          {/* Prompt suggestions grid
              Mobile: 1 col (2 cards visible to invite scroll)
              Tablet: 2 cols
              Desktop: 3 cols
          */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 mb-10 sm:mb-14">
            {PROMPTS.map((p, i) => (
              <PromptCard
                key={p.title}
                icon={p.icon}
                title={p.title}
                description={p.description}
                delay={0.6 + i * 0.07}
                onClick={() => handlePrompt(p.prompt)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating input — extra pb on mobile for bottom tab bar */}
      <ChatInput onSend={handleSend} placeholder="Posez n'importe quelle question…" />
    </div>
  );
}
