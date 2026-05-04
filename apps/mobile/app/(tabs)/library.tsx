import { useDeferredValue, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { FadeInView } from '@/components/fade-in-view';
import { DataRow, ScreenContainer, ScreenHeader, SectionCard } from '@/components/ui';
import { useAssistantStore } from '@/stores/assistant-store';

export default function LibraryScreen() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const libraryItems = useAssistantStore((state) => state.libraryItems);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredItems = normalizedQuery
    ? libraryItems.filter((item) => {
        const haystack = `${item.title} ${item.summary} ${item.folder} ${item.kind}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : libraryItems;

  const folderStats = summarizeFolders(libraryItems);

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <FadeInView>
          <ScreenHeader
            eyebrow="ARCHIVE / SEARCH"
            title="A clean library for every generated artifact and conversation output."
            subtitle="Search stays semantic in purpose but visually restrained, with a single field and precise result blocks."
          />
        </FadeInView>

        <FadeInView delay={60}>
          <SectionCard title="SEARCH" subtitle="Filter by title, kind, folder or summary.">
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search generated content"
              placeholderTextColor="rgba(255,255,255,0.32)"
              className="rounded-3xl border border-white/10 bg-black px-4 py-4 font-mono text-[13px] text-white"
            />
          </SectionCard>
        </FadeInView>

        <FadeInView delay={120}>
          <SectionCard title="FOLDERS" subtitle="A small set of buckets keeps the archive readable under load.">
            <View className="gap-1">
              {folderStats.map((folder) => (
                <DataRow key={folder.name} label={folder.name.toUpperCase()} value={`${folder.count} items`} />
              ))}
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={180}>
          <SectionCard
            title="RESULTS"
            subtitle={`${filteredItems.length} visible item${filteredItems.length > 1 ? 's' : ''} in the current query.`}>
            <View className="gap-3">
              {filteredItems.map((item) => (
                <View key={item.id} className="rounded-3xl border border-white/10 bg-black p-4">
                  <Text className="font-mono text-[12px] tracking-[1.6px] text-white">{item.title}</Text>
                  <Text className="mt-2 font-mono text-[13px] leading-6 text-white/65">{item.summary}</Text>
                  <View className="mt-4 flex-row flex-wrap gap-2">
                    <Tag label={item.kind.toUpperCase()} />
                    <Tag label={item.folder.toUpperCase()} />
                    <Tag label={item.status.toUpperCase()} />
                    <Tag label={item.updatedAt} />
                  </View>
                </View>
              ))}
            </View>
          </SectionCard>
        </FadeInView>
      </ScrollView>
    </ScreenContainer>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <View className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
      <Text className="font-mono text-[10px] tracking-[1.4px] text-white/60">{label}</Text>
    </View>
  );
}

function summarizeFolders(items: ReturnType<typeof useAssistantStore.getState>['libraryItems']) {
  const counts = items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.folder] = (accumulator[item.folder] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}