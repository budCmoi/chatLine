import { ScrollView, Text, View } from 'react-native';

import { FadeInView } from '@/components/fade-in-view';
import { DataRow, PrimaryButton, ScreenContainer, ScreenHeader, SectionCard } from '@/components/ui';
import { useAssistantStore } from '@/stores/assistant-store';
import type { ContentKind } from '@/types/assistant';

const promptsByKind: Record<ContentKind, string> = {
  text: 'Create a premium product narrative and a crisp launch summary.',
  image: 'Generate a monochrome concept for an AI assistant hero screen.',
  video: 'Build a 15 second teaser from a minimal technical interface.',
  audio: 'Write and render a concise onboarding voiceover.',
};

export default function CreateScreen() {
  const modules = useAssistantStore((state) => state.generationModules);
  const libraryItems = useAssistantStore((state) => state.libraryItems);
  const createAsset = useAssistantStore((state) => state.createAsset);
  const recentLibraryItems = libraryItems.slice(0, 4);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <FadeInView>
          <ScreenHeader
            eyebrow="STUDIO / MULTI-FORMAT"
            title="Generate text, image, video and audio from one control surface."
            subtitle="Every module keeps the same visual discipline: monochrome, structured spacing and direct execution."
          />
        </FadeInView>

        <FadeInView delay={60}>
          <SectionCard
            title="MODULES"
            subtitle="Each card represents a routed pipeline with a preferred provider and a current operating state.">
            <View className="gap-3">
              {modules.map((module) => (
                <View key={module.id} className="rounded-3xl border border-white/10 bg-black p-4">
                  <View className="flex-row items-start justify-between gap-4">
                    <View className="flex-1">
                      <Text className="font-mono text-[12px] tracking-[1.6px] text-white">{module.label}</Text>
                      <Text className="mt-2 font-mono text-[13px] leading-6 text-white/65">
                        {module.description}
                      </Text>
                    </View>
                    <View className="rounded-full border border-white/10 px-3 py-2">
                      <Text className="font-mono text-[10px] tracking-[1.4px] text-white/45">
                        {module.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-4 flex-row items-center justify-between gap-4">
                    <Text className="font-mono text-[11px] tracking-[1.4px] text-white/45">
                      {module.kind.toUpperCase()} / {module.providerId.toUpperCase()}
                    </Text>
                    <PrimaryButton
                      label="QUEUE"
                      onPress={() =>
                        void createAsset(
                          module.kind,
                          module.providerId,
                          promptsByKind[module.kind],
                          'mono premium technical',
                        )
                      }
                    />
                  </View>
                </View>
              ))}
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={120}>
          <SectionCard
            title="QUEUE PREVIEW"
            subtitle="Recent outputs are immediately visible in the library without adding interface noise.">
            <View>
              {recentLibraryItems.map((item) => (
                <DataRow
                  key={item.id}
                  label={`${item.kind.toUpperCase()} / ${item.status.toUpperCase()}`}
                  value={item.title}
                />
              ))}
            </View>
          </SectionCard>
        </FadeInView>
      </ScrollView>
    </ScreenContainer>
  );
}