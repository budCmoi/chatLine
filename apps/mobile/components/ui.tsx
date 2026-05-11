/**
 * ui.tsx — Design system aligné sur apps/web
 * Palette: #050505 noir / #F5D042 or / #F2F2F2 blanc cassé
 * Typographie: system sans-serif (SF Pro / Roboto ≈ Inter)
 */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import type { PropsWithChildren, ReactNode } from 'react';
import { Animated, Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useI18n } from '../lib/localization';
import { useAppPalette } from '../lib/theme-palette';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ScreenContainerProps extends PropsWithChildren {
  footer?: ReactNode;
  noPad?: boolean;
}
interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  onMenuPress?: () => void;
  rightSlot?: ReactNode;
}
interface SectionCardProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}
interface PillButtonProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}
interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  /** solid = gold (défaut) · ghost = translucide · outline = bordure */
  tone?: 'solid' | 'ghost' | 'outline' | 'violet';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
}
interface DataRowProps {
  label: string;
  value: string;
}
interface InputFieldProps extends TextInputProps {
  label?: string;
}
interface SettingToggleRowProps {
  label: string;
  value: boolean;
  onPress?: () => void;
}
interface StatusBadgeProps {
  label: string;
  tone?: 'primary' | 'secondary' | 'muted';
}

interface EmptyStateProps {
  title: string;
  body: string;
  action?: ReactNode;
}

// ─── ScreenContainer ─────────────────────────────────────────────────────────
export function ScreenContainer({ children, footer, noPad }: ScreenContainerProps) {
  const palette = useAppPalette();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      {/* Ambient gold glow — très subtil, identique au web */}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <View
          style={{
            position: 'absolute',
            top: -120,
            alignSelf: 'center',
            width: 360,
            height: 240,
            borderRadius: 180,
            backgroundColor: 'rgba(245,208,66,0.05)',
          }}
        />
      </View>

      <View style={{ flex: 1, paddingHorizontal: noPad ? 0 : 20, paddingTop: noPad ? 0 : 12 }}>
        {children}
      </View>

      {footer ? (
        <BlurView
          intensity={28}
          tint="dark"
          style={{
            overflow: 'hidden',
            borderTopWidth: 1,
            borderTopColor: palette.border,
            paddingHorizontal: 20,
            paddingTop: 14,
            paddingBottom: 20,
          }}>
          {footer}
        </BlurView>
      ) : null}
    </SafeAreaView>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({ eyebrow, title, subtitle, onMenuPress, rightSlot }: PageHeaderProps) {
  const palette = useAppPalette();

  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 14 }}>
          {onMenuPress ? <MenuButton onPress={onMenuPress} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={{ color: palette.primary, fontSize: 10, fontWeight: '600', letterSpacing: 2.5 }}>
              {eyebrow}
            </Text>
            <Text style={{ marginTop: 8, color: palette.textPrimary, fontSize: 26, fontWeight: '700', lineHeight: 34 }}>
              {title}
            </Text>
            <Text style={{ marginTop: 6, maxWidth: 330, color: palette.textSecondary, fontSize: 13, lineHeight: 20 }}>
              {subtitle}
            </Text>
          </View>
        </View>
        {rightSlot}
      </View>
    </View>
  );
}

// ─── SectionCard ─────────────────────────────────────────────────────────────
export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  const palette = useAppPalette();

  return (
    <View
      style={{
        marginBottom: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: palette.border,
        backgroundColor: '#0D0D0D',
        padding: 16,
      }}>
      <Text style={{ color: palette.primary, fontSize: 10, fontWeight: '600', letterSpacing: 2 }}>
        {title}
      </Text>
      <Text
        style={{
          marginTop: 6,
          color: palette.textSecondary,
          fontSize: 13,
          lineHeight: 20,
        }}>
        {subtitle}
      </Text>
      <View style={{ marginTop: 14 }}>{children}</View>
    </View>
  );
}

// ─── PillButton ───────────────────────────────────────────────────────────────
export function PillButton({ label, active = false, onPress, disabled = false }: PillButtonProps) {
  const palette = useAppPalette();
  const scale = new Animated.Value(1);
  const handleIn = () => Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 130, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        disabled={disabled}
        style={{
          borderRadius: 14,
          borderWidth: 1,
          borderColor: active ? palette.primary : palette.border,
          backgroundColor: active ? 'rgba(245,208,66,0.12)' : palette.surfaceRaised,
          opacity: disabled ? 0.38 : 1,
          paddingHorizontal: 14,
          paddingVertical: 9,
        }}>
        <Text style={{ color: active ? palette.primary : palette.textSecondary, fontSize: 12, fontWeight: '600' }}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────
export function PrimaryButton({ label, onPress, tone = 'solid', disabled = false, loading = false, icon }: PrimaryButtonProps) {
  const palette = useAppPalette();
  const scale = new Animated.Value(1);
  const handleIn = () => Animated.timing(scale, { toValue: 0.97, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1.0, duration: 160, useNativeDriver: true }).start();

  const styleMap = {
    solid:   { bg: palette.primary,               border: palette.primary,                     text: palette.primaryText },
    ghost:   { bg: 'rgba(242,242,242,0.06)',       border: 'rgba(255,255,255,0.07)',             text: palette.textPrimary },
    outline: { bg: 'transparent',                  border: 'rgba(255,255,255,0.10)',             text: palette.textSecondary },
    violet:  { bg: palette.primary,               border: palette.primary,                     text: palette.primaryText },
  } as const;

  const s = styleMap[tone];

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        disabled={disabled || loading}
        style={{
          borderRadius: 14,
          borderWidth: 1,
          borderColor: s.border,
          backgroundColor: s.bg,
          opacity: disabled ? 0.38 : 1,
          paddingHorizontal: 22,
          paddingVertical: 14,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {icon ? <FontAwesome name={icon} size={13} color={s.text} /> : null}
          <Text style={{ color: s.text, fontSize: 14, fontWeight: '600', textAlign: 'center' }}>
            {loading ? '…' : label}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ─── DataRow ─────────────────────────────────────────────────────────────────
export function DataRow({ label, value }: DataRowProps) {
  const palette = useAppPalette();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: palette.border,
        paddingVertical: 12,
      }}>
      <Text style={{ color: palette.textMuted, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: palette.textPrimary, fontSize: 13, fontWeight: '500' }}>{value}</Text>
    </View>
  );
}

// ─── InputField ───────────────────────────────────────────────────────────────
export function InputField({ label, ...props }: InputFieldProps) {
  const palette = useAppPalette();

  return (
    <View>
      {label ? (
        <Text style={{ marginBottom: 8, color: palette.textMuted, fontSize: 12 }}>{label}</Text>
      ) : null}
      <TextInput
        placeholderTextColor={palette.textMuted}
        {...props}
        style={[
          {
            borderRadius: 14,
            borderWidth: 1,
            borderColor: palette.border,
            backgroundColor: '#0D0D0D',
            color: palette.textPrimary,
            fontSize: 14,
            paddingHorizontal: 16,
            paddingVertical: 13,
          },
          props.style,
        ]}
      />
    </View>
  );
}

// ─── SettingToggleRow ─────────────────────────────────────────────────────────
export function SettingToggleRow({ label, value, onPress }: SettingToggleRowProps) {
  const palette = useAppPalette();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: palette.border,
        paddingVertical: 14,
      }}>
      <Text style={{ color: palette.textPrimary, fontSize: 13 }}>{label}</Text>
      <View
        style={{
          borderRadius: 12,
          borderWidth: 1,
          borderColor: value ? palette.primary : palette.border,
          backgroundColor: value ? 'rgba(245,208,66,0.12)' : palette.surfaceRaised,
          paddingHorizontal: 12,
          paddingVertical: 7,
        }}>
        <Text style={{ color: value ? palette.primary : palette.textSecondary, fontSize: 11, fontWeight: '600' }}>
          {value ? 'ON' : 'OFF'}
        </Text>
      </View>
    </Pressable>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────
export function StatusBadge({ label, tone = 'primary' }: StatusBadgeProps) {
  const palette = useAppPalette();

  const map = {
    primary:   { bg: 'rgba(245,208,66,0.12)', border: 'rgba(245,208,66,0.25)', text: palette.primary },
    secondary: { bg: 'rgba(245,208,66,0.08)', border: 'rgba(245,208,66,0.18)', text: palette.primary },
    muted:     { bg: palette.surfaceRaised,   border: palette.border,           text: palette.textMuted },
  };
  const s = map[tone];

  return (
    <View style={{ alignSelf: 'flex-start', borderRadius: 12, borderWidth: 1, borderColor: s.border, backgroundColor: s.bg, paddingHorizontal: 11, paddingVertical: 6 }}>
      <Text style={{ color: s.text, fontSize: 11, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ title, body, action }: EmptyStateProps) {
  const palette = useAppPalette();

  return (
    <View style={{ marginTop: 10, borderRadius: 20, borderWidth: 1, borderColor: palette.border, backgroundColor: '#0D0D0D', padding: 20 }}>
      <Text style={{ color: palette.textPrimary, fontSize: 16, fontWeight: '600', lineHeight: 24 }}>{title}</Text>
      <Text style={{ marginTop: 8, color: palette.textSecondary, fontSize: 13, lineHeight: 22 }}>{body}</Text>
      {action ? <View style={{ marginTop: 16 }}>{action}</View> : null}
    </View>
  );
}

// ─── MenuButton ───────────────────────────────────────────────────────────────
function MenuButton({ onPress }: { onPress: () => void }) {
  const palette = useAppPalette();
  const { t } = useI18n();
  const scale = new Animated.Value(1);
  const handleIn = () => Animated.timing(scale, { toValue: 0.90, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 130, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityLabel={t('openMenu')}
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        style={{
          marginTop: 2,
          height: 40,
          width: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: palette.border,
          backgroundColor: palette.surfaceRaised,
        }}>
        <FontAwesome name="bars" size={13} color={palette.textSecondary} />
      </Pressable>
    </Animated.View>
  );
}