import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDrawerControls } from '../../components/app-shell';
import { PillButton, PrimaryButton } from '../../components/ui';
import { formatMessageTime, useI18n } from '../../lib/localization';
import { useAppPalette } from '../../lib/theme-palette';
import { useAssistantStore } from '../../stores/assistant-store';
import type { ChatMessage, Provider } from '../../types/assistant';

const FREE_LIMIT = 20;

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ prompt?: string }>();
  const { openDrawer } = useDrawerControls();
  const { locale, t } = useI18n();
  const palette = useAppPalette();
  const scrollRef = useRef<ScrollView>(null);

  const conversations        = useAssistantStore((s) => s.conversations);
  const messagesByConversation = useAssistantStore((s) => s.messagesByConversation);
  const activeConversationId = useAssistantStore((s) => s.activeConversationId);
  const providers            = useAssistantStore((s) => s.providers);
  const selectedProviderId   = useAssistantStore((s) => s.selectedProviderId);
  const mode                 = useAssistantStore((s) => s.mode);
  const draft                = useAssistantStore((s) => s.draft);
  const isSending            = useAssistantStore((s) => s.isSending);
  const subscriptionPlan     = useAssistantStore((s) => s.subscriptionPlan);
  const freeRequestsUsed     = useAssistantStore((s) => s.freeRequestsUsed);
  const updateDraft          = useAssistantStore((s) => s.updateDraft);
  const sendMessage          = useAssistantStore((s) => s.sendMessage);
  const setActiveProvider    = useAssistantStore((s) => s.setActiveProvider);
  const setMode              = useAssistantStore((s) => s.setMode);

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [showPremiumOverlay, setShowPremiumOverlay] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;
  const messages = activeConversationId ? messagesByConversation[activeConversationId] ?? [] : [];
  const selectedProvider = providers.find((p) => p.id === selectedProviderId) ?? providers[0];
  const isPremium = subscriptionPlan === 'premium';

  // Pre-fill draft from navigation params (home prompt cards)
  useEffect(() => {
    if (params.prompt) {
      updateDraft(params.prompt);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.prompt]);

  // Show premium overlay silently when limit hit
  useEffect(() => {
    if (!isPremium && freeRequestsUsed >= FREE_LIMIT) {
      setShowPremiumOverlay(true);
    }
  }, [freeRequestsUsed, isPremium]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
    }
  }, [messages.length, isSending]);

  function handleSend() {
    if (!draft.trim()) return;
    if (!isPremium && freeRequestsUsed >= FREE_LIMIT) {
      setShowPremiumOverlay(true);
      return;
    }
    void sendMessage();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0B0B' }}>
      {/* ─── Header bar ── */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' }}>
        <Pressable
          onPress={openDrawer}
          style={{ width: 38, height: 38, borderRadius: 11, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          <FontAwesome name="bars" size={13} color="#A1A1A1" />
        </Pressable>

        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ color: '#F5F5F5', fontSize: 14, fontWeight: '600' }}>
            {activeConversation?.title ?? t('startChat')}
          </Text>
          <Text style={{ color: '#555555', fontSize: 11, marginTop: 1 }}>
            {selectedProvider?.name ?? 'AI'}
          </Text>
        </View>

        <Pressable
          onPress={() => setOptionsOpen((v) => !v)}
          style={{ borderRadius: 11, borderWidth: 1, borderColor: optionsOpen ? 'rgba(246,211,101,0.25)' : 'rgba(255,255,255,0.07)', backgroundColor: optionsOpen ? 'rgba(246,211,101,0.07)' : 'rgba(255,255,255,0.04)', paddingHorizontal: 12, paddingVertical: 8 }}>
          <Text style={{ color: optionsOpen ? '#F6D365' : '#A1A1A1', fontSize: 12 }}>
            {t('chatOptions')}
          </Text>
        </Pressable>
      </View>

      {/* ─── Options panel ── */}
      {optionsOpen ? (
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)', backgroundColor: '#111111', padding: 16 }}>
          <Text style={{ color: '#555555', fontSize: 10, fontWeight: '600', letterSpacing: 1.5, marginBottom: 10 }}>MODÈLE</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {providers.map((p) => (
              <PillButton
                key={p.id}
                label={`${p.name}`}
                active={p.id === selectedProviderId}
                onPress={() => setActiveProvider(p.id)}
              />
            ))}
          </View>
          <Text style={{ color: '#555555', fontSize: 10, fontWeight: '600', letterSpacing: 1.5, marginTop: 14, marginBottom: 10 }}>MODE</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <PillButton label={t('modeStandard')} active={mode === 'fast'} onPress={() => setMode('fast')} />
            <PillButton
              label={t('modeExpert')}
              active={mode === 'expert' && isPremium}
              onPress={() => isPremium ? setMode('expert') : router.push('/(tabs)/premium')}
              disabled={!isPremium}
            />
          </View>
        </View>
      ) : null}

      {/* ─── Messages ── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: 12 }}>
          {messages.length === 0 ? (
            <View style={{ marginTop: 40, alignItems: 'center', gap: 8 }}>
              <Text style={{ color: '#F6D365', fontSize: 24 }}>✦</Text>
              <Text style={{ color: '#F5F5F5', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                {t('chatEmptyTitle')}
              </Text>
              <Text style={{ color: '#555555', fontSize: 13, textAlign: 'center', lineHeight: 20, maxWidth: 280 }}>
                {t('chatEmptyBody')}
              </Text>
            </View>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} providers={providers} locale={locale} />
            ))
          )}

          {/* Typing indicator */}
          {isSending ? <TypingIndicator provider={selectedProvider} /> : null}
        </ScrollView>

        {/* ─── Input area ── */}
        <BlurView
          intensity={28}
          tint="dark"
          style={{ borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 16, paddingTop: 12, paddingBottom: Platform.OS === 'ios' ? 28 : 16, overflow: 'hidden' }}>

          {/* Premium overlay (inline) */}
          {showPremiumOverlay ? (
            <View style={{ marginBottom: 12, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(246,211,101,0.25)', backgroundColor: 'rgba(246,211,101,0.06)', padding: 14 }}>
              <Text style={{ color: '#F5F5F5', fontSize: 14, fontWeight: '600' }}>{t('overlayTitle')}</Text>
              <Text style={{ marginTop: 6, color: '#A1A1A1', fontSize: 13, lineHeight: 20 }}>{t('overlayBody')}</Text>
              <View style={{ marginTop: 12, flexDirection: 'row', gap: 10 }}>
                <PrimaryButton label={t('overlayUpgrade')} onPress={() => router.push('/(tabs)/premium')} />
                <PrimaryButton label={t('overlayContinue')} onPress={() => setShowPremiumOverlay(false)} tone="ghost" />
              </View>
            </View>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10, borderRadius: 18, borderWidth: 1, borderColor: inputFocused ? 'rgba(246,211,101,0.35)' : 'rgba(255,255,255,0.07)', backgroundColor: '#111111', paddingHorizontal: 16, paddingVertical: 12 }}>
            <TextInput
              value={draft}
              onChangeText={updateDraft}
              placeholder={t('chatInputPlaceholder')}
              placeholderTextColor="#555555"
              multiline
              style={{ flex: 1, color: '#F5F5F5', fontSize: 14, lineHeight: 22, maxHeight: 120, paddingVertical: 0 }}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            {/* Mic button */}
            <Pressable
              style={{ width: 34, height: 34, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name="microphone" size={13} color="rgba(245,245,245,0.35)" />
            </Pressable>
            <Pressable
              onPress={handleSend}
              disabled={isSending || !draft.trim()}
              style={{ width: 36, height: 36, borderRadius: 11, backgroundColor: draft.trim() && !isSending ? '#F6D365' : 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome name="arrow-up" size={13} color={draft.trim() && !isSending ? '#0B0B0B' : '#555555'} />
            </Pressable>
          </View>
        </BlurView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message, providers, locale }: { message: ChatMessage; providers: Provider[]; locale: 'en' | 'fr' }) {
  const isUser = message.role === 'user';
  const provider = providers.find((p) => p.id === message.providerId);

  if (isUser) {
    return (
      <View style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
        <View style={{ backgroundColor: '#F6D365', borderRadius: 18, borderBottomRightRadius: 4, paddingHorizontal: 16, paddingVertical: 12 }}>
          <Text style={{ color: '#0B0B0B', fontSize: 14, lineHeight: 22 }}>{message.content}</Text>
        </View>
        <Text style={{ marginTop: 4, color: '#555555', fontSize: 11, textAlign: 'right' }}>
          {formatMessageTime(locale, message.createdAt)}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ alignSelf: 'flex-start', maxWidth: '86%' }}>
      {/* AI header: icon + model */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#111111', borderWidth: 1, borderColor: 'rgba(246,211,101,0.25)', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#F6D365', fontSize: 9 }}>✦</Text>
        </View>
        <Text style={{ color: '#F6D365', fontSize: 11, fontWeight: '600' }}>
          {provider?.name ?? 'AI'}
        </Text>
      </View>
      <View style={{ backgroundColor: '#111111', borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingHorizontal: 16, paddingVertical: 12 }}>
        <Text style={{ color: '#F5F5F5', fontSize: 14, lineHeight: 22 }}>{message.content}</Text>
      </View>
      <Text style={{ marginTop: 4, color: '#555555', fontSize: 11 }}>
        {formatMessageTime(locale, message.createdAt)}
      </Text>
    </View>
  );
}

// ─── Typing indicator (3 bouncing dots) ──────────────────────────────────────
function TypingIndicator({ provider }: { provider: Provider | undefined }) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const makeBounce = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: -6, duration: 280, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 280, useNativeDriver: true }),
          Animated.delay(400),
        ])
      );
    const a1 = makeBounce(dot1, 0);
    const a2 = makeBounce(dot2, 140);
    const a3 = makeBounce(dot3, 280);
    a1.start(); a2.start(); a3.start();
    return () => { a1.stop(); a2.stop(); a3.stop(); };
  }, [dot1, dot2, dot3]);

  return (
    <View style={{ alignSelf: 'flex-start', maxWidth: '86%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#111111', borderWidth: 1, borderColor: 'rgba(246,211,101,0.25)', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#F6D365', fontSize: 9 }}>✦</Text>
        </View>
        <Text style={{ color: '#F6D365', fontSize: 11, fontWeight: '600' }}>{provider?.name ?? 'AI'}</Text>
      </View>
      <View style={{ backgroundColor: '#111111', borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', paddingHorizontal: 16, paddingVertical: 14 }}>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
          {[dot1, dot2, dot3].map((d, i) => (
            <Animated.View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#555555', transform: [{ translateY: d }] }} />
          ))}
        </View>
      </View>
    </View>
  );
}

