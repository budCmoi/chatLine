import { useMemo } from 'react';
import { Text, View } from 'react-native';

import { FadeInView } from '../../components/fade-in-view';
import { useDrawerControls } from '../../components/app-shell';
import { EmptyState, PageHeader, PrimaryButton, ScreenContainer, SectionCard } from '../../components/ui';
import { formatConversationDate, useI18n } from '../../lib/localization';
import { useAppPalette } from '../../lib/theme-palette';
import { useAssistantStore } from '../../stores/assistant-store';

export default function ArchivedScreen() {
  const { openDrawer } = useDrawerControls();
  const { locale, t } = useI18n();
  const palette = useAppPalette();
  const conversations = useAssistantStore((state) => state.conversations);
  const restoreConversation = useAssistantStore((state) => state.restoreConversation);

  const archivedConversations = useMemo(
    () =>
      [...conversations]
        .filter((conversation) => conversation.archived)
        .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()),
    [conversations],
  );

  return (
    <ScreenContainer>
      <FadeInView>
        <PageHeader
          onMenuPress={openDrawer}
          eyebrow={t('archivedEyebrow')}
          title={t('archivedTitle')}
          subtitle={t('archivedSubtitle')}
        />
      </FadeInView>

      {archivedConversations.length > 0 ? (
        <FadeInView delay={70}>
          <SectionCard title={t('archivedSection').toUpperCase()} subtitle={t('archivedSubtitle')}>
            <View style={{ gap: 12 }}>
              {archivedConversations.map((conversation) => (
                <View
                  key={conversation.id}
                  style={{
                    borderRadius: 24,
                    borderWidth: 1,
                    borderColor: palette.border,
                    backgroundColor: palette.surfaceRaised,
                    padding: 14,
                  }}>
                  <Text style={{ color: palette.textPrimary, fontFamily: 'SpaceMono', fontSize: 13 }}>
                    {conversation.title}
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: palette.textSecondary,
                      fontFamily: 'SpaceMono',
                      fontSize: 12,
                      lineHeight: 20,
                    }}>
                    {conversation.preview}
                  </Text>
                  <Text
                    style={{
                      marginTop: 8,
                      color: palette.textMuted,
                      fontFamily: 'SpaceMono',
                      fontSize: 10,
                      letterSpacing: 1.2,
                    }}>
                    {formatConversationDate(locale, conversation.updatedAt)}
                  </Text>
                  <View style={{ marginTop: 12, alignItems: 'flex-start' }}>
                    <PrimaryButton label={t('restoreChat')} onPress={() => restoreConversation(conversation.id)} tone="ghost" />
                  </View>
                </View>
              ))}
            </View>
          </SectionCard>
        </FadeInView>
      ) : (
        <FadeInView delay={70}>
          <EmptyState title={t('archivedSection')} body={t('archivedEmpty')} />
        </FadeInView>
      )}
    </ScreenContainer>
  );
}
