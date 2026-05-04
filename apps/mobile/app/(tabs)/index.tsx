import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { FadeInView } from '../../components/fade-in-view';
import { useDrawerControls } from '../../components/app-shell';
import { PageHeader, PrimaryButton, ScreenContainer, StatusBadge } from '../../components/ui';
import { useI18n } from '../../lib/localization';
import { useAppPalette } from '../../lib/theme-palette';
import { useAssistantStore } from '../../stores/assistant-store';

export default function HomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { t } = useI18n();
  const palette = useAppPalette();
  const subscriptionPlan = useAssistantStore((state) => state.subscriptionPlan);
  const startFreshChat = useAssistantStore((state) => state.startFreshChat);

  return (
    <ScreenContainer>
      <FadeInView>
        <PageHeader
          onMenuPress={openDrawer}
          eyebrow={t('homeEyebrow')}
          title={t('homeTitle')}
          subtitle={t('homeSubtitle')}
          rightSlot={<StatusBadge label={subscriptionPlan === 'premium' ? t('premiumBadge') : t('freeBadge')} tone={subscriptionPlan === 'premium' ? 'secondary' : 'primary'} />}
        />
      </FadeInView>

      <FadeInView delay={80}>
        <View
          style={{
            marginTop: 16,
            flex: 1,
            justifyContent: 'center',
          }}>
          <View
            style={{
              overflow: 'hidden',
              borderRadius: 34,
              borderWidth: 1,
              borderColor: palette.border,
              backgroundColor: palette.surfaceRaised,
              padding: 22,
            }}>
            <View
              style={{
                position: 'absolute',
                right: -18,
                top: -18,
                height: 110,
                width: 110,
                borderRadius: 999,
                backgroundColor: palette.secondarySoft,
              }}
            />
            <Text
              style={{
                color: palette.primary,
                fontFamily: 'SpaceMono',
                fontSize: 12,
                letterSpacing: 2,
              }}>
              {t('appName').toUpperCase()}
            </Text>
            <Text
              style={{
                marginTop: 14,
                color: palette.textPrimary,
                fontFamily: 'SpaceMono',
                fontSize: 34,
                lineHeight: 42,
              }}>
              {t('brandTagline')}
            </Text>
            <Text
              style={{
                marginTop: 12,
                maxWidth: 320,
                color: palette.textSecondary,
                fontFamily: 'SpaceMono',
                fontSize: 13,
                lineHeight: 22,
              }}>
              {t('homeSecondary')}
            </Text>

            <View style={{ marginTop: 20, flexDirection: 'row', gap: 12 }}>
              <PrimaryButton
                label={t('homeCta')}
                onPress={() => {
                  startFreshChat();
                  router.push('/(tabs)/chat');
                }}
                icon="comments-o"
              />
              <PrimaryButton label={t('premiumCta')} onPress={() => router.push('/(tabs)/premium')} tone="ghost" />
            </View>
          </View>
        </View>
      </FadeInView>
    </ScreenContainer>
  );
}
