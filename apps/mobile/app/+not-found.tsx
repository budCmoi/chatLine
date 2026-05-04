import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { useI18n } from '../lib/localization';
import { useAppPalette } from '../lib/theme-palette';

export default function NotFoundScreen() {
  const { t } = useI18n();
  const palette = useAppPalette();

  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerStyle: { backgroundColor: palette.background }, headerTintColor: palette.textPrimary }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.background, paddingHorizontal: 24 }}>
        <Text style={{ color: palette.primary, fontFamily: 'SpaceMono', fontSize: 12, letterSpacing: 2 }}>{t('notFoundCode')}</Text>
        <Text style={{ marginTop: 16, textAlign: 'center', color: palette.textPrimary, fontFamily: 'SpaceMono', fontSize: 24, lineHeight: 34 }}>
          {t('notFoundTitle')}
        </Text>
        <Text style={{ marginTop: 12, maxWidth: 280, textAlign: 'center', color: palette.textSecondary, fontFamily: 'SpaceMono', fontSize: 13, lineHeight: 22 }}>
          {t('notFoundBody')}
        </Text>

        <Link
          href="/"
          style={{
            marginTop: 24,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: palette.primary,
            backgroundColor: palette.primary,
            paddingHorizontal: 18,
            paddingVertical: 12,
          }}>
          <Text style={{ color: palette.primaryText, fontFamily: 'SpaceMono', fontSize: 11, letterSpacing: 1.4 }}>{t('goHome').toUpperCase()}</Text>
        </Link>
      </View>
    </>
  );
}

