import { useAssistantStore } from '../stores/assistant-store';
import type { InterfaceColor } from '../types/assistant';

export interface AppPalette {
  background: string;
  backgroundStart: string;
  backgroundMiddle: string;
  backgroundEnd: string;
  surface: string;
  surfaceRaised: string;
  drawer: string;
  border: string;
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

const palettes: Record<InterfaceColor, AppPalette> = {
  gold: {
    background: '#f4ecff',
    backgroundStart: '#dbeafe',
    backgroundMiddle: '#e9d5ff',
    backgroundEnd: '#fbcfe8',
    surface: 'rgba(255,255,255,0.18)',
    surfaceRaised: 'rgba(255,255,255,0.34)',
    drawer: 'rgba(255,255,255,0.22)',
    border: 'rgba(255,255,255,0.34)',
    ambientPrimary: 'rgba(59,130,246,0.24)',
    ambientSecondary: 'rgba(168,85,247,0.22)',
    ambientTertiary: 'rgba(244,114,182,0.18)',
    textPrimary: '#4c1d95',
    textSecondary: 'rgba(76,29,149,0.78)',
    textMuted: 'rgba(76,29,149,0.50)',
    primary: '#7c3aed',
    primaryText: '#ffffff',
    secondary: '#2563eb',
    secondarySoft: 'rgba(96,165,250,0.22)',
    danger: '#be185d',
    dangerSoft: 'rgba(244,114,182,0.18)',
    overlay: 'rgba(76,29,149,0.16)',
  },
  violet: {
    background: '#f6eeff',
    backgroundStart: '#dbeafe',
    backgroundMiddle: '#e9d5ff',
    backgroundEnd: '#fbcfe8',
    surface: 'rgba(255,255,255,0.16)',
    surfaceRaised: 'rgba(255,255,255,0.30)',
    drawer: 'rgba(255,255,255,0.20)',
    border: 'rgba(255,255,255,0.32)',
    ambientPrimary: 'rgba(59,130,246,0.26)',
    ambientSecondary: 'rgba(139,92,246,0.24)',
    ambientTertiary: 'rgba(236,72,153,0.18)',
    textPrimary: '#4c1d95',
    textSecondary: 'rgba(76,29,149,0.78)',
    textMuted: 'rgba(76,29,149,0.50)',
    primary: '#7c3aed',
    primaryText: '#ffffff',
    secondary: '#2563eb',
    secondarySoft: 'rgba(167,139,250,0.18)',
    danger: '#be185d',
    dangerSoft: 'rgba(244,114,182,0.18)',
    overlay: 'rgba(76,29,149,0.16)',
  },
  graphite: {
    background: '#f3f1ff',
    backgroundStart: '#dbeafe',
    backgroundMiddle: '#ede9fe',
    backgroundEnd: '#fbcfe8',
    surface: 'rgba(255,255,255,0.17)',
    surfaceRaised: 'rgba(255,255,255,0.28)',
    drawer: 'rgba(255,255,255,0.19)',
    border: 'rgba(255,255,255,0.30)',
    ambientPrimary: 'rgba(99,102,241,0.18)',
    ambientSecondary: 'rgba(147,51,234,0.20)',
    ambientTertiary: 'rgba(244,114,182,0.14)',
    textPrimary: '#4c1d95',
    textSecondary: 'rgba(76,29,149,0.76)',
    textMuted: 'rgba(76,29,149,0.48)',
    primary: '#6d28d9',
    primaryText: '#ffffff',
    secondary: '#4f46e5',
    secondarySoft: 'rgba(99,102,241,0.16)',
    danger: '#be185d',
    dangerSoft: 'rgba(244,114,182,0.16)',
    overlay: 'rgba(76,29,149,0.16)',
  },
};

export function getAppPalette(interfaceColor: InterfaceColor): AppPalette {
  return palettes[interfaceColor];
}

export function useAppPalette(): AppPalette {
  const interfaceColor = useAssistantStore((state) => state.profile.interfaceColor);
  return getAppPalette(interfaceColor);
}
