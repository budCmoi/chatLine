import { useAssistantStore } from '../stores/assistant-store';
import type { InterfaceColor } from '../types/assistant';

// ─── Design tokens — mirrors apps/web tailwind.config.js ─────────────────
export const COLORS = {
  ink: '#0B0B0B',
  inkCard: '#111111',
  inkSurface: '#161616',
  gold: '#F6D365',
  goldHover: '#F8DC79',
  goldGlow: 'rgba(246,211,101,0.15)',
  snow: '#F5F5F5',
  gray: '#A1A1A1',
  snowMuted: 'rgba(245,245,245,0.55)',
  snowSubtle: 'rgba(245,245,245,0.25)',
  snowDim: 'rgba(245,245,245,0.06)',
  rim: 'rgba(255,255,255,0.06)',
  glass: 'rgba(255,255,255,0.04)',
} as const;

export interface AppPalette {
  background: string;
  backgroundStart: string;
  backgroundMiddle: string;
  backgroundEnd: string;
  surface: string;
  surfaceRaised: string;
  surfaceGlass: string;
  drawer: string;
  border: string;
  borderGlow: string;
  ambientPrimary: string;
  ambientSecondary: string;
  ambientTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  secondary: string;
  secondarySoft: string;
  danger: string;
  dangerSoft: string;
  overlay: string;
}

// Palette unique alignée sur le design system web
const base: AppPalette = {
  background: COLORS.ink,
  backgroundStart: COLORS.ink,
  backgroundMiddle: '#0E0E0E',
  backgroundEnd: COLORS.ink,
  surface: COLORS.glass,
  surfaceRaised: COLORS.snowDim,
  surfaceGlass: 'rgba(255,255,255,0.05)',
  drawer: 'rgba(11,11,11,0.96)',
  border: COLORS.rim,
  borderGlow: 'rgba(246,211,101,0.30)',
  ambientPrimary: 'rgba(246,211,101,0.05)',
  ambientSecondary: 'rgba(246,211,101,0.04)',
  ambientTertiary: 'rgba(246,211,101,0.03)',
  textPrimary: COLORS.snow,
  textSecondary: COLORS.gray,
  textMuted: COLORS.snowSubtle,
  primary: COLORS.gold,
  primaryText: COLORS.ink,
  secondary: COLORS.gold,
  secondarySoft: COLORS.goldGlow,
  danger: '#FF5C5C',
  dangerSoft: 'rgba(255,92,92,0.14)',
  overlay: 'rgba(11,11,11,0.88)',
};

// Toutes les variantes partagent la même identité visuelle
const palettes: Record<InterfaceColor, AppPalette> = {
  gold: { ...base },
  violet: { ...base },
  graphite: { ...base },
};

export function getAppPalette(interfaceColor: InterfaceColor): AppPalette {
  return palettes[interfaceColor];
}

export function useAppPalette(): AppPalette {
  const interfaceColor = useAssistantStore((state) => state.profile.interfaceColor);
  return getAppPalette(interfaceColor);
}
