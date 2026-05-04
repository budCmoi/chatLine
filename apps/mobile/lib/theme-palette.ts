import { useAssistantStore } from '../stores/assistant-store';
import type { InterfaceColor } from '../types/assistant';

export interface AppPalette {
  background: string;
  surface: string;
  surfaceRaised: string;
  drawer: string;
  border: string;
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

const palettes: Record<InterfaceColor, AppPalette> = {
  gold: {
    background: '#050505',
    surface: '#101112',
    surfaceRaised: '#17181A',
    drawer: '#0C0D0F',
    border: 'rgba(255,255,255,0.10)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.72)',
    textMuted: 'rgba(255,255,255,0.46)',
    primary: '#F4E27A',
    primaryText: '#090909',
    secondary: '#8B5CF6',
    secondarySoft: 'rgba(139,92,246,0.18)',
    danger: '#FF8C8C',
    dangerSoft: 'rgba(255,140,140,0.16)',
    overlay: 'rgba(0,0,0,0.68)',
  },
  violet: {
    background: '#050505',
    surface: '#111119',
    surfaceRaised: '#171723',
    drawer: '#0D0C15',
    border: 'rgba(255,255,255,0.10)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.74)',
    textMuted: 'rgba(255,255,255,0.48)',
    primary: '#F4E27A',
    primaryText: '#090909',
    secondary: '#A78BFA',
    secondarySoft: 'rgba(167,139,250,0.20)',
    danger: '#FF8C8C',
    dangerSoft: 'rgba(255,140,140,0.16)',
    overlay: 'rgba(0,0,0,0.68)',
  },
  graphite: {
    background: '#050505',
    surface: '#121212',
    surfaceRaised: '#1A1A1A',
    drawer: '#0E0E0E',
    border: 'rgba(255,255,255,0.10)',
    textPrimary: '#FFFFFF',
    textSecondary: 'rgba(255,255,255,0.74)',
    textMuted: 'rgba(255,255,255,0.46)',
    primary: '#F4E27A',
    primaryText: '#090909',
    secondary: '#E5E7EB',
    secondarySoft: 'rgba(229,231,235,0.14)',
    danger: '#FF8C8C',
    dangerSoft: 'rgba(255,140,140,0.16)',
    overlay: 'rgba(0,0,0,0.68)',
  },
};

export function getAppPalette(interfaceColor: InterfaceColor): AppPalette {
  return palettes[interfaceColor];
}

export function useAppPalette(): AppPalette {
  const interfaceColor = useAssistantStore((state) => state.profile.interfaceColor);
  return getAppPalette(interfaceColor);
}
