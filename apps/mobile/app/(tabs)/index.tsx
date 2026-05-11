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
import { FoxLineArt, DeerLineArt, HeronLineArt } from '../../components/line-art';
import { useI18n } from '../../lib/localization';
import { useAssistantStore } from '../../stores/assistant-store';

// ─── Constants ────────────────────────────────────────────────────────────────
const GOLD = '#F6D365';
const INK = '#0B0B0B';
const SNOW = '#F5F5F5';
const GRAY = '#A1A1A1';
const RIM = 'rgba(255,255,255,0.06)';

const QUICK_ACTIONS = [
  { icon: '◈', label: 'Créer une image',     prompt: 'Décris-moi une image que tu aimerais générer, et je te donnerai un prompt détaillé pour la créer.' },
  { icon: '✦', label: 'Donne-moi une idée',  prompt: 'Donne-moi 5 idées originales et innovantes pour un projet personnel ou professionnel en 2025.' },
  { icon: '⬡', label: 'Fais une checklist',  prompt: "Crée une checklist complète et structurée pour m'aider à organiser mon prochain projet." },
  { icon: '⬦', label: 'Commencer un chat',   prompt: "Bonjour ! Je suis prêt à discuter de tout sujet. Comment puis-je t'aider aujourd'hui ?" },
] as const;

const FEATURES = [
  {
    Animal: FoxLineArt,
    tag: 'Intelligence adaptative',
    heading: 'Comprend le contexte,\npas juste les mots.',
    description: 'ChatLine analyse la nuance de chaque échange pour vous offrir des réponses précises, contextuelles et toujours pertinentes.',
    reverse: false,
  },
  {
    Animal: DeerLineArt,
    tag: 'Création sans effort',
    heading: 'Écrivez, créez, planifiez\nen quelques secondes.',
    description: "Emails professionnels, plans de projet, idées créatives — ChatLine génère des contenus prêts à l'emploi en une seule requête.",
    reverse: true,
  },
  {
    Animal: HeronLineArt,
    tag: 'Analyse approfondie',
    heading: "Décryptez l'information,\nprenez de meilleures décisions.",
    description: "Résumés, analyses comparatives, critique constructive — obtenez une expertise instantanée sur n'importe quel sujet.",
    reverse: false,
  },
] as const;

const HEADING_WORDS = ["L'IA", 'qui', 'pense', 'avec', 'vous.'];

export default function HomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const startFreshChat = useAssistantStore((s) => s.startFreshChat);
  const subscriptionPlan = useAssistantStore((s) => s.subscriptionPlan);

  const badgeAnim = useRef(new Animated.Value(0)).current;
  const wordAnims = useRef(HEADING_WORDS.map(() => new Animated.Value(0))).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const featureAnims = useRef(FEATURES.map(() => new Animated.Value(0))).current;
  const actionAnims = useRef(QUICK_ACTIONS.map(() => new Animated.Value(0))).current;
  const pulseDot = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(badgeAnim, { toValue: 1, duration: 480, useNativeDriver: true }).start();
    Animated.parallel(
      HEADING_WORDS.map((_, i) =>
        Animated.timing(wordAnims[i], { toValue: 1, duration: 400, delay: 180 + i * 80, useNativeDriver: true })
      )
    ).start();
    Animated.timing(subtitleAnim, { toValue: 1, duration: 500, delay: 720, useNativeDriver: true }).start();
    Animated.parallel(
      FEATURES.map((_, i) =>
        Animated.timing(featureAnims[i], { toValue: 1, duration: 500, delay: 900 + i * 150, useNativeDriver: true })
      )
    ).start();
    Animated.parallel(
      QUICK_ACTIONS.map((_, i) =>
        Animated.timing(actionAnims[i], { toValue: 1, duration: 380, delay: 1350 + i * 80, useNativeDriver: true })
      )
    ).start();
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseDot, { toValue: 1.7, duration: 850, useNativeDriver: true }),
        Animated.timing(pulseDot, { toValue: 1, duration: 850, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPremium = subscriptionPlan === 'premium';

  const handlePrompt = (prompt: string) => {
    startFreshChat();
    router.push({ pathname: '/(tabs)/chat', params: { prompt } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: INK }}>
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: -80, alignSelf: 'center', width: 360, height: 220, borderRadius: 180, backgroundColor: 'rgba(246,211,101,0.04)' }} />
      </View>

      {/* Navbar */}
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable onPress={openDrawer} style={{ width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: RIM, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name="bars" size={13} color={SNOW} />
        </Pressable>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: SNOW, fontSize: 18, fontWeight: '700' }}>Chat</Text>
          <Text style={{ color: GOLD, fontSize: 18, fontWeight: '700' }}>Line</Text>
        </View>
        <Pressable onPress={() => router.push('/(tabs)/premium')} style={{ width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: isPremium ? 'rgba(246,211,101,0.30)' : RIM, backgroundColor: isPremium ? 'rgba(246,211,101,0.08)' : 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name={isPremium ? 'diamond' : 'star-o'} size={13} color={isPremium ? GOLD : GRAY} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 130 }}>

        {/* Badge */}
        <Animated.View style={{ marginTop: 32, opacity: badgeAnim, alignSelf: 'flex-start' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(246,211,101,0.18)', backgroundColor: 'rgba(246,211,101,0.05)', paddingHorizontal: 14, paddingVertical: 7 }}>
            <Animated.View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD, transform: [{ scale: pulseDot }] }} />
            <Text style={{ color: GOLD, fontSize: 10, fontWeight: '600', letterSpacing: 1.5 }}>INTELLIGENCE ARTIFICIELLE</Text>
          </View>
        </Animated.View>

        {/* Heading */}
        <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
          {HEADING_WORDS.map((word, i) => (
            <Animated.Text
              key={i}
              style={{
                color: word === 'vous.' ? GOLD : SNOW,
                fontSize: 34,
                fontWeight: '800',
                lineHeight: 44,
                letterSpacing: -0.5,
                opacity: wordAnims[i],
                transform: [{ translateY: wordAnims[i].interpolate({ inputRange: [0, 1], outputRange: [22, 0] }) }],
              }}>
              {word}
            </Animated.Text>
          ))}
        </View>

        {/* Subtitle */}
        <Animated.Text style={{ marginTop: 14, color: GRAY, fontSize: 14, lineHeight: 22, opacity: subtitleAnim }}>
          Conversez, créez et analysez avec un assistant conçu pour les esprits exigeants.
        </Animated.Text>

        {/* Feature sections */}
        <View style={{ marginTop: 40, gap: 20 }}>
          {FEATURES.map((feat, i) => (
            <Animated.View
              key={i}
              style={{
                opacity: featureAnims[i],
                transform: [{ translateY: featureAnims[i].interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
              }}>
              <FeatureSection {...feat} />
            </Animated.View>
          ))}
        </View>

        {/* Divider */}
        <View style={{ marginTop: 40, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: RIM }} />
          <Text style={{ color: 'rgba(255,255,255,0.15)', fontSize: 9, letterSpacing: 2.5, fontWeight: '600' }}>ACTIONS RAPIDES</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: RIM }} />
        </View>

        {/* Quick actions */}
        <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {QUICK_ACTIONS.map((a, i) => (
            <Animated.View
              key={i}
              style={{
                opacity: actionAnims[i],
                transform: [{ translateY: actionAnims[i].interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }],
              }}>
              <Pressable
                onPress={() => handlePrompt(a.prompt)}
                style={({ pressed }) => ({
                  flexDirection: 'row', alignItems: 'center', gap: 8,
                  paddingHorizontal: 18, paddingVertical: 12,
                  borderRadius: 14, backgroundColor: GOLD,
                  opacity: pressed ? 0.85 : 1,
                })}>
                <Text style={{ fontSize: 15 }}>{a.icon}</Text>
                <Text style={{ color: INK, fontSize: 13, fontWeight: '700', letterSpacing: -0.2 }}>{a.label}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

      </ScrollView>

      {/* Floating input */}
      <FloatingInput onSend={handlePrompt} />
    </SafeAreaView>
  );
}

// ─── Feature section ──────────────────────────────────────────────────────────
function FeatureSection({ Animal, tag, heading, description, reverse }: (typeof FEATURES)[number]) {
  const animalBlock = (
    <View style={{ alignItems: 'center', paddingVertical: 12 }}>
      <Animal size={110} color="rgba(245,245,245,0.22)" strokeWidth={1.0} />
    </View>
  );

  const textBlock = (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: GOLD }} />
        <Text style={{ color: 'rgba(246,211,101,0.7)', fontSize: 9, fontWeight: '600', letterSpacing: 2, textTransform: 'uppercase' }}>{tag}</Text>
      </View>
      <Text style={{ color: SNOW, fontSize: 20, fontWeight: '800', lineHeight: 28, letterSpacing: -0.4, marginBottom: 10 }}>{heading}</Text>
      <Text style={{ color: GRAY, fontSize: 13, lineHeight: 21 }}>{description}</Text>
    </View>
  );

  return (
    <View style={{ borderWidth: 1, borderColor: RIM, borderRadius: 24, padding: 20, backgroundColor: 'rgba(255,255,255,0.015)', gap: 16 }}>
      {reverse ? <>{animalBlock}{textBlock}</> : <>{textBlock}{animalBlock}</>}
    </View>
  );
}

// ─── Floating input with mic ───────────────────────────────────────────────────
function FloatingInput({ onSend }: { onSend: (text: string) => void }) {
  const router = useRouter();
  const valueRef = useRef('');
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  function handleChange(t: string) { valueRef.current = t; setHasText(t.length > 0); }
  function handleSubmit() {
    const text = valueRef.current.trim();
    if (!text) return;
    onSend(text); valueRef.current = ''; setHasText(false); inputRef.current?.clear();
  }

  return (
    <BlurView intensity={28} tint="dark" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: RIM, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 28, overflow: 'hidden' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 18, borderWidth: 1, borderColor: focused ? 'rgba(246,211,101,0.30)' : RIM, backgroundColor: '#111111', paddingHorizontal: 14, paddingVertical: 10 }}>
        <TextInput
          ref={inputRef}
          placeholder="Posez une question…"
          placeholderTextColor="rgba(245,245,245,0.25)"
          style={{ flex: 1, color: '#F5F5F5', fontSize: 14, paddingVertical: 2 }}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSubmit}
          returnKeyType="send"
        />
        <Pressable onPress={() => router.push('/(tabs)/chat')} style={{ width: 32, height: 32, borderRadius: 10, borderWidth: 1, borderColor: RIM, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name="microphone" size={12} color="rgba(245,245,245,0.35)" />
        </Pressable>
        <Pressable onPress={handleSubmit} style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: hasText ? '#F6D365' : 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name="arrow-up" size={13} color={hasText ? '#0B0B0B' : 'rgba(245,245,245,0.25)'} />
        </Pressable>
      </View>
    </BlurView>
  );
}
