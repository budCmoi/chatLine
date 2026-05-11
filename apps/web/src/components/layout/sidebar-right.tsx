'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import { cn } from '@/lib/cn';

// ─── Types ────────────────────────────────────────────────────────────────────
type Section = 'profile' | 'subscription' | 'customize' | 'notifications' | 'data' | 'security';

const AI_TONES = ['Professionnel', 'Décontracté', 'Concis', 'Détaillé', 'Créatif'];
const THEMES = ['Sombre', 'Très sombre', 'Automatique'];
const MODELS = ['GPT-5', 'GPT Plus', 'Claude Opus', 'Claude Sonnet'];

// ─── Toggle row ───────────────────────────────────────────────────────────────
function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-snow/70 text-xs">{label}</span>
      <button
        onClick={onChange}
        className={cn(
          'relative w-9 h-5 rounded-full transition-colors duration-200',
          checked ? 'bg-gold/90' : 'bg-snow/10',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 w-4 h-4 rounded-full bg-ink transition-transform duration-200',
            checked ? 'translate-x-4' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 pt-5 pb-3 border-t border-rim first:pt-0 first:border-t-0">
      <span className="text-snow/35">{icon}</span>
      <span className="text-[10px] text-snow/35 uppercase tracking-widest font-medium">{label}</span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SidebarRight() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  const open = useChatStore((s) => s.rightSidebarOpen);
  const setOpen = useChatStore((s) => s.setRightSidebarOpen);
  const isPremium = useChatStore((s) => s.isPremium);
  const setPremium = useChatStore((s) => s.setPremium);
  const selectedModel = useChatStore((s) => s.selectedModel);
  const setSelectedModel = useChatStore((s) => s.setSelectedModel);
  const conversations = useChatStore((s) => s.conversations);
  const deleteConversation = useChatStore((s) => s.deleteConversation);

  // Local settings state
  const [alias, setAlias] = useState('');
  const [tone, setTone] = useState('Professionnel');
  const [theme, setTheme] = useState('Sombre');
  const [notifReplies, setNotifReplies] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  // Animation
  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (open) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        sidebarRef.current,
        { x: 16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, ease: 'power3.out' },
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.22, ease: 'power2.in' });
      gsap.to(sidebarRef.current, { x: 10, opacity: 0, duration: 0.22, ease: 'power2.in' });
    }
  }, [open]);

  const handleDeleteAll = () => {
    const ids = [...conversations.map((c) => c.id)];
    ids.forEach((id) => deleteConversation(id));
    setShowDeleteAll(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 opacity-0 pointer-events-none"
        style={{ background: 'rgba(11,11,11,0.65)', backdropFilter: 'blur(4px)' }}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 right-0 z-50 h-full w-80 flex flex-col opacity-0"
        style={{
          background: 'rgba(11,11,11,0.96)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rim">
          <span className="text-sm font-semibold text-snow/80">Mon compte</span>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-snow/30 hover:text-snow/70 hover:bg-snow/[0.06] transition-all"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin space-y-0">

          {/* Profile */}
          <SectionHeader label="Profil" icon={<UserIcon />} />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
              <span className="text-gold font-bold text-sm">A</span>
            </div>
            <div>
              <p className="text-sm font-medium text-snow/80">Utilisateur</p>
              <p className="text-xs text-gray/70">demo@chatline.ai</p>
            </div>
          </div>
          <div className="mb-2">
            <label className="text-[10px] text-snow/30 uppercase tracking-widest mb-1.5 block">Alias affiché</label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Votre prénom…"
              className="w-full px-3 py-2 rounded-xl border border-rim bg-snow/[0.03] text-snow/75 placeholder-snow/25 text-xs outline-none focus:border-gold/25 transition-colors"
            />
          </div>

          {/* Subscription */}
          <SectionHeader label="Abonnement" icon={<StarIcon />} />
          <div
            className="p-3.5 rounded-xl border mb-3"
            style={{
              borderColor: isPremium ? 'rgba(246,211,101,0.25)' : 'rgba(255,255,255,0.06)',
              background: isPremium ? 'rgba(246,211,101,0.04)' : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-snow/80">
                {isPremium ? 'ChatLine Plus' : 'Gratuit'}
              </span>
              {isPremium && <span className="text-[10px] text-gold/75 font-medium">8,99€/mois</span>}
            </div>
            <p className="text-[11px] text-gray/60">
              {isPremium
                ? 'Conversations illimitées · GPT Plus · Claude Opus'
                : '20 requêtes incluses · Modèle standard'}
            </p>
          </div>
          {!isPremium ? (
            <Link
              href="/premium"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gold text-ink font-semibold text-xs hover:brightness-105 active:scale-95 transition-all duration-150 mb-2"
            >
              <StarIcon accent />
              Passer à ChatLine Plus
            </Link>
          ) : (
            <button
              onClick={() => setPremium(false)}
              className="text-[11px] text-snow/25 hover:text-snow/50 transition-colors"
            >
              Gérer l&apos;abonnement
            </button>
          )}

          {/* Customization */}
          <SectionHeader label="Personnalisation" icon={<SliderIcon />} />

          <div className="mb-3">
            <label className="text-[10px] text-snow/30 uppercase tracking-widest mb-1.5 block">Ton de l&apos;IA</label>
            <div className="flex flex-wrap gap-1.5">
              {AI_TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150',
                    tone === t
                      ? 'bg-gold text-ink'
                      : 'bg-snow/[0.05] text-snow/50 hover:bg-snow/[0.08] border border-rim',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="text-[10px] text-snow/30 uppercase tracking-widest mb-1.5 block">Modèle par défaut</label>
            <div className="flex flex-wrap gap-1.5">
              {MODELS.map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModel(m)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150',
                    selectedModel === m
                      ? 'bg-gold text-ink'
                      : 'bg-snow/[0.05] text-snow/50 hover:bg-snow/[0.08] border border-rim',
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <label className="text-[10px] text-snow/30 uppercase tracking-widest mb-1.5 block">Thème</label>
            <div className="flex gap-1.5">
              {THEMES.map((th) => (
                <button
                  key={th}
                  onClick={() => setTheme(th)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150',
                    theme === th
                      ? 'bg-gold text-ink'
                      : 'bg-snow/[0.05] text-snow/50 hover:bg-snow/[0.08] border border-rim',
                  )}
                >
                  {th}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <SectionHeader label="Notifications" icon={<BellIcon />} />
          <ToggleRow label="Réponses IA" checked={notifReplies} onChange={() => setNotifReplies(!notifReplies)} />
          <ToggleRow label="Mises à jour produit" checked={notifUpdates} onChange={() => setNotifUpdates(!notifUpdates)} />

          {/* Data management */}
          <SectionHeader label="Gestion des données" icon={<DatabaseIcon />} />
          <div className="space-y-1.5 mb-2">
            <Link
              href="/archived"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-snow/[0.04] transition-colors text-xs text-snow/60 hover:text-snow/85"
            >
              <span>Conversations archivées</span>
              <ChevronRightIcon />
            </Link>
            <button
              onClick={() => setShowDeleteAll(true)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-snow/[0.04] transition-colors text-xs text-snow/60 hover:text-snow/85 text-left"
            >
              <span>Effacer toutes les conversations</span>
              <ChevronRightIcon />
            </button>
          </div>

          {showDeleteAll && (
            <div className="p-3 rounded-xl border border-rim/50 bg-snow/[0.03] mb-3">
              <p className="text-xs text-snow/60 mb-3">Supprimer toutes les conversations ? Cette action est irréversible.</p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAll}
                  className="flex-1 py-2 rounded-xl bg-red-500/80 text-snow text-xs font-medium hover:bg-red-500 transition-colors"
                >
                  Confirmer
                </button>
                <button
                  onClick={() => setShowDeleteAll(false)}
                  className="flex-1 py-2 rounded-xl border border-rim text-snow/50 text-xs hover:text-snow/80 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          <SectionHeader label="Sécurité" icon={<LockIcon />} />
          <div className="space-y-1.5 mb-2">
            <button className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-snow/[0.04] transition-colors text-xs text-snow/60 hover:text-snow/85 text-left">
              <span>Changer le mot de passe</span>
              <ChevronRightIcon />
            </button>
            <button className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-snow/[0.04] transition-colors text-xs text-snow/60 hover:text-snow/85 text-left">
              <span>Authentification à deux facteurs</span>
              <ChevronRightIcon />
            </button>
          </div>

          {/* Logout + delete */}
          <div className="pt-5 mt-2 border-t border-rim space-y-1.5 pb-6">
            <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-snow/[0.04] transition-colors text-xs text-snow/60 hover:text-snow/85 text-left">
              <LogOutIcon />
              <span>Se déconnecter</span>
            </button>
            <button
              onClick={() => setShowDeleteAccount(true)}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-red-500/[0.06] transition-colors text-xs text-red-400/60 hover:text-red-400/85 text-left"
            >
              <TrashIcon />
              <span>Supprimer mon compte</span>
            </button>
          </div>

          {showDeleteAccount && (
            <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] mb-6">
              <p className="text-xs text-snow/60 mb-3">Supprimer définitivement votre compte et toutes vos données ?</p>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-xl bg-red-500/80 text-snow text-xs font-medium hover:bg-red-500 transition-colors">
                  Supprimer
                </button>
                <button
                  onClick={() => setShowDeleteAccount(false)}
                  className="flex-1 py-2 rounded-xl border border-rim text-snow/50 text-xs hover:text-snow/80 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CloseIcon() {
  return <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>;
}
function UserIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 10.5c0-2.2 2.2-4 5-4s5 1.8 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}
function StarIcon({ accent }: { accent?: boolean }) {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.3 2.9L10.5 4.3l-2.3 2.2.5 3.2L6 8.1l-2.7 1.6.5-3.2L1.5 4.3l3.2-.4L6 1z" stroke={accent ? 'currentColor' : '#F6D365'} strokeWidth="1.1" strokeLinejoin="round"/></svg>;
}
function SliderIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 3h10M1 9h10M4 3v-1.5M4 4.5V3M8 9v-1.5M8 10.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>;
}
function BellIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1a4 4 0 014 4v3l1 1H1l1-1V5a4 4 0 014-4zM4.5 9.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function DatabaseIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><ellipse cx="6" cy="3" rx="4.5" ry="2" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 3v3c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V3" stroke="currentColor" strokeWidth="1.2"/><path d="M1.5 6v3c0 1.1 2 2 4.5 2s4.5-.9 4.5-2V6" stroke="currentColor" strokeWidth="1.2"/></svg>;
}
function LockIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="5.5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M4 5.5V4a2 2 0 014 0v1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="6" cy="8.5" r="1" fill="currentColor"/></svg>;
}
function LogOutIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 4l3 3-3 3M11 7H4M6 1H2a1 1 0 00-1 1v8a1 1 0 001 1h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function TrashIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M4.5 3V2h3v1M3 3l.5 7.5h5L9 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function ChevronRightIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
