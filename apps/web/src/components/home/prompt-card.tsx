'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/cn';

interface PromptCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  delay?: number;
}

export default function PromptCard({
  icon,
  title,
  description,
  onClick,
  delay = 0,
}: PromptCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 20, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
        delay,
      },
    );
  }, [delay]);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -4,
      scale: 1.02,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
    });
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative text-left p-4 rounded-2xl border border-rim bg-ink-surface hover:border-gold/20 transition-colors duration-200 cursor-pointer"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245,208,66,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative">
        <span className="text-2xl mb-2.5 block">{icon}</span>
        <p className="text-sm font-semibold text-snow/80 mb-1 group-hover:text-snow transition-colors">
          {title}
        </p>
        <p className="text-xs text-snow/35 leading-relaxed">{description}</p>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-60 transition-opacity duration-200 text-gold">
        <ArrowIcon />
      </div>
    </button>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 11L11 3M11 3H5M11 3v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
