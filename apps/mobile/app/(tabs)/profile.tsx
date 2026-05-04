import { ScrollView, View } from 'react-native';

import { FadeInView } from '@/components/fade-in-view';
import { DataRow, PillButton, ScreenContainer, ScreenHeader, SectionCard } from '@/components/ui';
import { useAssistantStore } from '@/stores/assistant-store';

export default function ProfileScreen() {
  const preferences = useAssistantStore((state) => state.preferences);
  const providers = useAssistantStore((state) => state.providers);
  const messages = useAssistantStore((state) => state.messages);
  const libraryItems = useAssistantStore((state) => state.libraryItems);
  const togglePreference = useAssistantStore((state) => state.togglePreference);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <FadeInView>
          <ScreenHeader
            eyebrow="PROFILE / CONTROL"
            title="System preferences, rollout visibility and platform posture."
            subtitle="The product stays stripped down visually while surfacing the signals that matter for a real startup-grade build."
          />
        </FadeInView>

        <FadeInView delay={60}>
          <SectionCard title="ACCOUNT" subtitle="Compact identity and operating overview.">
            <DataRow label="Name" value="ibr. drame" />
            <DataRow label="Providers" value={`${providers.length} connected modules`} />
            <DataRow label="Messages" value={`${messages.length} tracked events`} />
            <DataRow label="Assets" value={`${libraryItems.length} stored outputs`} />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={120}>
          <SectionCard title="PREFERENCES" subtitle="Each toggle keeps the same monochrome behavior language.">
            <View className="flex-row flex-wrap gap-2">
              <PillButton
                label={`MEMORY ${preferences.memory ? 'ON' : 'OFF'}`}
                active={preferences.memory}
                onPress={() => togglePreference('memory')}
              />
              <PillButton
                label={`STREAM ${preferences.streaming ? 'ON' : 'OFF'}`}
                active={preferences.streaming}
                onPress={() => togglePreference('streaming')}
              />
              <PillButton
                label={`SEARCH ${preferences.semanticSearch ? 'ON' : 'OFF'}`}
                active={preferences.semanticSearch}
                onPress={() => togglePreference('semanticSearch')}
              />
              <PillButton
                label={`VOICE ${preferences.voice ? 'ON' : 'OFF'}`}
                active={preferences.voice}
                onPress={() => togglePreference('voice')}
              />
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={180}>
          <SectionCard title="ROADMAP" subtitle="Release framing aligned with your product brief.">
            <DataRow label="MVP" value="Chat, auth, image generation, history" />
            <DataRow label="V2" value="Audio, video, vector memory, search" />
            <DataRow label="V3" value="Advanced assistant, personalization, multi-agent" />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={240}>
          <SectionCard title="RUNTIME" subtitle="Security and deployment posture surfaced as facts, not decoration.">
            <DataRow label="Transport" value="HTTPS / JWT / OAuth" />
            <DataRow label="Storage" value="PostgreSQL, Prisma, object storage" />
            <DataRow label="Realtime" value="REST + WebSocket orchestration" />
            <DataRow label="Deploy" value="Expo, AWS or Render, GitHub Actions" />
          </SectionCard>
        </FadeInView>
      </ScrollView>
    </ScreenContainer>
  );
}