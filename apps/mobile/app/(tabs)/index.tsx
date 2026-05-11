import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
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

export default function HomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { t } = useI18n();
  const palette = useAppPalette();
  const subscriptionPlan = useAssistantStore((state) => state.subscriptionPlan);
  const startFreshChat = useAssistantStore((state) => state.startFreshChat);
  const alias = useAssistantStore((state) => state.profile.alias);

  const floatAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: 1, duration: 3800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 3800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, { toValue: 1, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(breatheAnim, { toValue: 0, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    float.start();
    breathe.start();
    glow.start();
    return () => { float.stop(); breathe.stop(); glow.stop(); };
  }, [floatAnim, breatheAnim, glowAnim]);

  const animalY = floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -14] });
  const animalScale = breatheAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });
  const glowScale = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] });
  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 0.85, 0.5] });

  const isPremium = subscriptionPlan === 'premium';
  const displayName = alias || 'ibr';

  const quickActions: Array<{ icon: React.ComponentProps<typeof FontAwesome>['name']; label: string }> = [
    { icon: 'image', label: t('homeQuickImage') },
    { icon: 'lightbulb-o', label: t('homeQuickIdea') },
    { icon: 'list-ul', label: t('homeQuickChecklist') },
    { icon: 'comments-o', label: t('homeQuickChat') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      {/* Ambient glows */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <View style={{ position: 'absolute', top: -60, right: -60, width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(245,208,66,0.07)' }} />
        <View style={{ position: 'absolute', bottom: 40, left: -80, width: 320, height: 320, borderRadius: 160, backgroundColor: 'rgba(108,92,231,0.12)' }} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>

          {/* ─── Floating Navbar ─────────────────────────── */}
          <View style={{ paddingHorizontal: 20, paddingTop: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <NavIconButton icon="bars" onPress={openDrawer} palette={palette} />
            <BlurView intensity={24} tint="dark" style={{ overflow: 'hidden', borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)', paddingHorizontal: 16, paddingVertical: 9 }}>
              <Text style={{ color: palette.primary, fontFamily: 'SpaceMono', fontSize: 11, letterSpacing: 2 }}>
                {t('appName').toUpperCase()}
              </Text>
            </BlurView>
            <NavIconButton icon={isPremium ? 'diamond' : 'star-o'} onPress={() => router.push('/(tabs)/premium')} palette={palette} accent={isPremium} />
          </View>

          {/* ─── Hero ────────────────────────────────────── */}
          <View style={{ alignItems: 'center', paddingTop: 32, paddingHorizontal: 20 }}>
            <Text style={{ color: palette.textMuted, fontFamily: 'SpaceMono', fontSize: 10, letterSpacing: 2.5 }}>
              {t('homeEyebrow').toUpperCase()}
            </Text>
            <Text style={{ marginTop: 10, color: palette.textPrimary, fontFamily: 'SpaceMono', fontSize: 28, lineHeight: 36, textAlign: 'center' }}>
              {t('homeGreeting').replace('{name}', displayName)}
            </Text>
            <Text style={{ marginTop: 8, color: palette.textSecondary, fontFamily: 'SpaceMono', fontSize: 12, lineHeight: 20, textAlign: 'center', maxWidth: 280 }}>
              {t('homeSubtitle')}
            </Text>
          </View>

          {/* ─── Line-art animal (fox) ────────────────────── */}
          <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
            {/* Outer ambient halos */}
            <Animated.View style={{
              position: 'absolute',
              width: 210, height: 210, borderRadius: 105,
              backgroundColor: 'rgba(108,92,231,0.13)',
              transform: [{ scale: glowScale }],
              opacity: glowOpacity,
            }} />
            <Animated.View style={{
              position: 'absolute',
              width: 180, height: 180, borderRadius: 90,
              backgroundColor: 'rgba(245,208,66,0.06)',
              transform: [{ scale: breatheAnim.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1.08] }) }],
            }} />

            {/* Animated creature */}
            <Animated.View style={{ transform: [{ translateY: animalY }, { scale: animalScale }] }}>
              {/* Ears */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -8, paddingHorizontal: 28, zIndex: 2 }}>
                <View style={{ width: 0, height: 0, borderStyle: 'solid', borderLeftWidth: 14, borderRightWidth: 14, borderBottomWidth: 26, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'rgba(245,208,66,0.80)' }} />
                <View style={{ width: 0, height: 0, borderStyle: 'solid', borderLeftWidth: 14, borderRightWidth: 14, borderBottomWidth: 26, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'rgba(245,208,66,0.80)' }} />
              </View>

              {/* Head circle */}
              <View style={{ width: 150, height: 150, borderRadius: 75, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.82)', backgroundColor: 'rgba(255,255,255,0.025)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {/* Inner violet tint */}
                <View style={{ position: 'absolute', width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(108,92,231,0.12)' }} />

                {/* Eyes */}
                <View style={{ flexDirection: 'row', gap: 26, marginTop: -12 }}>
                  <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.90)' }} />
                  <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.90)' }} />
                </View>

                {/* Nose */}
                <View style={{ marginTop: 10, width: 8, height: 5, borderRadius: 3, backgroundColor: 'rgba(245,208,66,0.85)' }} />

                {/* Mouth arc */}
                <View style={{ marginTop: 6, width: 24, height: 12, borderBottomWidth: 1.5, borderLeftWidth: 1.5, borderRightWidth: 1.5, borderTopWidth: 0, borderColor: 'rgba(255,255,255,0.55)', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }} />
              </View>
            </Animated.View>
          </View>

          {/* ─── Quick Actions ────────────────────────────── */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: palette.textMuted, fontFamily: 'SpaceMono', fontSize: 10, letterSpacing: 2, marginBottom: 14 }}>
              QUICK START
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {quickActions.map((action, i) => (
                <QuickActionCard
                  key={i}
                  icon={action.icon}
                  label={action.label}
                  palette={palette}
                  onPress={() => { startFreshChat(); router.push('/(tabs)/chat'); }}
                />
              ))}
            </View>
          </View>

          {/* ─── CTA ─────────────────────────────────────── */}
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <MainCta label={t('homeCta')} palette={palette} onPress={() => { startFreshChat(); router.push('/(tabs)/chat'); }} />
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function NavIconButton({ icon, onPress, palette, accent = false }: { icon: React.ComponentProps<typeof FontAwesome>['name']; onPress: () => void; palette: ReturnType<typeof useAppPalette>; accent?: boolean }) {
  const scale = useRef(new Animated.Value(1)).current;
  const handleIn = () => Animated.timing(scale, { toValue: 0.88, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        style={{ width: 42, height: 42, borderRadius: 14, borderWidth: 1, borderColor: accent ? palette.primary : palette.border, backgroundColor: accent ? 'rgba(245,208,66,0.12)' : palette.surfaceRaised, alignItems: 'center', justifyContent: 'center' }}>
        <FontAwesome name={icon} size={14} color={accent ? palette.primary : palette.textSecondary} />
      </Pressable>
    </Animated.View>
  );
}

function QuickActionCard({ icon, label, onPress, palette }: { icon: React.ComponentProps<typeof FontAwesome>['name']; label: string; onPress: () => void; palette: ReturnType<typeof useAppPalette> }) {
  const scale = useRef(new Animated.Value(1)).current;
  const handleIn = () => Animated.timing(scale, { toValue: 0.94, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], width: '47%' }}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        style={{ borderRadius: 20, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.surface, padding: 16, gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(108,92,231,0.35)', backgroundColor: 'rgba(108,92,231,0.10)', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesome name={icon} size={14} color={palette.secondary} />
        </View>
        <Text style={{ color: palette.textSecondary, fontFamily: 'SpaceMono', fontSize: 11, lineHeight: 18 }}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

function MainCta({ label, onPress, palette }: { label: string; onPress: () => void; palette: ReturnType<typeof useAppPalette> }) {
  const scale = useRef(new Animated.Value(1)).current;
  const handleIn = () => Animated.timing(scale, { toValue: 0.96, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        style={{ borderRadius: 999, backgroundColor: palette.primary, paddingVertical: 16, alignItems: 'center' }}>
        <Text style={{ color: palette.primaryText, fontFamily: 'SpaceMono', fontSize: 12, letterSpacing: 2 }}>
          {label.toUpperCase()}
        </Text>
      </Pressable>
    </Animated.View>
  );
}