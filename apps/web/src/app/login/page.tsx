'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { FoxLineArt, DeerLineArt, HeronLineArt, WolfLineArt, RabbitLineArt } from '@/components/ui/line-art';

// ─── Background animated lines ───────────────────────────────────────────────
function BackgroundGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#F5F5F5" strokeWidth="0.5" />
          </pattern>
          <pattern id="cross" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="60" cy="60" r="1.5" fill="#F6D365" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#cross)" />
      </svg>

      {/* Animated flowing curves */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M -100 200 C 200 100, 400 300, 700 150 C 900 50, 1100 250, 1400 180"
          fill="none" stroke="rgba(246,211,101,0.08)" strokeWidth="1"
          className="animate-[scroll-x_25s_linear_infinite]"
        />
        <path
          d="M -100 400 C 300 320, 500 480, 800 380 C 1000 300, 1200 440, 1500 360"
          fill="none" stroke="rgba(245,245,245,0.04)" strokeWidth="0.8"
          className="animate-[scroll-x_35s_linear_infinite]"
        />
        <path
          d="M -100 600 C 250 520, 600 680, 900 560 C 1100 480, 1300 620, 1600 540"
          fill="none" stroke="rgba(246,211,101,0.05)" strokeWidth="1"
          className="animate-[scroll-x_30s_linear_infinite_reverse]"
        />
      </svg>
    </div>
  );
}

// ─── Scrolling animals strip ──────────────────────────────────────────────────
function AnimalsStrip() {
  const animals = [
    { Component: FoxLineArt, label: 'Renard' },
    { Component: DeerLineArt, label: 'Cerf' },
    { Component: HeronLineArt, label: 'Héron' },
    { Component: WolfLineArt, label: 'Loup' },
    { Component: RabbitLineArt, label: 'Lapin' },
    // Duplicate for seamless loop
    { Component: FoxLineArt, label: 'Renard2' },
    { Component: DeerLineArt, label: 'Cerf2' },
    { Component: HeronLineArt, label: 'Héron2' },
    { Component: WolfLineArt, label: 'Loup2' },
    { Component: RabbitLineArt, label: 'Lapin2' },
  ];

  return (
    <div className="relative w-full overflow-hidden py-6" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
      <div
        className="flex gap-12 items-center"
        style={{ animation: 'scroll-x 28s linear infinite', width: 'max-content' }}
      >
        {animals.map(({ Component, label }) => (
          <div key={label} className="flex-shrink-0 w-16 h-20">
            <Component
              className="w-full h-full text-snow/20"
              strokeWidth={0.9}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Social login button ──────────────────────────────────────────────────────
function SocialButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-rim bg-snow/[0.03] hover:bg-snow/[0.06] hover:border-snow/10 transition-all duration-200 text-snow/60 hover:text-snow/85 text-xs font-medium tracking-wide active:scale-95"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const logoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    if (logoRef.current) {
      tl.fromTo(logoRef.current, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0);
    }
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll('.char');
      tl.fromTo(chars, { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.6, ease: 'power3.out' }, 0.2);
    }
    if (subRef.current) {
      tl.fromTo(subRef.current, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.55);
    }
    if (buttonsRef.current) {
      const btns = buttonsRef.current.querySelectorAll('button, a');
      tl.fromTo(btns, { y: 14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: 'power3.out' }, 0.7);
    }
    if (socialRef.current) {
      const btns = socialRef.current.querySelectorAll('button');
      tl.fromTo(btns, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }, 0.9);
    }
  }, []);

  const heading = 'Bonjour.';

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-between relative overflow-hidden px-4">
      <BackgroundGrid />

      {/* Soft top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(246,211,101,0.05) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center flex-1 w-full max-w-app mx-auto">
        {/* Logo */}
        <div ref={logoRef} className="mb-12 select-none">
          <span className="font-display font-bold text-xl text-snow tracking-tight">
            Chat<span className="text-gold">Line</span>
          </span>
        </div>

        {/* Heading */}
        <h1
          ref={headingRef}
          className="heading-mono text-6xl sm:text-7xl md:text-8xl text-center mb-4 tracking-tighter"
          aria-label={heading}
        >
          {heading.split('').map((char, i) => (
            <span
              key={i}
              className={`char inline-block ${char === '.' ? 'text-gold' : 'text-snow'}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className="text-gray text-base sm:text-lg text-center max-w-md leading-relaxed mb-10">
          L&apos;assistant IA qui pense avec vous.
        </p>

        {/* Scrolling animals */}
        <div className="w-full mb-10">
          <AnimalsStrip />
        </div>

        {/* Primary buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-8">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-ink font-semibold text-sm tracking-tight hover:brightness-105 active:scale-95 transition-all duration-150"
          >
            <LogInIcon />
            Se connecter
          </Link>
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-rim bg-snow/[0.03] hover:bg-snow/[0.06] text-snow/80 font-medium text-sm tracking-tight hover:border-snow/12 active:scale-95 transition-all duration-150">
            <UserPlusIcon />
            Créer un compte
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full max-w-sm mb-6">
          <div className="flex-1 h-px bg-rim" />
          <span className="text-gray/50 text-xs">ou continuer avec</span>
          <div className="flex-1 h-px bg-rim" />
        </div>

        {/* Social login */}
        <div ref={socialRef} className="grid grid-cols-2 gap-2.5 w-full max-w-sm mb-8">
          <SocialButton icon={<AppleIcon />} label="Apple" />
          <SocialButton icon={<GoogleIcon />} label="Google" />
          <SocialButton icon={<MicrosoftIcon />} label="Microsoft" />
          <SocialButton icon={<YahooIcon />} label="Yahoo" />
        </div>

        {/* Demo mode */}
        <Link
          href="/"
          className="text-gray/50 hover:text-gold/70 text-xs transition-colors duration-200 flex items-center gap-1.5"
        >
          <span>Mode démo</span>
          <ArrowRightIcon />
        </Link>
      </div>

      {/* Footer */}
      <div className="relative pb-6 text-center">
        <p className="text-gray/30 text-[11px]">
          En continuant, vous acceptez nos{' '}
          <button className="underline underline-offset-2 hover:text-gray/60 transition-colors">conditions</button>
          {' '}et notre{' '}
          <button className="underline underline-offset-2 hover:text-gray/60 transition-colors">politique de confidentialité</button>.
        </p>
      </div>
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function LogInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 2h3a1 1 0 011 1v8a1 1 0 01-1 1H9M6 10l4-3-4-3M1 7h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1 12c0-2.2 2.2-4 5-4M11 9v5M8.5 11.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11 9.5c-.6 1.2-1 1.8-1.7 1.8-.6 0-1-.4-1.8-.4-.8 0-1.2.4-1.9.4C4.9 11.3 3 8.5 3 6.5c0-2 1.3-3 2.5-3 .7 0 1.3.4 1.8.4.5 0 1.1-.5 1.9-.5 1 0 1.9.6 2.3 1.5-2.1 1.1-1.7 4-.5 4.6zM8.5 2c.1.7-.2 1.4-.6 1.9-.4.5-1 .9-1.7.8-.1-.7.2-1.4.6-1.9.5-.5 1.1-.9 1.7-.8z" fill="currentColor" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12.5 7.1c0-.4 0-.8-.1-1.1H7v2.2h3.1c-.1.7-.5 1.3-1.1 1.7v1.4h1.8c1-.9 1.7-2.3 1.7-4.2z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M7 12.5c1.6 0 3-.5 4-1.4l-1.8-1.4c-.5.3-1.2.5-2.2.5-1.7 0-3.1-1.1-3.6-2.7H1.5v1.4C2.5 11.3 4.6 12.5 7 12.5z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M3.4 7.5c-.1-.4-.2-.7-.2-1.1 0-.4.1-.8.2-1.1V3.9H1.5C1.2 4.5 1 5.2 1 6s.2 1.5.5 2.1l1.9-1.4v.8z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M7 3.4c1 0 1.8.3 2.5 1l1.8-1.8C10.1 1.5 8.7 1 7 1 4.6 1 2.5 2.3 1.5 4.1l1.9 1.4c.5-1.5 2-2.1 3.6-2.1z" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1.5" y="1.5" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7.5" y="1.5" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1.5" y="7.5" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7.5" y="7.5" width="5" height="5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function YahooIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2.5L5.5 8.5V12M12 2.5L8.5 8.5V12M5.5 8.5H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
