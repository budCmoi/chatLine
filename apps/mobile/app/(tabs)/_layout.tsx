import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={18} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: '#000000',
        },
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: 'rgba(255,255,255,0.12)',
          height: 82,
          paddingTop: 10,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontFamily: 'SpaceMono',
          fontSize: 10,
          letterSpacing: 1.5,
          marginTop: 6,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.36)',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'CHAT',
          tabBarIcon: ({ color }) => <TabBarIcon name="comments-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'STUDIO',
          tabBarIcon: ({ color }) => <TabBarIcon name="magic" color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'ARCHIVE',
          tabBarIcon: ({ color }) => <TabBarIcon name="folder-open-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
