import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDrawerControls } from '../../components/app-shell';
import { useI18n } from '../../lib/localization';
import { useAppPalette } from '../../lib/theme-palette';
import { useAssistantStore } from '../../stores/assistant-store';

// ─── Prompt suggestion cards (matching web exactly) ──────────────────────────
const PROMPT_CARDS = [
  { symbol: '✦', title: 'Expliquer un concept', desc: 'Rendez complexe accessible' },
  { symbol: '◈', title: 'Idées business',       desc: 'Brainstorming stratégique' },
  { symbol: '⬡', title: 'Texte professionnel',  desc: 'Rédigez avec précision' },
  { symbol: '◎', title: 'Checklist & Plan',     desc: 'Organisez vos projets' },
  { symbol: '⟐', title: 'Analyse & Critique',   desc: 'Évaluez avec rigueur' },
  { symbol: '⬦', title: 'Code & Technique',     desc: 'Développez plus vite' },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { locale } = useI18n();
  const palette = useAppPalette();
  const subscriptionPlan = useAssistantStore((state) => state.subscriptionPlan);
  const startFreshChat = useAssistantStore((state) => state.startFreshChat);

  // Word-stagger animation for headline
  const words = (locale === 'fr'
    ? "L'IA qui vous comprend vraiment."
    : 'The AI that truly understands you.'
  ).split(' ');
  const wordAnims = useRef(words.map(() => new Animated.Value(0))).current;
  const badgeAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(PROMPT_CARDS.map(() => new Animated.Value(0))).current;
  const pulseDot = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Badge fade-in
    Animated.timing(badgeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();

    // Word stagger
    const wordSeq = words.map((_, i) =>
      Animated.timing(wordAnims[i], {
        toValue: 1,
        duration: 380,
        delay: 200 + i * 80,
        useNativeDriver: true,
      })
    );
    Animated.parallel(wordSeq).start();

    // Subtitle
    Animated.timing(subtitleAnim, { toValue: 1, duration: 500, delay: 700, useNativeDriver: true }).start();

    // Cards stagger
    const cardSeq = cardAnims.map((a, i) =>
      Animated.timing(a, { toValue: 1, duration: 340, delay: 900 + i * 60, useNativeDriver: true })
    );
    Animated.parallel(cardSeq).start();

    // Gold pulse dot
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseDot, { toValue: 1.6, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseDot, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPremium = subscriptionPlan === 'premium';

  const handlePromptCard = (title: string) => {
    startFreshChat();
    router.push({ pathname: '/(tabs)/chat', params: { prompt: title } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050505' }}>
      {/* Ambient gold glow */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: -100, alignSelf: 'center', width: 400, height: 260, borderRadius: 200, backgroundColor: 'rgba(245,208,66,0.05)' }} />
      </View>

      {/* ─── Navbar ── */}
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable
          onPress={openDrawer}
          style={{ width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name="bars" size={13} color="#F2F2F2" />
        </Pressable>

        {/* Logo */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#F2F2F2', fontSize: 18, fontWeight: '700' }}>Chat</Text>
          <Text style={{ color: '#F5D042', fontSize: 18, fontWeight: '700' }}>Line</Text>
        </View>

        <Pressable
          onPress={() => router.push('/(tabs)/premium')}
          style={{ width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: isPremium ? 'rgba(245,208,66,0.30)' : 'rgba(255,255,255,0.07)', backgroundColor: isPremium ? 'rgba(245,208,66,0.08)' : 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name={isPremium ? 'diamond' : 'star-o'} size={13} color={isPremium ? '#F5D042' : '#9B9B9B'} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>

        {/* ─── Badge ── */}
        <Animated.View style={{ marginTop: 32, opacity: badgeAnim, alignSelf: 'flex-start' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(245,208,66,0.20)', backgroundColor: 'rgba(245,208,66,0.06)', paddingHorizontal: 14, paddingVertical: 7 }}>
            <Animated.View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#F5D042', transform: [{ scale: pulseDot }] }} />
            <Text style={{ color: '#F5D042', fontSize: 11, fontWeight: '600' }}>
              {locale === 'fr' ? 'Intelligence artificielle premium' : 'Premium artificial intelligence'}
            </Text>
          </View>
        </Animated.View>

        {/* ─── Headline (word stagger) ── */}
        <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {words.map((word, i) => (
            <Animated.Text
              key={i}
              style={{
                color: '#F2F2F2',
                fontSize: 32,
                fontWeight: '800',
                lineHeight: 42,
                opacity: wordAnims[i],
                transform: [{ translateY: wordAnims[i].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
              }}>
              {word}
            </Animated.Text>
          ))}
        </View>

        {/* ─── Subtitle ── */}
        <Animated.Text style={{ marginTop: 14, color: '#9B9B9B', fontSize: 14, lineHeight: 22, opacity: subtitleAnim }}>
          {locale === 'fr'
            ? 'Conversez, créez et explorez avec une intelligence artificielle pensée dans les moindres détails.'
            : 'Converse, create and explore with an AI designed to the smallest detail.'}
        </Animated.Text>

        {/* ─── Prompt cards (2-column grid, same as web) ── */}
        <View style={{ marginTop: 32, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {PROMPT_CARDS.map((card, i) => (
            <Animated.View
              key={i}
              style={{
                width: '47.5%',
                opacity: cardAnims[i],
                transform: [{ translateY: cardAnims[i].interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
              }}>
              <Pressable
                onPress={() => handlePromptCard(card.title)}
                style={{ borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: '#0D0D0D', padding: 16, minHeight: 100 }}>
                <Text style={{ color: '#F5D042', fontSize: 18, marginBottom: 8 }}>{card.symbol}</Text>
                <Text style={{ color: '#F2F2F2', fontSize: 13, fontWeight: '600', lineHeight: 19 }}>{card.title}</Text>
                <Text style={{ marginTop: 4, color: '#636363', fontSize: 12, lineHeight: 17 }}>{card.desc}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

      </ScrollView>

      {/* ─── Floating chat input ── */}
      <FloatingInput palette={palette} onSend={(text) => {
        startFreshChat();
        router.push({ pathname: '/(tabs)/chat', params: { prompt: text } });
      }} />
    </SafeAreaView>
  );
}

// ─── Floating bottom input ────────────────────────────────────────────────────
function FloatingInput({ palette, onSend }: { palette: ReturnType<typeof useAppPalette>; onSend: (text: string) => void }) {
  const valueRef = useRef('');
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  function handleChange(t: string) {
    valueRef.current = t;
    setHasText(t.length > 0);
  }

  function handleSubmit() {
    const text = valueRef.current.trim();
    if (!text) return;
    onSend(text);
    valueRef.current = '';
    setHasText(false);
    inputRef.current?.clear();
  }

  return (
    <BlurView intensity={28} tint="dark" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)', paddingHorizontal: 20, paddingTop: 14, paddingBottom: 28, overflow: 'hidden' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 18, borderWidth: 1, borderColor: focused ? 'rgba(245,208,66,0.35)' : 'rgba(255,255,255,0.07)', backgroundColor: '#0D0D0D', paddingHorizontal: 16, paddingVertical: 12 }}>
        <TextInput
          ref={inputRef}
          placeholder={focused ? '' : 'Posez une question…'}
          placeholderTextColor="#636363"
          style={{ flex: 1, color: '#F2F2F2', fontSize: 14, paddingVertical: 0 }}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSubmit}
          returnKeyType="send"
          multiline={false}
        />
        <Pressable
          onPress={handleSubmit}
          style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: hasText ? '#F5D042' : 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name="arrow-up" size={13} color={hasText ? '#050505' : '#636363'} />
        </Pressable>
      </View>
    </BlurView>
  );
}
