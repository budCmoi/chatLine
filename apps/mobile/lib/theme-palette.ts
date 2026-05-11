import { useAssistantStore } from '../stores/assistant-store';
import type { InterfaceColor } from '../types/assistant';

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

// Palette commune: noir profond + jaune premium + violet profond
const base: AppPalette = {
  background: '#000000',
  backgroundStart: '#000000',
  backgroundMiddle: '#0a0a0a',
  backgroundEnd: '#000000',
  surface: 'rgba(255,255,255,0.04)',
  surfaceRaised: 'rgba(255,255,255,0.07)',
  surfaceGlass: 'rgba(255,255,255,0.06)',
  drawer: 'rgba(0,0,0,0.96)',
  border: 'rgba(255,255,255,0.09)',
  borderGlow: 'rgba(245,208,66,0.35)',
  ambientPrimary: 'rgba(108,92,231,0.14)',
  ambientSecondary: 'rgba(245,208,66,0.08)',
  ambientTertiary: 'rgba(108,92,231,0.07)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.58)',
  textMuted: 'rgba(255,255,255,0.32)',
  primary: '#F5D042',
  primaryText: '#000000',
  secondary: '#6C5CE7',
  secondarySoft: 'rgba(108,92,231,0.16)',
  danger: '#FF5C5C',
  dangerSoft: 'rgba(255,92,92,0.14)',
  overlay: 'rgba(0,0,0,0.82)',
};

const palettes: Record<InterfaceColor, AppPalette> = {
  gold: { ...base },
  violet: {
    ...base,
    borderGlow: 'rgba(108,92,231,0.50)',
    ambientPrimary: 'rgba(108,92,231,0.18)',
    ambientSecondary: 'rgba(245,208,66,0.06)',
  },
  graphite: {
    ...base,
    surface: 'rgba(255,255,255,0.05)',
    surfaceRaised: 'rgba(255,255,255,0.09)',
    border: 'rgba(255,255,255,0.11)',
    borderGlow: 'rgba(255,255,255,0.28)',
  },
};

export function getAppPalette(interfaceColor: InterfaceColor): AppPalette {
  return palettes[interfaceColor];
}

export function useAppPalette(): AppPalette {
  const interfaceColor = useAssistantStore((state) => state.profile.interfaceColor);
  return getAppPalette(interfaceColor);
}
