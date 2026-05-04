import FontAwesome from '@expo/vector-icons/FontAwesome';
import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useI18n } from '../lib/localization';
import { useAppPalette } from '../lib/theme-palette';

interface ScreenContainerProps extends PropsWithChildren {
  footer?: ReactNode;
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
  tone?: 'solid' | 'ghost';
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

export function ScreenContainer({ children, footer }: ScreenContainerProps) {
  const palette = useAppPalette();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 12 }}>{children}</View>
      {footer ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: palette.border,
            backgroundColor: palette.background,
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 16,
          }}>
          {footer}
        </View>
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
                fontSize: 11,
                letterSpacing: 2,
              }}>
              {eyebrow}
            </Text>
            <Text
              style={{
                marginTop: 12,
                color: palette.textPrimary,
                fontFamily: 'SpaceMono',
                fontSize: 30,
                lineHeight: 38,
              }}>
              {title}
            </Text>
            <Text
              style={{
                marginTop: 10,
                maxWidth: 330,
                color: palette.textSecondary,
                fontFamily: 'SpaceMono',
                fontSize: 13,
                lineHeight: 22,
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
        marginBottom: 16,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: palette.border,
        backgroundColor: palette.surface,
        padding: 16,
      }}>
      <Text
        style={{
          color: palette.primary,
          fontFamily: 'SpaceMono',
          fontSize: 11,
          letterSpacing: 2,
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
        {subtitle}
      </Text>
      <View style={{ marginTop: 16 }}>{children}</View>
    </View>
  );
}

export function PillButton({ label, active = false, onPress, disabled = false }: PillButtonProps) {
  const palette = useAppPalette();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? palette.primary : palette.border,
        backgroundColor: active ? palette.primary : palette.surfaceRaised,
        opacity: disabled ? 0.48 : 1,
        paddingHorizontal: 12,
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
  const isSolid = tone === 'solid';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        minWidth: 116,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: isSolid ? palette.primary : palette.border,
        backgroundColor: isSolid ? palette.primary : palette.surfaceRaised,
        opacity: disabled ? 0.48 : 1,
        paddingHorizontal: 16,
        paddingVertical: 13,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {icon ? <FontAwesome name={icon} size={12} color={isSolid ? palette.primaryText : palette.textPrimary} /> : null}
        <Text
          style={{
            color: isSolid ? palette.primaryText : palette.textPrimary,
            textAlign: 'center',
            fontFamily: 'SpaceMono',
            fontSize: 11,
            letterSpacing: 1.5,
          }}>
          {label}
        </Text>
      </View>
    </Pressable>
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

  return (
    <Pressable
      accessibilityLabel={t('openMenu')}
      onPress={onPress}
      style={{
        marginTop: 2,
        height: 44,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: palette.primary,
        backgroundColor: palette.primary,
      }}>
      <FontAwesome name="bars" size={15} color={palette.primaryText} />
    </Pressable>
  );
}