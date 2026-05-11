import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import { ThemeProvider, type Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { LocalizationProvider } from '../lib/localization';
import { getAppPalette } from '../lib/theme-palette';
import { useAssistantStore } from '../stores/assistant-store';

import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // SpaceMono kept for backward-compat
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Canela substitute — editorial display serif
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_500Medium,
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
    // Mier substitute — clean humanist sans for all UI
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const interfaceColor = useAssistantStore((state) => state.profile.interfaceColor);
  const palette = getAppPalette(interfaceColor);

  const navigationTheme = useMemo<Theme>(
    () => ({
      dark: true,
      colors: {
        primary: palette.primary,
        background: palette.background,
        card: '#0D0D0D',
        text: palette.textPrimary,
        border: palette.border,
        notification: palette.primary,
      },
      fonts: {
        regular: { fontFamily: 'System', fontWeight: '400' as const },
        medium:  { fontFamily: 'System', fontWeight: '500' as const },
        bold:    { fontFamily: 'System', fontWeight: '700' as const },
        heavy:   { fontFamily: 'System', fontWeight: '900' as const },
      },
    }),
    [palette],
  );

  return (
    <LocalizationProvider>
      <ThemeProvider value={navigationTheme}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: palette.background },
            animation: 'fade',
          }}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
