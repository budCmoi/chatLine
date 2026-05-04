import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { FadeInView } from '@/components/fade-in-view';
import { PillButton, PrimaryButton, ScreenContainer, ScreenHeader, SectionCard } from '@/components/ui';
import { useAssistantStore } from '@/stores/assistant-store';
import type { ChatMessage } from '@/types/assistant';

export default function TabOneScreen() {
  const providers = useAssistantStore((state) => state.providers);
  const activeProviderId = useAssistantStore((state) => state.activeProviderId);
  const mode = useAssistantStore((state) => state.mode);
  const messages = useAssistantStore((state) => state.messages);
  const draft = useAssistantStore((state) => state.draft);
  const isSending = useAssistantStore((state) => state.isSending);
  const setActiveProvider = useAssistantStore((state) => state.setActiveProvider);
  const setMode = useAssistantStore((state) => state.setMode);
  const updateDraft = useAssistantStore((state) => state.updateDraft);
  const sendMessage = useAssistantStore((state) => state.sendMessage);
  const textProviders = providers.filter((provider) => provider.capability === 'text');

  const quickActions = ['Launch plan', 'UX audit', 'Growth brief', 'Technical scope'];

  return (
    <ScreenContainer
      footer={
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View className="rounded-3xl border border-white/10 bg-white/[0.04] p-3">
            <TextInput
              value={draft}
              onChangeText={updateDraft}
              placeholder="Describe the task, prompt or workflow."
              placeholderTextColor="rgba(255,255,255,0.32)"
              multiline
              className="min-h-[84px] font-mono text-[13px] leading-6 text-white"
            />
            <View className="mt-3 flex-row items-center justify-between gap-3 border-t border-white/10 pt-3">
              <Text className="flex-1 font-mono text-[11px] tracking-[1.4px] text-white/45">
                STREAMING / MEMORY / REAL-TIME ROUTING
              </Text>
              <PrimaryButton label={isSending ? 'RUNNING' : 'SEND'} onPress={() => void sendMessage()} />
            </View>
          </View>
        </KeyboardAvoidingView>
      }>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <FadeInView>
          <ScreenHeader
            eyebrow="CHATLINE / ORCHESTRATOR"
            title="AI assistant built for clear, high-contrast execution."
            subtitle="Minimal interface, multi-provider routing and context-aware output for text, image, video and audio workflows."
            rightSlot={
              <View className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3">
                <Text className="font-mono text-[11px] tracking-[1.6px] text-white">LIVE</Text>
              </View>
            }
          />
        </FadeInView>

        <FadeInView delay={60}>
          <SectionCard
            title="ROUTING"
            subtitle="Select the chat engine and the interaction mode before dispatching a request.">
            <View className="flex-row flex-wrap gap-2">
              {textProviders.map((provider) => (
                <PillButton
                  key={provider.id}
                  label={`${provider.name} / ${provider.vendor}`}
                  active={provider.id === activeProviderId}
                  onPress={() => setActiveProvider(provider.id)}
                />
              ))}
            </View>

            <View className="mt-4 flex-row gap-2">
              <PillButton label="FAST MODE" active={mode === 'fast'} onPress={() => setMode('fast')} />
              <PillButton label="EXPERT MODE" active={mode === 'expert'} onPress={() => setMode('expert')} />
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={120}>
          <SectionCard
            title="SESSION"
            subtitle="Realtime conversation stream with visible provider routing and compact chronology.">
            <View>
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  providerName={resolveProviderName(message, textProviders)}
                />
              ))}

              {isSending ? (
                <View className="mt-2 max-w-[88%] rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3">
                  <Text className="font-mono text-[11px] tracking-[1.4px] text-white/45">STREAM</Text>
                  <Text className="mt-2 font-mono text-[13px] leading-6 text-white/72">
                    Generating response from selected provider...
                  </Text>
                </View>
              ) : null}
            </View>
          </SectionCard>
        </FadeInView>

        <FadeInView delay={180}>
          <SectionCard
            title="ACCELERATORS"
            subtitle="Inject a prepared intent into the composer without cluttering the workspace.">
            <View className="flex-row flex-wrap gap-2">
              {quickActions.map((action) => (
                <Pressable
                  key={action}
                  onPress={() => updateDraft(`Build a ${action.toLowerCase()} for the product.`)}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                  <Text className="font-mono text-[11px] tracking-[1.4px] text-white/70">{action.toUpperCase()}</Text>
                </Pressable>
              ))}
            </View>
          </SectionCard>
        </FadeInView>
      </ScrollView>
    </ScreenContainer>
  );
}

function MessageBubble({ message, providerName }: { message: ChatMessage; providerName: string }) {
  const isUser = message.role === 'user';

  return (
    <View
      className={`mb-3 rounded-3xl border px-4 py-3 ${
        isUser
          ? 'self-end max-w-[88%] border-white bg-white'
          : 'self-start max-w-[92%] border-white/10 bg-white/[0.04]'
      }`}>
      <Text className={`font-mono text-[11px] tracking-[1.4px] ${isUser ? 'text-black/50' : 'text-white/45'}`}>
        {isUser ? 'USER' : providerName.toUpperCase()}
      </Text>
      <Text className={`mt-2 font-mono text-[13px] leading-6 ${isUser ? 'text-black' : 'text-white'}`}>
        {message.content}
      </Text>
      <Text className={`mt-3 font-mono text-[10px] tracking-[1.4px] ${isUser ? 'text-black/45' : 'text-white/40'}`}>
        {message.timestamp}
      </Text>
    </View>
  );
}

function resolveProviderName(message: ChatMessage, providers: Array<{ id: string; name: string }>) {
  if (!message.providerId) {
    return 'AI CORE';
  }

  return providers.find((provider) => provider.id === message.providerId)?.name ?? 'AI CORE';
}
