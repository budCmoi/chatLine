import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider, type Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const navigationTheme: Theme = {
  dark: true,
  colors: {
    primary: '#FFFFFF',
    background: '#000000',
    card: '#000000',
    text: '#FFFFFF',
    border: 'rgba(255,255,255,0.12)',
    notification: '#FFFFFF',
  },
  fonts: {
    regular: {
      fontFamily: 'SpaceMono',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'SpaceMono',
      fontWeight: '400',
    },
    bold: {
      fontFamily: 'SpaceMono',
      fontWeight: '400',
    },
    heavy: {
      fontFamily: 'SpaceMono',
      fontWeight: '400',
    },
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
          animation: 'fade',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
