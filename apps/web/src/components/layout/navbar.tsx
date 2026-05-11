'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);
  const createConversation = useChatStore((s) => s.createConversation);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 },
    );
  }, []);

  const handleNewChat = () => {
    router.push('/');
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-3"
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 py-2.5 rounded-2xl border border-rim backdrop-blur-xl bg-ink/80">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-snow/40 hover:text-snow hover:bg-snow-dim transition-all duration-200"
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>

          <Link
            href="/"
            className="font-display font-bold text-lg tracking-tight text-snow"
          >
            Chat<span className="text-gold">Line</span>
          </Link>
        </div>

        {/* Center — nav links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink href="/" active={pathname === '/'}>
            Accueil
          </NavLink>
          <NavLink href="/premium" active={pathname === '/premium'}>
            Premium
          </NavLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewChat}
            className="hidden sm:flex items-center gap-1.5 text-xs text-snow/50 hover:text-snow/80 transition-colors px-3 py-1.5 rounded-lg border border-rim hover:border-rim/80"
          >
            <PlusIcon />
            Nouveau chat
          </button>

          <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center cursor-pointer hover:bg-gold/15 transition-colors">
            <span className="text-gold text-xs font-bold">A</span>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm px-3 py-1.5 rounded-lg transition-all duration-200',
        active
          ? 'text-snow bg-snow-dim'
          : 'text-snow/50 hover:text-snow hover:bg-snow-dim',
      )}
    >
      {children}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <path
        d="M1.5 3.5h12M1.5 7.5h12M1.5 11.5h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1.5v9M1.5 6h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
