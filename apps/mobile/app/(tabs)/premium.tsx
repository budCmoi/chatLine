import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { FadeInView } from '../../components/fade-in-view';
import { useDrawerControls } from '../../components/app-shell';
import { DataRow, PageHeader, PrimaryButton, ScreenContainer, SectionCard, StatusBadge } from '../../components/ui';
import { useI18n } from '../../lib/localization';
import { useAppPalette } from '../../lib/theme-palette';
import { useAssistantStore } from '../../stores/assistant-store';

export default function PremiumScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { t } = useI18n();
  const palette = useAppPalette();
  const subscriptionPlan = useAssistantStore((state) => state.subscriptionPlan);
  const upgradeToPremium = useAssistantStore((state) => state.upgradeToPremium);

  const isPremium = subscriptionPlan === 'premium';

  return (
    <ScreenContainer>
      <FadeInView>
        <PageHeader
          onMenuPress={openDrawer}
          eyebrow={t('premiumEyebrow')}
          title={t('premiumTitle')}
          subtitle={t('premiumSubtitle')}
          rightSlot={<StatusBadge label={isPremium ? t('premiumBadge') : t('freeBadge')} tone={isPremium ? 'secondary' : 'primary'} />}
        />
      </FadeInView>

      <FadeInView delay={70}>
        <View
          style={{
            marginBottom: 16,
            overflow: 'hidden',
            borderRadius: 32,
            borderWidth: 1,
            borderColor: palette.border,
            backgroundColor: palette.surfaceRaised,
            padding: 18,
          }}>
          <View
            style={{
              position: 'absolute',
              right: -24,
              top: -24,
              height: 120,
              width: 120,
              borderRadius: 999,
              backgroundColor: palette.secondarySoft,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: -28,
              bottom: -36,
              height: 120,
              width: 120,
              borderRadius: 999,
              backgroundColor: 'rgba(244,226,122,0.18)',
            }}
          />
          <Text
            style={{
              color: palette.primary,
              fontFamily: 'SpaceMono',
              fontSize: 12,
              letterSpacing: 2,
            }}>
            {t('premiumPrice').toUpperCase()}
          </Text>
          <Text
            style={{
              marginTop: 12,
              maxWidth: 280,
              color: palette.textPrimary,
              fontFamily: 'SpaceMono',
              fontSize: 28,
              lineHeight: 36,
            }}>
            Expert mode, more requests and a cleaner path to upgrade.
          </Text>
          <Text
            style={{
              marginTop: 10,
              maxWidth: 290,
              color: palette.textSecondary,
              fontFamily: 'SpaceMono',
              fontSize: 13,
              lineHeight: 22,
            }}>
            Chatline Plus keeps the core interface minimal while unlocking the monetized layer users expect from a production assistant.
          </Text>
          <View style={{ marginTop: 18, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <StatusBadge label={t('premiumFeatureExpert')} tone="primary" />
            <StatusBadge label={t('premiumFeatureQuota')} tone="secondary" />
            <StatusBadge label={t('premiumFeaturePriority')} tone="muted" />
          </View>
        </View>
      </FadeInView>

      <FadeInView delay={120}>
        <SectionCard title={t('premiumBenefits').toUpperCase()} subtitle={t('premiumSubtitle')}>
          <DataRow label={t('premiumFeatureExpert')} value={t('premiumPlan')} />
          <DataRow label={t('premiumFeatureQuota')} value={t('premiumQuota')} />
          <DataRow label={t('premiumFeaturePriority')} value="Fast routing" />
          <DataRow label={t('premiumFeatureThemes')} value="Profile customization" />
        </SectionCard>
      </FadeInView>

      <FadeInView delay={170}>
        <SectionCard title={t('premiumCompare').toUpperCase()} subtitle="A simple freemium split that stays easy to understand.">
          <ComparisonRow leftLabel={t('freePlan')} rightLabel={t('premiumPlan')} palettePrimary={palette.primary} />
          <ComparisonRow leftLabel={t('freeQuota')} rightLabel={t('premiumQuota')} palettePrimary={palette.primary} />
          <ComparisonRow leftLabel={t('modeStandard')} rightLabel={t('modeExpert')} palettePrimary={palette.primary} />
          <ComparisonRow leftLabel="Basic personalization" rightLabel="Advanced personalization" palettePrimary={palette.primary} />
        </SectionCard>
      </FadeInView>

      <FadeInView delay={220}>
        <View style={{ marginTop: 'auto', paddingBottom: 12 }}>
          <PrimaryButton
            label={isPremium ? t('statusPremium') : t('premiumCta')}
            onPress={() => {
              upgradeToPremium();
              router.replace('/(tabs)/chat');
            }}
            icon="bolt"
            disabled={isPremium}
          />
          <View style={{ height: 10 }} />
          <PrimaryButton label={t('startChat')} onPress={() => router.push('/(tabs)/chat')} tone="ghost" />
        </View>
      </FadeInView>
    </ScreenContainer>
  );
}

function ComparisonRow({
  leftLabel,
  rightLabel,
  palettePrimary,
}: {
  leftLabel: string;
  rightLabel: string;
  palettePrimary: string;
}) {
  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: 'row',
        gap: 10,
      }}>
      <View
        style={{
          flex: 1,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.10)',
          backgroundColor: '#141414',
          padding: 12,
        }}>
        <Text style={{ color: 'rgba(255,255,255,0.82)', fontFamily: 'SpaceMono', fontSize: 11, lineHeight: 18 }}>{leftLabel}</Text>
      </View>
      <View
        style={{
          flex: 1,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: palettePrimary,
          backgroundColor: 'rgba(244,226,122,0.14)',
          padding: 12,
        }}>
        <Text style={{ color: '#FFFFFF', fontFamily: 'SpaceMono', fontSize: 11, lineHeight: 18 }}>{rightLabel}</Text>
      </View>
    </View>
  );
}
