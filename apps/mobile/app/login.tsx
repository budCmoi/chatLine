import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GOLD = '#F6D365';
const INK = '#0B0B0B';
const SNOW = '#F5F5F5';
const GRAY = '#A1A1A1';
const RIM = 'rgba(255,255,255,0.06)';

const CHARS = 'Bonjour.'.split('');

const SOCIALS = [
  { icon: 'apple',   label: 'Apple' },
  { icon: 'google',  label: 'Google' },
  { icon: 'windows', label: 'Microsoft' },
  { icon: 'yahoo',   label: 'Yahoo' },
] as const;

export default function LoginScreen() {
  const router = useRouter();
  const charAnims = useRef(CHARS.map(() => new Animated.Value(0))).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const buttonsAnim = useRef(new Animated.Value(0)).current;
  const socialAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel(
      CHARS.map((_, i) =>
        Animated.timing(charAnims[i], { toValue: 1, duration: 340, delay: 120 + i * 55, useNativeDriver: true })
      )
    ).start();
    Animated.timing(subtitleAnim, { toValue: 1, duration: 480, delay: 700, useNativeDriver: true }).start();
    Animated.timing(buttonsAnim, { toValue: 1, duration: 500, delay: 900, useNativeDriver: true }).start();
    Animated.timing(socialAnim, { toValue: 1, duration: 500, delay: 1100, useNativeDriver: true }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = () => router.replace('/(tabs)');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: INK }}>
      {/* Glow */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <View style={{ position: 'absolute', top: -100, alignSelf: 'center', width: 400, height: 280, borderRadius: 200, backgroundColor: 'rgba(246,211,101,0.04)' }} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: 32, justifyContent: 'center', gap: 0 }}>

        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: 52 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: SNOW, fontSize: 26, fontWeight: '800' }}>Chat</Text>
            <Text style={{ color: GOLD, fontSize: 26, fontWeight: '800' }}>Line</Text>
          </View>
          <View style={{ marginTop: 6, width: 28, height: 1, backgroundColor: 'rgba(246,211,101,0.35)' }} />
        </View>

        {/* "Bonjour." stagger */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
          {CHARS.map((ch, i) => (
            <Animated.Text
              key={i}
              style={{
                color: ch === '.' ? GOLD : SNOW,
                fontSize: 44,
                fontWeight: '800',
                letterSpacing: -1,
                opacity: charAnims[i],
                transform: [{ translateY: charAnims[i].interpolate({ inputRange: [0, 1], outputRange: [28, 0] }) }],
              }}>
              {ch}
            </Animated.Text>
          ))}
        </View>

        {/* Subtitle */}
        <Animated.Text style={{ color: GRAY, fontSize: 14, lineHeight: 22, marginBottom: 36, opacity: subtitleAnim }}>
          Votre assistant IA, prêt à penser avec vous.
        </Animated.Text>

        {/* Buttons */}
        <Animated.View style={{ gap: 12, opacity: buttonsAnim }}>
          {/* Primary — Se connecter */}
          <Pressable
            onPress={go}
            style={({ pressed }) => ({
              borderRadius: 16, backgroundColor: GOLD,
              paddingVertical: 16, alignItems: 'center',
              opacity: pressed ? 0.88 : 1,
            })}>
            <Text style={{ color: INK, fontSize: 15, fontWeight: '700' }}>Se connecter</Text>
          </Pressable>
          {/* Ghost — Créer un compte */}
          <Pressable
            onPress={go}
            style={({ pressed }) => ({
              borderRadius: 16, borderWidth: 1, borderColor: RIM,
              backgroundColor: 'rgba(255,255,255,0.04)',
              paddingVertical: 16, alignItems: 'center',
              opacity: pressed ? 0.88 : 1,
            })}>
            <Text style={{ color: SNOW, fontSize: 15, fontWeight: '500' }}>Créer un compte</Text>
          </Pressable>
        </Animated.View>

        {/* Divider */}
        <Animated.View style={{ marginTop: 28, flexDirection: 'row', alignItems: 'center', gap: 12, opacity: socialAnim }}>
          <View style={{ flex: 1, height: 1, backgroundColor: RIM }} />
          <Text style={{ color: 'rgba(255,255,255,0.18)', fontSize: 11, letterSpacing: 1.5 }}>OU</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: RIM }} />
        </Animated.View>

        {/* Social row */}
        <Animated.View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'center', gap: 14, opacity: socialAnim }}>
          {SOCIALS.map((s) => (
            <Pressable
              key={s.icon}
              onPress={go}
              style={({ pressed }) => ({
                width: 52, height: 52, borderRadius: 14,
                borderWidth: 1, borderColor: RIM,
                backgroundColor: 'rgba(255,255,255,0.04)',
                alignItems: 'center', justifyContent: 'center',
                opacity: pressed ? 0.75 : 1,
              })}>
              <FontAwesome name={s.icon as any} size={18} color={SNOW} />
            </Pressable>
          ))}
        </Animated.View>

        {/* Demo link */}
        <Animated.View style={{ marginTop: 28, alignItems: 'center', opacity: socialAnim }}>
          <Pressable onPress={go}>
            <Text style={{ color: GRAY, fontSize: 13 }}>
              Mode démo <Text style={{ color: GOLD }}>→</Text>
            </Text>
          </Pressable>
        </Animated.View>

        {/* Legal */}
        <Animated.Text style={{ marginTop: 28, color: 'rgba(255,255,255,0.18)', fontSize: 11, textAlign: 'center', lineHeight: 16, opacity: socialAnim }}>
          En continuant, vous acceptez nos{'\n'}Conditions d'utilisation et Politique de confidentialité.
        </Animated.Text>

      </View>
    </SafeAreaView>
  );
}
