import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, usePathname, useRouter } from 'expo-router';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatConversationDate, useI18n } from '../lib/localization';
import { useAppPalette } from '../lib/theme-palette';
import { useAssistantStore } from '../stores/assistant-store';

interface DrawerControls {
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerControls>({
  openDrawer: () => undefined,
  closeDrawer: () => undefined,
});

export function useDrawerControls(): DrawerControls {
  return useContext(DrawerContext);
}

// Regroup conversations by date bucket
function groupConversations(convos: { id: string; title: string; preview: string; updatedAt: string | Date }[]) {
  const now = new Date();
  const today: typeof convos = [];
  const yesterday: typeof convos = [];
  const older: typeof convos = [];

  for (const c of convos) {
    const d = new Date(c.updatedAt);
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) today.push(c);
    else if (diffDays < 2) yesterday.push(c);
    else older.push(c);
  }
  return { today, yesterday, older };
}

export function AppShell() {
  const router = useRouter();
  const pathname = usePathname();
  const palette = useAppPalette();
  const { locale, t } = useI18n();
  const conversations = useAssistantStore((state) => state.conversations);
  const activeConversationId = useAssistantStore((state) => state.activeConversationId);
  const openConversation = useAssistantStore((state) => state.openConversation);
  const startFreshChat = useAssistantStore((state) => state.startFreshChat);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const progress = useRef(new Animated.Value(0)).current;
  const useNativeDriver = Platform.OS !== 'web';

  const activeConversations = useMemo(
    () =>
      [...conversations]
        .filter((conversation) => !conversation.archived)
        .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()),
    [conversations],
  );

  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return activeConversations;
    const q = searchQuery.toLowerCase();
    return activeConversations.filter((c) => c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q));
  }, [activeConversations, searchQuery]);

  const groups = useMemo(() => groupConversations(filteredConversations), [filteredConversations]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: drawerOpen ? 1 : 0,
      duration: 220,
      useNativeDriver,
    }).start();
  }, [drawerOpen, progress, useNativeDriver]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-320, 0],
  });

  const overlayOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <DrawerContext.Provider
      value={{
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}>
      <View style={{ flex: 1, backgroundColor: palette.background }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: palette.background },
            animation: 'fade',
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="chat" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="premium" />
          <Stack.Screen name="archived" />
        </Stack>

        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: overlayOpacity,
              backgroundColor: palette.overlay,
              pointerEvents: drawerOpen ? 'auto' : 'none',
            },
          ]}>
          <Pressable style={{ flex: 1 }} onPress={() => setDrawerOpen(false)} />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 304,
            transform: [{ translateX }],
          }}>
          <SafeAreaView style={{ flex: 1, backgroundColor: '#0B0B0B' }}>
            <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 12, paddingBottom: 18 }}>

              {/* â”€â”€â”€ Drawer header â”€â”€ */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                {/* Logo */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 0 }}>
                  <Text style={{ color: '#F5F5F5', fontSize: 20, fontWeight: '700' }}>Chat</Text>
                  <Text style={{ color: '#F6D365', fontSize: 20, fontWeight: '700' }}>Line</Text>
                </View>
                {/* Close + New chat */}
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Pressable
                    onPress={() => {
                      startFreshChat();
                      router.push('/(tabs)/chat');
                    }}
                    style={{
                      height: 36, width: 36, alignItems: 'center', justifyContent: 'center',
                      borderRadius: 10, borderWidth: 1, borderColor: 'rgba(246,211,101,0.25)',
                      backgroundColor: 'rgba(246,211,101,0.08)',
                    }}>
                    <FontAwesome name="plus" size={12} color="#F6D365" />
                  </Pressable>
                  <Pressable
                    onPress={() => setDrawerOpen(false)}
                    style={{
                      height: 36, width: 36, alignItems: 'center', justifyContent: 'center',
                      borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                    }}>
                    <FontAwesome name="times" size={14} color="#F5F5F5" />
                  </Pressable>
                </View>
              </View>

              {/* ─── Search ── */}
              <View style={{ marginBottom: 14, flexDirection: 'row', alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.04)', paddingHorizontal: 12, paddingVertical: 8, gap: 8 }}>
                <FontAwesome name="search" size={11} color="rgba(245,245,245,0.30)" />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder={locale === 'fr' ? 'Rechercher…' : 'Search…'}
                  placeholderTextColor="rgba(245,245,245,0.25)"
                  style={{ flex: 1, color: '#F5F5F5', fontSize: 13, paddingVertical: 0 }}
                />
                {searchQuery.length > 0 && (
                  <Pressable onPress={() => setSearchQuery('')}>
                    <FontAwesome name="times-circle" size={13} color="rgba(245,245,245,0.30)" />
                  </Pressable>
                )}
              </View>

              {/* ─── Conversations grouped ── */}
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
                {filteredConversations.length === 0 ? (
                  <View style={{ borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 16 }}>
                    <Text style={{ color: palette.textMuted, fontSize: 13, lineHeight: 20 }}>
                      {searchQuery ? (locale === 'fr' ? 'Aucun résultat' : 'No results') : t('drawerEmpty')}
                    </Text>
                  </View>
                ) : (
                  <>
                    <ConvoGroup
                      label={locale === 'fr' ? "Aujourd'hui" : 'Today'}
                      items={groups.today}
                      activeId={activeConversationId}
                      pathname={pathname}
                      palette={palette}
                      onSelect={(id) => { openConversation(id); router.push('/(tabs)/chat'); }}
                    />
                    <ConvoGroup
                      label={locale === 'fr' ? 'Hier' : 'Yesterday'}
                      items={groups.yesterday}
                      activeId={activeConversationId}
                      pathname={pathname}
                      palette={palette}
                      onSelect={(id) => { openConversation(id); router.push('/(tabs)/chat'); }}
                    />
                    <ConvoGroup
                      label={locale === 'fr' ? 'Plus ancien' : 'Older'}
                      items={groups.older}
                      activeId={activeConversationId}
                      pathname={pathname}
                      palette={palette}
                      onSelect={(id) => { openConversation(id); router.push('/(tabs)/chat'); }}
                    />
                  </>
                )}
              </ScrollView>

              {/* â”€â”€â”€ Footer â”€â”€ */}
              <View style={{ gap: 10 }}>
                {/* Premium CTA */}
                <Pressable
                  onPress={() => router.push('/(tabs)/premium')}
                  style={{
                    borderRadius: 14, backgroundColor: '#F6D365',
                    paddingVertical: 13, alignItems: 'center',
                  }}>
                  <Text style={{ color: '#0B0B0B', fontSize: 13, fontWeight: '700' }}>
                    {locale === 'fr' ? '✦ Passer à Premium — 8,99€/mois' : '✦ Go Premium — €8.99/mo'}
                  </Text>
                </Pressable>
                {/* Profile row */}
                <Pressable
                  onPress={() => router.push('/(tabs)/profile')}
                  style={{
                    flexDirection: 'row', alignItems: 'center', gap: 10,
                    borderRadius: 14, borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.07)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    paddingHorizontal: 16, paddingVertical: 12,
                  }}>
                  <FontAwesome name="user-o" size={13} color={palette.textSecondary} />
                  <Text style={{ color: palette.textSecondary, fontSize: 13 }}>
                    {t('drawerProfile')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </DrawerContext.Provider>
  );
}

// â”€â”€â”€ Conversation group â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ConvoGroup({
  label, items, activeId, pathname, palette, onSelect,
}: {
  label: string;
  items: { id: string; title: string; preview: string; updatedAt: string | Date }[];
  activeId: string | null;
  pathname: string;
  palette: ReturnType<typeof useAppPalette>;
  onSelect: (id: string) => void;
}) {
  if (items.length === 0) return null;

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: palette.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1.5, marginBottom: 8 }}>
        {label.toUpperCase()}
      </Text>
      {items.map((conversation) => {
        const active = conversation.id === activeId && pathname === '/chat';
        return (
          <Pressable
            key={conversation.id}
            onPress={() => onSelect(conversation.id)}
            style={{
              marginBottom: 6,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: active ? 'rgba(246,211,101,0.30)' : 'rgba(255,255,255,0.07)',
              backgroundColor: active ? 'rgba(246,211,101,0.07)' : 'rgba(255,255,255,0.03)',
              paddingHorizontal: 14,
              paddingVertical: 11,
            }}>
            <Text numberOfLines={1} style={{ color: active ? '#F6D365' : palette.textPrimary, fontSize: 13, fontWeight: '500' }}>
              {conversation.title}
            </Text>
            <Text numberOfLines={1} style={{ marginTop: 4, color: palette.textMuted, fontSize: 12 }}>
              {conversation.preview}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}




