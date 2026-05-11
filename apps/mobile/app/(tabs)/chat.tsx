import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { FadeInView } from '../../components/fade-in-view';
import { useDrawerControls } from '../../components/app-shell';
import {
  EmptyState,
  PageHeader,
  PillButton,
  PrimaryButton,
  ScreenContainer,
  SectionCard,
  StatusBadge,
} from '../../components/ui';
import { formatMessageTime, useI18n } from '../../lib/localization';
import { useAppPalette } from '../../lib/theme-palette';
import { useAssistantStore } from '../../stores/assistant-store';
import type { ChatMessage, Provider } from '../../types/assistant';

export default function ChatScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { locale, t } = useI18n();
  const palette = useAppPalette();
  const conversations = useAssistantStore((state) => state.conversations);
  const messagesByConversation = useAssistantStore((state) => state.messagesByConversation);
  const activeConversationId = useAssistantStore((state) => state.activeConversationId);
  const providers = useAssistantStore((state) => state.providers);
  const selectedProviderId = useAssistantStore((state) => state.selectedProviderId);
  const mode = useAssistantStore((state) => state.mode);
  const draft = useAssistantStore((state) => state.draft);
  const isSending = useAssistantStore((state) => state.isSending);
  const subscriptionPlan = useAssistantStore((state) => state.subscriptionPlan);
  const freeRequestsUsed = useAssistantStore((state) => state.freeRequestsUsed);
  const upgradePromptDismissed = useAssistantStore((state) => state.upgradePromptDismissed);
  const updateDraft = useAssistantStore((state) => state.updateDraft);
  const sendMessage = useAssistantStore((state) => state.sendMessage);
  const setActiveProvider = useAssistantStore((state) => state.setActiveProvider);
  const setMode = useAssistantStore((state) => state.setMode);
  const dismissUpgradePrompt = useAssistantStore((state) => state.dismissUpgradePrompt);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? null;
  const messages = activeConversationId ? messagesByConversation[activeConversationId] ?? [] : [];
  const selectedProvider = providers.find((provider) => provider.id === selectedProviderId) ?? providers[0];
  const showUpgradePrompt = subscriptionPlan === 'free' && freeRequestsUsed >= 5 && !upgradePromptDismissed;

  const requestCounterLabel = subscriptionPlan === 'premium' ? t('premiumBadge') : freeRequestsUsed >= 5 ? '5+/5' : `${freeRequestsUsed}/5`;

  return (
    <ScreenContainer
      footer={
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {showUpgradePrompt ? (
            <View
              style={{
                marginBottom: 12,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: palette.primary,
                backgroundColor: 'rgba(245,208,66,0.06)',
                padding: 14,
              }}>
              <Text
                style={{
                  color: palette.textPrimary,
                  fontFamily: 'SpaceMono',
                  fontSize: 13,
                  lineHeight: 20,
                }}>
                {t('overlayTitle')}
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  color: palette.textSecondary,
                  fontFamily: 'SpaceMono',
                  fontSize: 12,
                  lineHeight: 20,
                }}>
                {t('overlayBody')}
              </Text>
              <View style={{ marginTop: 12, flexDirection: 'row', gap: 10 }}>
                <PrimaryButton label={t('overlayUpgrade')} onPress={() => router.push('/(tabs)/premium')} />
                <PrimaryButton label={t('overlayContinue')} onPress={dismissUpgradePrompt} tone="ghost" />
              </View>
            </View>
          ) : null}

          <View
            style={{
              borderRadius: 24,
              borderWidth: 1,
              borderColor: palette.border,
              backgroundColor: 'rgba(0,0,0,0.60)',
              padding: 14,
            }}>
            <TextInput
              value={draft}
              onChangeText={updateDraft}
              placeholder={t('chatInputPlaceholder')}
              placeholderTextColor={palette.textMuted}
              multiline
              style={{
                minHeight: 88,
                color: palette.textPrimary,
                fontFamily: 'SpaceMono',
                fontSize: 13,
                lineHeight: 22,
              }}
            />
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                borderTopWidth: 1,
                borderTopColor: palette.border,
                paddingTop: 12,
              }}>
              <View>
                <Text
                  style={{
                    color: palette.textMuted,
                    fontFamily: 'SpaceMono',
                    fontSize: 10,
                    letterSpacing: 1.2,
                  }}>
                  {t('overlayCounter').toUpperCase()}
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    color: palette.textSecondary,
                    fontFamily: 'SpaceMono',
                    fontSize: 12,
                  }}>
                  {requestCounterLabel}
                </Text>
              </View>
              <PrimaryButton
                label={isSending ? 'RUNNING' : 'SEND'}
                onPress={() => void sendMessage()}
                icon="arrow-up"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      }>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <FadeInView>
          <PageHeader
            onMenuPress={openDrawer}
            eyebrow={selectedProvider?.name.toUpperCase() ?? t('freeProvidersTitle').toUpperCase()}
            title={activeConversation?.title ?? t('startChat')}
            subtitle={activeConversation?.preview ?? t('chatEmptyBody')}
            rightSlot={
              <Pressable
                onPress={() => setOptionsOpen((current) => !current)}
                style={{
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: palette.border,
                  backgroundColor: palette.surfaceRaised,
                  paddingHorizontal: 14,
                  paddingVertical: 11,
                }}>
                <Text
                  style={{
                    color: palette.textPrimary,
                    fontFamily: 'SpaceMono',
                    fontSize: 11,
                    letterSpacing: 1.2,
                  }}>
                  {t('chatOptions').toUpperCase()}
                </Text>
              </Pressable>
            }
          />
        </FadeInView>

        <FadeInView delay={50}>
          <View style={{ marginBottom: 16, flexDirection: 'row', gap: 10 }}>
            <StatusBadge label={subscriptionPlan === 'premium' ? t('premiumBadge') : t('freeBadge')} tone={subscriptionPlan === 'premium' ? 'secondary' : 'primary'} />
            <StatusBadge label={mode === 'expert' ? t('modeExpert') : t('modeStandard')} tone="muted" />
          </View>
        </FadeInView>

        {optionsOpen ? (
          <FadeInView delay={80}>
            <SectionCard title={t('chatOptions').toUpperCase()} subtitle={t('chatOptionsSubtitle')}>
              <Text
                style={{
                  marginBottom: 10,
                  color: palette.textMuted,
                  fontFamily: 'SpaceMono',
                  fontSize: 11,
                  letterSpacing: 1.2,
                }}>
                {t('freeProvidersTitle').toUpperCase()}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {providers.map((provider) => (
                  <PillButton
                    key={provider.id}
                    label={`${provider.name} / ${provider.vendor}`}
                    active={provider.id === selectedProviderId}
                    onPress={() => setActiveProvider(provider.id)}
                  />
                ))}
              </View>

              <View style={{ marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                <PillButton label={t('modeStandard')} active={mode === 'fast'} onPress={() => setMode('fast')} />
                <PillButton
                  label={`${t('modeExpert')} / ${t('expertLocked')}`}
                  active={mode === 'expert' && subscriptionPlan === 'premium'}
                  onPress={() => (subscriptionPlan === 'premium' ? setMode('expert') : router.push('/(tabs)/premium'))}
                  disabled={subscriptionPlan === 'free'}
                />
              </View>
            </SectionCard>
          </FadeInView>
        ) : null}

        {messages.length > 0 ? (
          <FadeInView delay={120}>
            <View style={{ gap: 12 }}>
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} providers={providers} locale={locale} />
              ))}

              {isSending ? (
                <View
                  style={{
                    maxWidth: '88%',
                    borderRadius: 26,
                    borderWidth: 1,
                    borderColor: palette.border,
                    backgroundColor: palette.surface,
                    padding: 14,
                  }}>
                  <Text
                    style={{
                      color: palette.textMuted,
                      fontFamily: 'SpaceMono',
                      fontSize: 10,
                      letterSpacing: 1.2,
                    }}>
                    STREAM
                  </Text>
                  <Text
                    style={{
                      marginTop: 6,
                      color: palette.textSecondary,
                      fontFamily: 'SpaceMono',
                      fontSize: 12,
                      lineHeight: 20,
                    }}>
                    {selectedProvider?.name} is preparing a reply...
                  </Text>
                </View>
              ) : null}
            </View>
          </FadeInView>
        ) : (
          <FadeInView delay={120}>
            <EmptyState
              title={t('chatEmptyTitle')}
              body={t('chatEmptyBody')}
              action={<PrimaryButton label={t('startChat')} onPress={() => updateDraft('Plan a professional mobile AI assistant.')} tone="ghost" />}
            />
          </FadeInView>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

function MessageBubble({
  message,
  providers,
  locale,
}: {
  message: ChatMessage;
  providers: Provider[];
  locale: 'en' | 'fr';
}) {
  const palette = useAppPalette();
  const isUser = message.role === 'user';
  const provider = providers.find((item) => item.id === message.providerId);

  return (
    <View
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: isUser ? '88%' : '92%',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: isUser ? 'rgba(245,208,66,0.28)' : palette.border,
        backgroundColor: isUser ? 'rgba(245,208,66,0.09)' : palette.surface,
        padding: 14,
      }}>
      <Text
        style={{
          color: isUser ? palette.primary : palette.textMuted,
          fontFamily: 'SpaceMono',
          fontSize: 10,
          letterSpacing: 1.2,
        }}>
        {isUser ? 'YOU' : (provider?.name ?? 'AI CORE').toUpperCase()}
      </Text>
      <Text
        style={{
          marginTop: 8,
          color: isUser ? palette.textPrimary : palette.textPrimary,
          fontFamily: 'SpaceMono',
          fontSize: 13,
          lineHeight: 22,
        }}>
        {message.content}
      </Text>
      <Text
        style={{
          marginTop: 10,
          color: isUser ? 'rgba(245,208,66,0.50)' : palette.textMuted,
          fontFamily: 'SpaceMono',
          fontSize: 10,
          letterSpacing: 1.2,
        }}>
        {formatMessageTime(locale, message.createdAt)}
      </Text>
    </View>
  );
}
