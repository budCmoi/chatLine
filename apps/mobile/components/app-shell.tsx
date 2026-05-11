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
  const progress = useRef(new Animated.Value(0)).current;
  const useNativeDriver = Platform.OS !== 'web';

  const activeConversations = useMemo(
    () =>
      [...conversations]
        .filter((conversation) => !conversation.archived)
        .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()),
    [conversations],
  );

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 10, paddingBottom: 18 }}>
              {/* Drawer header */}
              <View
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  padding: 16,
                }}>
                <Text
                  style={{
                    color: palette.primary,
                    fontFamily: 'SpaceMono',
                    fontSize: 11,
                    letterSpacing: 2.5,
                  }}>
                  {t('appName').toUpperCase()}
                </Text>
                <Text
                  style={{
                    marginTop: 8,
                    color: palette.textPrimary,
                    fontFamily: 'SpaceMono',
                    fontSize: 17,
                    lineHeight: 26,
                  }}>
                  {t('drawerTitle')}
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    color: palette.textMuted,
                    fontFamily: 'SpaceMono',
                    fontSize: 11,
                    lineHeight: 18,
                  }}>
                  {t('drawerSubtitle')}
                </Text>

                <View style={{ marginTop: 14, flexDirection: 'row', gap: 10 }}>
                  <DrawerActionButton
                    icon="home"
                    label={t('drawerHome')}
                    onPress={() => router.push('/(tabs)')}
                  />
                  <DrawerActionButton
                    icon="plus"
                    label={t('drawerNewChat')}
                    onPress={() => {
                      startFreshChat();
                      router.push('/(tabs)/chat');
                    }}
                  />
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: 18, paddingBottom: 18 }}>
                {activeConversations.length > 0 ? (
                  activeConversations.map((conversation) => {
                    const active = conversation.id === activeConversationId && pathname === '/chat';

                    return (
                      <Pressable
                        key={conversation.id}
                        onPress={() => {
                          openConversation(conversation.id);
                          router.push('/(tabs)/chat');
                        }}
                        style={{
                          marginBottom: 10,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: active ? palette.primary : 'rgba(255,255,255,0.07)',
                          backgroundColor: active ? 'rgba(245,208,66,0.07)' : 'rgba(255,255,255,0.04)',
                          padding: 14,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              flex: 1,
                              color: palette.textPrimary,
                              fontFamily: 'SpaceMono',
                              fontSize: 12,
                            }}>
                            {conversation.title}
                          </Text>
                          <Text
                            style={{
                              color: palette.primary,
                              fontFamily: 'SpaceMono',
                              fontSize: 10,
                            }}>
                            {formatConversationDate(locale, conversation.updatedAt)}
                          </Text>
                        </View>
                        <Text
                          numberOfLines={2}
                          style={{
                            marginTop: 8,
                            color: palette.textMuted,
                            fontFamily: 'SpaceMono',
                            fontSize: 11,
                            lineHeight: 18,
                          }}>
                          {conversation.preview}
                        </Text>
                      </Pressable>
                    );
                  })
                ) : (
                  <View
                    style={{
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.07)',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                      padding: 16,
                    }}>
                    <Text
                      style={{
                        color: palette.textMuted,
                        fontFamily: 'SpaceMono',
                        fontSize: 12,
                        lineHeight: 20,
                      }}>
                      {t('drawerEmpty')}
                    </Text>
                  </View>
                )}
              </ScrollView>

              <View style={{ alignItems: 'flex-end' }}>
                <Pressable
                  onPress={() => router.push('/(tabs)/profile')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.10)',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}>
                  <FontAwesome name="user-o" size={14} color={palette.textSecondary} />
                  <Text
                    style={{
                      color: palette.textSecondary,
                      fontFamily: 'SpaceMono',
                      fontSize: 11,
                      letterSpacing: 1.2,
                    }}>
                    {t('drawerProfile').toUpperCase()}
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

function DrawerActionButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  onPress: () => void;
}) {
  const palette = useAppPalette();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}>
      <FontAwesome name={icon} size={12} color={palette.primary} />
      <Text
        style={{
          color: palette.textPrimary,
          fontFamily: 'SpaceMono',
          fontSize: 11,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
