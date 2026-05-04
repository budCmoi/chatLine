import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

import { FadeInView } from '../../components/fade-in-view';
import { useDrawerControls } from '../../components/app-shell';
import {
  DataRow,
  InputField,
  PageHeader,
  PillButton,
  PrimaryButton,
  ScreenContainer,
  SectionCard,
  SettingToggleRow,
  StatusBadge,
} from '../../components/ui';
import { useI18n } from '../../lib/localization';
import { useAssistantStore } from '../../stores/assistant-store';

export default function ProfileScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { t } = useI18n();
  const subscriptionPlan = useAssistantStore((state) => state.subscriptionPlan);
  const profile = useAssistantStore((state) => state.profile);
  const notifications = useAssistantStore((state) => state.notifications);
  const sessions = useAssistantStore((state) => state.sessions);
  const activeConversationId = useAssistantStore((state) => state.activeConversationId);
  const updateAlias = useAssistantStore((state) => state.updateAlias);
  const setTone = useAssistantStore((state) => state.setTone);
  const setInterfaceColor = useAssistantStore((state) => state.setInterfaceColor);
  const toggleNotification = useAssistantStore((state) => state.toggleNotification);
  const archiveConversation = useAssistantStore((state) => state.archiveConversation);
  const deleteConversation = useAssistantStore((state) => state.deleteConversation);
  const deleteAllData = useAssistantStore((state) => state.deleteAllData);
  const closeOtherSessions = useAssistantStore((state) => state.closeOtherSessions);
  const startFreshChat = useAssistantStore((state) => state.startFreshChat);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <FadeInView>
          <PageHeader
            onMenuPress={openDrawer}
            eyebrow={t('profileEyebrow')}
            title={t('profileTitle')}
            subtitle={t('profileSubtitle')}
            rightSlot={<StatusBadge label={subscriptionPlan === 'premium' ? t('premiumBadge') : t('freeBadge')} tone={subscriptionPlan === 'premium' ? 'secondary' : 'primary'} />}
          />
        </FadeInView>

        <FadeInView delay={50}>
          <SectionCard title={t('accountSection').toUpperCase()} subtitle={t('profileDescription')}>
            <DataRow label={t('emailLabel')} value={profile.email} />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={90}>
          <SectionCard title={t('subscriptionSection').toUpperCase()} subtitle={subscriptionPlan === 'premium' ? t('premiumQuota') : t('freeQuota')}>
            <DataRow label={t('subscriptionStatus')} value={subscriptionPlan === 'premium' ? t('statusPremium') : t('statusFree')} />
            <View style={{ marginTop: 14, alignItems: 'flex-start' }}>
              <PrimaryButton label={t('upgradeCta')} onPress={() => router.push('/(tabs)/premium')} tone={subscriptionPlan === 'premium' ? 'ghost' : 'solid'} />
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={130}>
          <SectionCard title={t('personalizationSection').toUpperCase()} subtitle={t('premiumFeatureThemes')}>
            <InputField label={t('aliasLabel')} value={profile.alias} onChangeText={updateAlias} />
            <View style={{ marginTop: 14 }}>
              <DataRow
                label={t('toneLabel')}
                value={profile.tone === 'direct' ? t('toneDirect') : profile.tone === 'strategic' ? t('toneStrategic') : t('toneBalanced')}
              />
              <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                <PillButton label={t('toneBalanced')} active={profile.tone === 'balanced'} onPress={() => setTone('balanced')} />
                <PillButton label={t('toneDirect')} active={profile.tone === 'direct'} onPress={() => setTone('direct')} />
                <PillButton label={t('toneStrategic')} active={profile.tone === 'strategic'} onPress={() => setTone('strategic')} />
              </View>
            </View>
            <View style={{ marginTop: 14 }}>
              <DataRow
                label={t('interfaceColorLabel')}
                value={profile.interfaceColor === 'violet' ? t('interfaceViolet') : profile.interfaceColor === 'graphite' ? t('interfaceGraphite') : t('interfaceGold')}
              />
              <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                <PillButton label={t('interfaceGold')} active={profile.interfaceColor === 'gold'} onPress={() => setInterfaceColor('gold')} />
                <PillButton label={t('interfaceViolet')} active={profile.interfaceColor === 'violet'} onPress={() => setInterfaceColor('violet')} />
                <PillButton label={t('interfaceGraphite')} active={profile.interfaceColor === 'graphite'} onPress={() => setInterfaceColor('graphite')} />
              </View>
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={170}>
          <SectionCard title={t('notificationsSection').toUpperCase()} subtitle="On / off controls stay explicit and compact.">
            <SettingToggleRow label={t('notificationProduct')} value={notifications.product} onPress={() => toggleNotification('product')} />
            <SettingToggleRow label={t('notificationBilling')} value={notifications.billing} onPress={() => toggleNotification('billing')} />
            <SettingToggleRow label={t('notificationSecurity')} value={notifications.security} onPress={() => toggleNotification('security')} />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={210}>
          <SectionCard title={t('dataSection').toUpperCase()} subtitle="Clear data controls for a ChatGPT-like account area.">
            <DataRow label={t('currentChatLabel')} value={activeConversationId ?? t('noCurrentChat')} />
            <View style={{ marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              <PrimaryButton
                label={t('archiveCurrentChat')}
                onPress={() => (activeConversationId ? archiveConversation(activeConversationId) : undefined)}
                tone="ghost"
                disabled={!activeConversationId}
              />
              <PrimaryButton
                label={t('deleteChat')}
                onPress={() => (activeConversationId ? deleteConversation(activeConversationId) : undefined)}
                tone="ghost"
                disabled={!activeConversationId}
              />
              <PrimaryButton label={t('deleteAllData')} onPress={deleteAllData} tone="ghost" />
              <PrimaryButton label={t('exportData')} tone="ghost" disabled />
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={250}>
          <SectionCard title={t('archivedSection').toUpperCase()} subtitle={t('archivedSubtitle')}>
            <PrimaryButton label={t('viewArchived')} onPress={() => router.push('/(tabs)/archived')} tone="ghost" />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={290}>
          <SectionCard title={t('securitySection').toUpperCase()} subtitle={t('activeSessions')}>
            {sessions.map((session) => (
              <DataRow key={session.id} label={session.label} value={session.location} />
            ))}
            <View style={{ marginTop: 14, alignItems: 'flex-start' }}>
              <PrimaryButton label={t('manageSessions')} onPress={closeOtherSessions} tone="ghost" />
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={330}>
          <SectionCard title={t('actionsSection').toUpperCase()} subtitle="Demo actions for the current MVP account state.">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              <PrimaryButton
                label={t('signOut')}
                onPress={() => {
                  startFreshChat();
                  router.replace('/(tabs)');
                }}
                tone="ghost"
              />
              <PrimaryButton
                label={t('deleteAccount')}
                onPress={() => {
                  deleteAllData();
                  router.replace('/(tabs)');
                }}
                tone="ghost"
              />
            </View>
          </SectionCard>
        </FadeInView>
      </ScrollView>
    </ScreenContainer>
  );
}
