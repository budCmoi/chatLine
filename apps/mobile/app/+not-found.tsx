import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerStyle: { backgroundColor: '#000000' }, headerTintColor: '#FFFFFF' }} />
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="font-mono text-[12px] tracking-[2px] text-white/45">404</Text>
        <Text className="mt-4 text-center font-mono text-[24px] leading-9 text-white">Route not found.</Text>
        <Text className="mt-3 max-w-[260px] text-center font-mono text-[13px] leading-6 text-white/65">
          Return to the main assistant workspace.
        </Text>

        <Link href="/" className="mt-8 rounded-full border border-white bg-white px-5 py-3">
          <Text className="font-mono text-[11px] tracking-[1.8px] text-black">GO HOME</Text>
        </Link>
      </View>
    </>
  );
}
