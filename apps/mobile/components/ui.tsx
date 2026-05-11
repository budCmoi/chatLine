import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import type { PropsWithChildren, ReactNode } from 'react';
import { Animated, Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useI18n } from '../lib/localization';
import { useAppPalette } from '../lib/theme-palette';

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
  tone?: 'solid' | 'ghost' | 'violet';
  disabled?: boolean;
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

export function ScreenContainer({ children, footer, noPad }: ScreenContainerProps) {
  const palette = useAppPalette();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      {/* Ambient glows – profondeur visuelle subtile */}
      <View
        pointerEvents="none"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <View
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            height: 300,
            width: 300,
            borderRadius: 999,
            backgroundColor: palette.ambientSecondary,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: -100,
            bottom: 60,
            height: 340,
            width: 340,
            borderRadius: 999,
            backgroundColor: palette.ambientPrimary,
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

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  onMenuPress,
  rightSlot,
}: PageHeaderProps) {
  const palette = useAppPalette();

  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 14 }}>
          {onMenuPress ? <MenuButton onPress={onMenuPress} /> : null}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: palette.primary,
                fontFamily: 'SpaceMono',
                fontSize: 10,
                letterSpacing: 2.5,
              }}>
              {eyebrow}
            </Text>
            <Text
              style={{
                marginTop: 10,
                color: palette.textPrimary,
                fontFamily: 'SpaceMono',
                fontSize: 26,
                lineHeight: 34,
              }}>
              {title}
            </Text>
            <Text
              style={{
                marginTop: 8,
                maxWidth: 330,
                color: palette.textSecondary,
                fontFamily: 'SpaceMono',
                fontSize: 12,
                lineHeight: 20,
              }}>
              {subtitle}
            </Text>
          </View>
        </View>
        {rightSlot}
      </View>
    </View>
  );
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  const palette = useAppPalette();

  return (
    <View
      style={{
        marginBottom: 14,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: palette.border,
        backgroundColor: palette.surface,
        padding: 16,
      }}>
      <Text
        style={{
          color: palette.primary,
          fontFamily: 'SpaceMono',
          fontSize: 10,
          letterSpacing: 2.5,
        }}>
        {title}
      </Text>
      <Text
        style={{
          marginTop: 6,
          color: palette.textSecondary,
          fontFamily: 'SpaceMono',
          fontSize: 12,
          lineHeight: 20,
        }}>
        {subtitle}
      </Text>
      <View style={{ marginTop: 14 }}>{children}</View>
    </View>
  );
}

export function PillButton({ label, active = false, onPress, disabled = false }: PillButtonProps) {
  const palette = useAppPalette();
  const scale = new Animated.Value(1);
  const handleIn = () => Animated.timing(scale, { toValue: 0.93, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        disabled={disabled}
        style={{
          borderRadius: 999,
          borderWidth: 1,
          borderColor: active ? palette.primary : palette.border,
          backgroundColor: active ? palette.primary : palette.surfaceRaised,
          opacity: disabled ? 0.38 : 1,
          paddingHorizontal: 14,
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: active ? palette.primaryText : palette.textSecondary,
            fontFamily: 'SpaceMono',
            fontSize: 11,
            letterSpacing: 1.2,
          }}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  tone = 'solid',
  disabled = false,
  icon,
}: PrimaryButtonProps) {
  const palette = useAppPalette();
  const scale = new Animated.Value(1);
  const handleIn = () => Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  const isSolid = tone === 'solid';
  const isViolet = tone === 'violet';
  const bgColor = isSolid ? palette.primary : isViolet ? palette.secondary : palette.surfaceRaised;
  const borderColor = isSolid ? palette.primary : isViolet ? palette.secondary : palette.border;
  const textColor = isSolid ? palette.primaryText : isViolet ? '#FFFFFF' : palette.textPrimary;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        disabled={disabled}
        style={{
          minWidth: 116,
          borderRadius: 999,
          borderWidth: 1,
          borderColor,
          backgroundColor: bgColor,
          opacity: disabled ? 0.38 : 1,
          paddingHorizontal: 20,
          paddingVertical: 14,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {icon ? <FontAwesome name={icon} size={12} color={textColor} /> : null}
          <Text
            style={{
              color: textColor,
              textAlign: 'center',
              fontFamily: 'SpaceMono',
              fontSize: 11,
              letterSpacing: 1.6,
            }}>
            {label}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

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
      <Text
        style={{
          color: palette.textMuted,
          fontFamily: 'SpaceMono',
          fontSize: 11,
          letterSpacing: 1.2,
        }}>
        {label}
      </Text>
      <Text
        style={{
          color: palette.textPrimary,
          fontFamily: 'SpaceMono',
          fontSize: 12,
        }}>
        {value}
      </Text>
    </View>
  );
}

export function InputField({ label, ...props }: InputFieldProps) {
  const palette = useAppPalette();

  return (
    <View>
      {label ? (
        <Text
          style={{
            marginBottom: 8,
            color: palette.textMuted,
            fontFamily: 'SpaceMono',
            fontSize: 11,
            letterSpacing: 1.2,
          }}>
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={palette.textMuted}
        {...props}
        style={[
          {
            borderRadius: 22,
            borderWidth: 1,
            borderColor: palette.border,
            backgroundColor: palette.surfaceRaised,
            color: palette.textPrimary,
            fontFamily: 'SpaceMono',
            fontSize: 13,
            paddingHorizontal: 14,
            paddingVertical: 14,
          },
          props.style,
        ]}
      />
    </View>
  );
}

export function SettingToggleRow({ label, value, onPress }: SettingToggleRowProps) {
  const palette = useAppPalette();
  const { locale } = useI18n();

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
      <Text
        style={{
          color: palette.textPrimary,
          fontFamily: 'SpaceMono',
          fontSize: 12,
        }}>
        {label}
      </Text>
      <View
        style={{
          borderRadius: 999,
          borderWidth: 1,
          borderColor: value ? palette.primary : palette.border,
          backgroundColor: value ? palette.primary : palette.surfaceRaised,
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}>
        <Text
          style={{
            color: value ? palette.primaryText : palette.textSecondary,
            fontFamily: 'SpaceMono',
            fontSize: 10,
            letterSpacing: 1.2,
          }}>
          {value ? (locale === 'fr' ? 'ON' : 'ON') : locale === 'fr' ? 'OFF' : 'OFF'}
        </Text>
      </View>
    </Pressable>
  );
}

export function StatusBadge({ label, tone = 'primary' }: StatusBadgeProps) {
  const palette = useAppPalette();

  const backgroundColor =
    tone === 'primary' ? palette.primary : tone === 'secondary' ? palette.secondarySoft : palette.surfaceRaised;
  const borderColor = tone === 'primary' ? palette.primary : tone === 'secondary' ? palette.secondary : palette.border;
  const color = tone === 'primary' ? palette.primaryText : palette.textPrimary;

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        borderRadius: 999,
        borderWidth: 1,
        borderColor,
        backgroundColor,
        paddingHorizontal: 12,
        paddingVertical: 8,
      }}>
      <Text
        style={{
          color,
          fontFamily: 'SpaceMono',
          fontSize: 10,
          letterSpacing: 1.2,
        }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

export function EmptyState({ title, body, action }: EmptyStateProps) {
  const palette = useAppPalette();

  return (
    <View
      style={{
        marginTop: 10,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: palette.border,
        backgroundColor: palette.surface,
        padding: 18,
      }}>
      <Text
        style={{
          color: palette.textPrimary,
          fontFamily: 'SpaceMono',
          fontSize: 16,
          lineHeight: 24,
        }}>
        {title}
      </Text>
      <Text
        style={{
          marginTop: 8,
          color: palette.textSecondary,
          fontFamily: 'SpaceMono',
          fontSize: 13,
          lineHeight: 22,
        }}>
        {body}
      </Text>
      {action ? <View style={{ marginTop: 16 }}>{action}</View> : null}
    </View>
  );
}

function MenuButton({ onPress }: { onPress: () => void }) {
  const palette = useAppPalette();
  const { t } = useI18n();
  const scale = new Animated.Value(1);
  const handleIn = () => Animated.timing(scale, { toValue: 0.90, duration: 100, useNativeDriver: true }).start();
  const handleOut = () => Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityLabel={t('openMenu')}
        onPress={onPress}
        onPressIn={handleIn}
        onPressOut={handleOut}
        style={{
          marginTop: 2,
          height: 42,
          width: 42,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: palette.border,
          backgroundColor: palette.surfaceRaised,
        }}>
        <FontAwesome name="bars" size={14} color={palette.textPrimary} />
      </Pressable>
    </Animated.View>
  );
}