import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useDrawerControls } from '../../components/app-shell';
import { useI18n } from '../../lib/localization';
import { useAssistantStore } from '../../stores/assistant-store';

export default function HomeScreen() {
  const router = useRouter();
  const { openDrawer } = useDrawerControls();
  const { t } = useI18n();
  const subscriptionPlan = useAssistantStore((state) => state.subscriptionPlan);
  const startFreshChat = useAssistantStore((state) => state.startFreshChat);

  const floatValue = useRef(new Animated.Value(0)).current;
  const breatheValue = useRef(new Animated.Value(0)).current;
  const morphValue = useRef(new Animated.Value(0)).current;
  const rippleValues = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const loops = [
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatValue, {
            toValue: 1,
            duration: 4200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(floatValue, {
            toValue: 0,
            duration: 4200,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(breatheValue, {
            toValue: 1,
            duration: 3400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(breatheValue, {
            toValue: 0,
            duration: 3400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(morphValue, {
            toValue: 1,
            duration: 2600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(morphValue, {
            toValue: 0,
            duration: 2600,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ),
    ];

    const rippleLoops = rippleValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 640),
          Animated.timing(value, {
            toValue: 1,
            duration: 2800,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    [...loops, ...rippleLoops].forEach((loop) => loop.start());

    return () => {
      [...loops, ...rippleLoops].forEach((loop) => loop.stop());
    };
  }, [breatheValue, floatValue, morphValue, rippleValues]);

  const orbTransform = useMemo(
    () => ({
      translateY: floatValue.interpolate({ inputRange: [0, 1], outputRange: [10, -12] }),
      scale: breatheValue.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1.045] }),
      scaleX: morphValue.interpolate({ inputRange: [0, 1], outputRange: [0.965, 1.045] }),
      scaleY: morphValue.interpolate({ inputRange: [0, 1], outputRange: [1.04, 0.96] }),
      rotate: morphValue.interpolate({ inputRange: [0, 1], outputRange: ['-2deg', '2deg'] }),
    }),
    [breatheValue, floatValue, morphValue],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#16092F', '#1B1A58', '#2E1558', '#170B31']}
        start={{ x: 0.08, y: 0.05 }}
        end={{ x: 0.92, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.fluidShape, styles.fluidOne, { transform: [{ translateY: orbTransform.translateY }] }]} />
      <Animated.View style={[styles.fluidShape, styles.fluidTwo, { transform: [{ translateY: Animated.multiply(orbTransform.translateY, -0.7) }] }]} />
      <Animated.View style={[styles.fluidShape, styles.fluidThree, { transform: [{ translateY: Animated.multiply(orbTransform.translateY, 0.45) }] }]} />

      <View style={styles.root}>
        <View style={styles.topBar}>
          <GlassPillButton icon="bars" label={t('openMenu')} onPress={openDrawer} compact />
          <BlurView intensity={36} tint="light" style={styles.planBadge}>
            <Text style={styles.planBadgeText}>{subscriptionPlan === 'premium' ? t('premiumBadge') : t('freeBadge')}</Text>
          </BlurView>
        </View>

        <View style={styles.centerArea}>
          <View style={styles.waveContainer}>
            {rippleValues.map((value, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.ripple,
                  {
                    opacity: value.interpolate({ inputRange: [0, 1], outputRange: [0.46, 0] }),
                    transform: [
                      {
                        scale: value.interpolate({ inputRange: [0, 1], outputRange: [1, 2.55] }),
                      },
                    ],
                  },
                ]}
              />
            ))}

            <Animated.View
              style={[
                styles.orbGlow,
                {
                  transform: [{ scale: breatheValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }],
                },
              ]}
            />

            <Animated.View
              style={[
                styles.orbShell,
                {
                  transform: [
                    { translateY: orbTransform.translateY },
                    { scale: orbTransform.scale },
                    { scaleX: orbTransform.scaleX },
                    { scaleY: orbTransform.scaleY },
                    { rotate: orbTransform.rotate },
                  ],
                },
              ]}>
              <LinearGradient
                colors={['#693BFF', '#1D71FF', '#6D2EFF']}
                start={{ x: 0.2, y: 0.1 }}
                end={{ x: 0.8, y: 0.95 }}
                style={styles.orbGradient}
              >
                <View style={styles.innerShine} />
                <Animated.View
                  style={[
                    styles.innerCore,
                    {
                      transform: [
                        {
                          scale: breatheValue.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1.12] }),
                        },
                      ],
                    },
                  ]}
                />

                <View style={styles.eyeRow}>
                  <View style={styles.eye} />
                  <View style={styles.eye} />
                </View>

                <View style={styles.glassReflection} />
              </LinearGradient>
            </Animated.View>
          </View>

          <BlurView intensity={44} tint="light" style={styles.heroCard}>
            <Text style={styles.heroEyebrow}>{t('appName').toUpperCase()}</Text>
            <Text style={styles.heroTitle}>{t('homeTitle')}</Text>
            <Text style={styles.heroSubtitle}>{t('homeSubtitle')}</Text>
          </BlurView>
        </View>

        <View style={styles.actionsRow}>
          <GlassPillButton
            icon="comments-o"
            label={t('homeCta')}
            onPress={() => {
              startFreshChat();
              router.push('/(tabs)/chat');
            }}
          />
          <GlassPillButton icon="diamond" label={t('premiumCta')} onPress={() => router.push('/(tabs)/premium')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

interface GlassPillButtonProps {
  label: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  onPress: () => void;
  compact?: boolean;
}

function GlassPillButton({ label, icon, onPress, compact = false }: GlassPillButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.pillWrap, compact && styles.pillCompact]}>
      <BlurView intensity={40} tint="light" style={[styles.pillBlur, compact && styles.pillBlurCompact]}>
        <FontAwesome name={icon} size={13} color="rgba(255,255,255,0.92)" />
        {!compact ? <Text style={styles.pillLabel}>{label}</Text> : null}
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#12082B',
  },
  root: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planBadge: {
    overflow: 'hidden',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  planBadgeText: {
    color: 'rgba(255,255,255,0.96)',
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 1.1,
  },
  centerArea: {
    flex: 1,
    justifyContent: 'center',
  },
  waveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 34,
  },
  ripple: {
    position: 'absolute',
    height: 200,
    width: 200,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(169,196,255,0.58)',
    backgroundColor: 'rgba(186,178,255,0.10)',
  },
  orbGlow: {
    position: 'absolute',
    height: 240,
    width: 240,
    borderRadius: 999,
    backgroundColor: 'rgba(117,122,255,0.42)',
    shadowColor: '#8D79FF',
    shadowOpacity: 0.8,
    shadowRadius: 58,
    shadowOffset: { width: 0, height: 0 },
    elevation: 28,
  },
  orbShell: {
    height: 200,
    width: 200,
    borderRadius: 999,
    overflow: 'hidden',
  },
  orbGradient: {
    flex: 1,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCore: {
    position: 'absolute',
    height: 94,
    width: 94,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.24)',
    shadowColor: '#DADEFF',
    shadowOpacity: 0.5,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 0 },
  },
  innerShine: {
    position: 'absolute',
    top: 20,
    left: 40,
    height: 62,
    width: 110,
    borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.24)',
    transform: [{ rotate: '-22deg' }],
  },
  glassReflection: {
    position: 'absolute',
    right: 28,
    bottom: 32,
    height: 42,
    width: 60,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  eyeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  eye: {
    height: 36,
    width: 13,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.98)',
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  heroCard: {
    overflow: 'hidden',
    borderRadius: 34,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  heroEyebrow: {
    color: 'rgba(213,220,255,0.98)',
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 1.8,
  },
  heroTitle: {
    marginTop: 10,
    color: '#FFFFFF',
    fontFamily: 'SpaceMono',
    fontSize: 26,
    lineHeight: 34,
  },
  heroSubtitle: {
    marginTop: 10,
    color: 'rgba(240,242,255,0.82)',
    fontFamily: 'SpaceMono',
    fontSize: 12,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  pillWrap: {
    flex: 1,
    borderRadius: 999,
    shadowColor: '#C8D0FF',
    shadowOpacity: 0.32,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
  pillCompact: {
    flex: 0,
  },
  pillBlur: {
    overflow: 'hidden',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.30)',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  pillBlurCompact: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pillLabel: {
    color: 'rgba(255,255,255,0.95)',
    fontFamily: 'SpaceMono',
    fontSize: 11,
    letterSpacing: 1.2,
  },
  fluidShape: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.55,
  },
  fluidOne: {
    top: -90,
    right: -70,
    height: 280,
    width: 280,
    backgroundColor: 'rgba(202,79,255,0.42)',
  },
  fluidTwo: {
    left: -120,
    bottom: 160,
    height: 330,
    width: 330,
    backgroundColor: 'rgba(53,142,255,0.34)',
  },
  fluidThree: {
    bottom: -160,
    right: -90,
    height: 360,
    width: 360,
    backgroundColor: 'rgba(255,103,190,0.24)',
  },
});
