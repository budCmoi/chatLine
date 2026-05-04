import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenContainerProps extends PropsWithChildren {
  footer?: ReactNode;
}

interface ScreenHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
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
}

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  tone?: 'solid' | 'ghost';
}

interface DataRowProps {
  label: string;
  value: string;
}

export function ScreenContainer({ children, footer }: ScreenContainerProps) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-5 pt-3">{children}</View>
      {footer ? <View className="border-t border-white/10 bg-black px-5 pb-4 pt-4">{footer}</View> : null}
    </SafeAreaView>
  );
}

export function ScreenHeader({ eyebrow, title, subtitle, rightSlot }: ScreenHeaderProps) {
  return (
    <View className="mb-6 flex-row items-start justify-between gap-4">
      <View className="flex-1">
        <Text className="font-mono text-[11px] tracking-[2px] text-white/45">{eyebrow}</Text>
        <Text className="mt-3 font-mono text-[30px] leading-[36px] text-white">{title}</Text>
        <Text className="mt-3 max-w-[320px] font-mono text-[13px] leading-6 text-white/65">{subtitle}</Text>
      </View>
      {rightSlot}
    </View>
  );
}

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <View className="mb-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <Text className="font-mono text-[11px] tracking-[2px] text-white/45">{title}</Text>
      <Text className="mt-2 font-mono text-[13px] leading-6 text-white/72">{subtitle}</Text>
      <View className="mt-4">{children}</View>
    </View>
  );
}

export function PillButton({ label, active = false, onPress }: PillButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-3 py-2 ${
        active ? 'border-white bg-white' : 'border-white/10 bg-white/[0.04]'
      }`}>
      <Text className={`font-mono text-[11px] tracking-[1.4px] ${active ? 'text-black' : 'text-white/70'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export function PrimaryButton({ label, onPress, tone = 'solid' }: PrimaryButtonProps) {
  const isSolid = tone === 'solid';

  return (
    <Pressable
      onPress={onPress}
      className={`min-w-[104px] rounded-full border px-4 py-3 ${
        isSolid ? 'border-white bg-white' : 'border-white/10 bg-white/[0.04]'
      }`}>
      <Text className={`text-center font-mono text-[11px] tracking-[1.8px] ${isSolid ? 'text-black' : 'text-white'}`}>
        {label}
      </Text>
    </Pressable>
  );
}

export function DataRow({ label, value }: DataRowProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-white/10 py-3 last:border-b-0">
      <Text className="font-mono text-[11px] tracking-[1.4px] text-white/45">{label}</Text>
      <Text className="font-mono text-[12px] text-white">{value}</Text>
    </View>
  );
}