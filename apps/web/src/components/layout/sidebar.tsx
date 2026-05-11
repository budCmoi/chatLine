'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import { cn } from '@/lib/cn';
import type { Conversation } from '@/store/chat-store';

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sidebarOpen = useChatStore((s) => s.sidebarOpen);
  const setSidebarOpen = useChatStore((s) => s.setSidebarOpen);
  const conversations = useChatStore((s) => s.conversations);
  const currentConversationId = useChatStore((s) => s.currentConversationId);
  const deleteConversation = useChatStore((s) => s.deleteConversation);
  const setCurrentConversation = useChatStore((s) => s.setCurrentConversation);

  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (sidebarOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.fromTo(
        sidebarRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.in',
      });
      gsap.to(sidebarRef.current, {
        x: -12,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [sidebarOpen]);

  const handleSelect = (conv: Conversation) => {
    setCurrentConversation(conv.id);
    router.push(`/c/${conv.id}`);
    setSidebarOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    deleteConversation(id);
    if (currentConversationId === id) {
      router.push('/');
    }
  };

  // Group by date
  const today = new Date();
  const todayStr = today.toDateString();
  const yesterdayStr = new Date(today.getTime() - 86400000).toDateString();

  const grouped = conversations.reduce<
    Record<string, Conversation[]>
  >((acc, conv) => {
    const d = new Date(conv.updatedAt).toDateString();
    const key =
      d === todayStr ? "Aujourd'hui" : d === yesterdayStr ? 'Hier' : 'Plus ancien';
    if (!acc[key]) acc[key] = [];
    acc[key].push(conv);
    return acc;
  }, {});

  const groupOrder = ["Aujourd'hui", 'Hier', 'Plus ancien'];

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-xs opacity-0 pointer-events-none"
      />

      {/* Sidebar panel */}
      <aside
        ref={sidebarRef}
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-72 flex flex-col',
          'bg-ink/95 backdrop-blur-2xl border-r border-rim',
          'opacity-0',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rim mt-0">
          <span className="font-display font-bold text-base text-snow">
            Chat<span className="text-gold">Line</span>
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-snow/40 hover:text-snow hover:bg-snow-dim transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* New chat button */}
        <div className="px-4 py-3">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-xl border border-dashed border-rim hover:border-gold/30 text-snow/50 hover:text-snow/80 transition-all duration-200 text-sm group"
          >
            <span className="w-5 h-5 rounded-md bg-snow-dim flex items-center justify-center group-hover:bg-gold/10 transition-colors">
              <PlusIcon />
            </span>
            Nouveau chat
          </Link>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4 scrollbar-thin">
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-snow/25 text-sm">Aucune conversation</p>
            </div>
          ) : (
            groupOrder.map((group) => {
              const convs = grouped[group];
              if (!convs || convs.length === 0) return null;
              return (
                <div key={group}>
                  <p className="text-xs text-snow/25 font-medium px-2 mb-1.5 uppercase tracking-wider">
                    {group}
                  </p>
                  <div className="space-y-0.5">
                    {convs.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conv={conv}
                        active={conv.id === currentConversationId}
                        onSelect={() => handleSelect(conv)}
                        onDelete={(e) => handleDelete(e, conv.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-rim px-4 py-4 space-y-1">
          <Link
            href="/premium"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gold/8 transition-colors group"
          >
            <span className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
              <StarIcon />
            </span>
            <div>
              <p className="text-sm font-medium text-snow/80">Passer à Premium</p>
              <p className="text-xs text-snow/35">Accès illimité + Claude + GPT Plus</p>
            </div>
          </Link>

          <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-snow-dim transition-colors">
            <span className="w-7 h-7 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
              <span className="text-gold text-xs font-bold">A</span>
            </span>
            <div className="text-left">
              <p className="text-sm font-medium text-snow/80">Mon compte</p>
              <p className="text-xs text-snow/35">Paramètres</p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

function ConversationItem({
  conv,
  active,
  onSelect,
  onDelete,
}: {
  conv: Conversation;
  active: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all duration-150',
        active
          ? 'bg-gold/8 border border-gold/15 text-snow'
          : 'hover:bg-snow-dim text-snow/60 hover:text-snow/90',
      )}
    >
      <span className="flex-1 text-sm truncate">{conv.title}</span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center rounded text-snow/30 hover:text-snow/70 hover:bg-snow-dim"
      >
        <TrashIcon />
      </button>
    </button>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M1 1l10 10M11 1L1 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M5.5 1v9M1 5.5h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1l1.545 3.31L12 4.854l-2.5 2.43.59 3.426L7 9.148 3.91 10.71l.59-3.426L2 4.854l3.455-.544L7 1z"
        stroke="#F5D042"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path
        d="M1 2.5h9M4 2.5V1.5h3v1M2.5 2.5l.5 7h5l.5-7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
