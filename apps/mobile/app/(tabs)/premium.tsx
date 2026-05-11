import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDrawerControls } from '../../components/app-shell';
import { useI18n } from '../../lib/localization';
import { useAppPalette } from '../../lib/theme-palette';
import { useAssistantStore } from '../../stores/assistant-store';

// ─── Feature cards (matching web) ────────────────────────────────────────────
const FEATURES = [
  { icon: '⚡', title: 'Ultra rapide',       desc: 'Réponses en moins de 2 secondes' },
  { icon: '🔒', title: 'Privé & sécurisé',   desc: 'Vos données restent chez vous' },
  { icon: '∞',  title: 'Sans limites',        desc: 'Messages et sessions illimités' },
  { icon: '✦',  title: 'Meilleurs modèles',   desc: 'GPT Plus, Claude Opus & plus' },
] as const;

export default function PremiumScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { locale, t } = useI18n();
  const palette = useAppPalette();
  const subscriptionPlan = useAssistantStore((s) => s.subscriptionPlan);
  const upgradeToPremium  = useAssistantStore((s) => s.upgradeToPremium);
  const isPremium = subscriptionPlan === 'premium';

  // Animations
  const badgeAnim    = useRef(new Animated.Value(0)).current;
  const words = (locale === 'fr'
    ? 'L\'intelligence artificielle sans compromis.'
    : 'Artificial intelligence without compromise.'
  ).split(' ');
  const wordAnims    = useRef(words.map(() => new Animated.Value(0))).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const cardAnims    = useRef(FEATURES.map(() => new Animated.Value(0))).current;
  const pricingAnims = useRef([new Animated.Value(0), new Animated.Value(0)]).current;

  useEffect(() => {
    Animated.timing(badgeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    Animated.parallel(words.map((_, i) =>
      Animated.timing(wordAnims[i], { toValue: 1, duration: 380, delay: 200 + i * 70, useNativeDriver: true })
    )).start();
    Animated.timing(subtitleAnim, { toValue: 1, duration: 500, delay: 700, useNativeDriver: true }).start();
    Animated.parallel(FEATURES.map((_, i) =>
      Animated.timing(cardAnims[i], { toValue: 1, duration: 340, delay: 900 + i * 60, useNativeDriver: true })
    )).start();
    Animated.parallel([
      Animated.timing(pricingAnims[0], { toValue: 1, duration: 380, delay: 1100, useNativeDriver: true }),
      Animated.timing(pricingAnims[1], { toValue: 1, duration: 380, delay: 1200, useNativeDriver: true }),
    ]).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: '#F2F2F2', fontSize: 18, fontWeight: '700' }}>Chat</Text>
          <Text style={{ color: '#F5D042', fontSize: 18, fontWeight: '700' }}>Line</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}>

        {/* ─── Badge ── */}
        <Animated.View style={{ marginTop: 32, opacity: badgeAnim, alignSelf: 'flex-start' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(245,208,66,0.20)', backgroundColor: 'rgba(245,208,66,0.06)', paddingHorizontal: 14, paddingVertical: 7 }}>
            <Text style={{ color: '#F5D042', fontSize: 13 }}>✦</Text>
            <Text style={{ color: '#F5D042', fontSize: 11, fontWeight: '600' }}>
              {locale === 'fr' ? 'Plan Premium' : 'Premium Plan'}
            </Text>
          </View>
        </Animated.View>

        {/* ─── Headline ── */}
        <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {words.map((word, i) => (
            <Animated.Text
              key={i}
              style={{
                color: '#F2F2F2',
                fontSize: 30,
                fontWeight: '800',
                lineHeight: 40,
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
            ? 'Accédez à tous les modèles, supprimez les limites et profitez d\'une expérience pensée pour les professionnels.'
            : 'Access all models, remove limits, and enjoy an experience built for professionals.'}
        </Animated.Text>

        {/* ─── Feature cards (2×2) ── */}
        <View style={{ marginTop: 32, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {FEATURES.map((f, i) => (
            <Animated.View
              key={i}
              style={{
                width: '47.5%',
                opacity: cardAnims[i],
                transform: [{ translateY: cardAnims[i].interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
              }}>
              <View style={{ borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: '#0D0D0D', padding: 18, minHeight: 110 }}>
                <Text style={{ fontSize: 22, marginBottom: 10 }}>{f.icon}</Text>
                <Text style={{ color: '#F2F2F2', fontSize: 14, fontWeight: '600' }}>{f.title}</Text>
                <Text style={{ marginTop: 4, color: '#636363', fontSize: 12, lineHeight: 18 }}>{f.desc}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* ─── Pricing cards ── */}
        <Text style={{ marginTop: 36, color: '#9B9B9B', fontSize: 10, fontWeight: '600', letterSpacing: 2, marginBottom: 14 }}>
          {locale === 'fr' ? 'TARIFICATION' : 'PRICING'}
        </Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* Free */}
          <Animated.View style={{ flex: 1, opacity: pricingAnims[0], transform: [{ translateY: pricingAnims[0].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }}>
            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: '#0D0D0D', padding: 18 }}>
              <Text style={{ color: '#9B9B9B', fontSize: 11, fontWeight: '600', letterSpacing: 1.5 }}>GRATUIT</Text>
              <Text style={{ marginTop: 8, color: '#F2F2F2', fontSize: 28, fontWeight: '800' }}>0€</Text>
              <View style={{ marginTop: 14, gap: 8 }}>
                <FreeLine text={locale === 'fr' ? '20 messages / session' : '20 messages / session'} />
                <FreeLine text="GPT-5" />
                <FreeLine text={locale === 'fr' ? 'Mode standard' : 'Standard mode'} />
              </View>
            </View>
          </Animated.View>

          {/* Premium */}
          <Animated.View style={{ flex: 1, opacity: pricingAnims[1], transform: [{ translateY: pricingAnims[1].interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }] }}>
            <View style={{ borderRadius: 20, borderWidth: 1, borderColor: 'rgba(245,208,66,0.30)', backgroundColor: 'rgba(245,208,66,0.05)', padding: 18 }}>
              <Text style={{ color: '#F5D042', fontSize: 11, fontWeight: '600', letterSpacing: 1.5 }}>PREMIUM</Text>
              <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
                <Text style={{ color: '#F2F2F2', fontSize: 28, fontWeight: '800' }}>19€</Text>
                <Text style={{ color: '#9B9B9B', fontSize: 12 }}>/mois</Text>
              </View>
              <View style={{ marginTop: 14, gap: 8 }}>
                <PremLine text={locale === 'fr' ? 'Tout illimité' : 'Unlimited everything'} />
                <PremLine text="GPT Plus + Claude Opus" />
                <PremLine text={locale === 'fr' ? 'Mode expert' : 'Expert mode'} />
                <PremLine text={locale === 'fr' ? 'Priorité réseau' : 'Network priority'} />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* ─── CTA button ── */}
        <View style={{ marginTop: 28 }}>
          <Pressable
            onPress={() => { upgradeToPremium(); router.replace('/(tabs)/chat'); }}
            disabled={isPremium}
            style={{ borderRadius: 14, backgroundColor: isPremium ? 'rgba(245,208,66,0.20)' : '#F5D042', paddingVertical: 16, alignItems: 'center' }}>
            <Text style={{ color: isPremium ? '#F5D042' : '#050505', fontSize: 15, fontWeight: '700' }}>
              {isPremium
                ? (locale === 'fr' ? '✦ Vous êtes Premium' : '✦ You are Premium')
                : (locale === 'fr' ? 'Commencer — 19€ / mois' : 'Get started — €19 / month')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/chat')}
            style={{ marginTop: 12, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.04)', paddingVertical: 14, alignItems: 'center' }}>
            <Text style={{ color: '#9B9B9B', fontSize: 14 }}>
              {locale === 'fr' ? 'Continuer gratuitement' : 'Continue for free'}
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function FreeLine({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Text style={{ color: '#636363', fontSize: 12 }}>—</Text>
      <Text style={{ color: '#9B9B9B', fontSize: 12, flex: 1 }}>{text}</Text>
    </View>
  );
}

function PremLine({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <Text style={{ color: '#F5D042', fontSize: 12 }}>✓</Text>
      <Text style={{ color: '#F2F2F2', fontSize: 12, flex: 1 }}>{text}</Text>
    </View>
  );
}
