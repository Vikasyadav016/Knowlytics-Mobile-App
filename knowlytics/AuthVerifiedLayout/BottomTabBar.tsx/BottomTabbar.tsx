import { useAuth } from '@/auth/useAuth';
import { AdminPanelIcon, HomeIcon, MessagesIcon, ProfileIcon } from '@/commonComponents/SvgIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const ICONS_MAP: Record<string, React.FC<{ color: string }>> = {
  Home: HomeIcon,
  Messages: MessagesIcon,
  Profile: ProfileIcon,
  AdminPanel: AdminPanelIcon,
};

export default function BottomTabBar({ activeTab, onTabPress }: BottomTabBarProps) {
  const { userRole } = useAuth();

  const tabsForRole: Record<string, string[]> = {
    admin: ['Home', 'Messages', 'Profile', 'AdminPanel'],
    user: ['Home', 'Messages', 'Profile'],
    guest: ['Home', 'Profile'],
  };

  const tabs = tabsForRole[userRole ?? 'guest'] ?? ['Home'];

  return (
    <LinearGradient
      colors={['#a8310aff', '#105a06ff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {tabs.map((tabName) => {
          const isActive = tabName === activeTab;
          const Icon = ICONS_MAP[tabName];
          const color = isActive ? '#34C759' : '#fff'; // Light color for contrast

          return (
            <Pressable
              key={tabName}
              onPress={() => onTabPress(tabName)}
              style={({ pressed }) => [
                styles.tab,
                isActive && styles.activeTab,
                pressed && styles.pressedTab,
              ]}
              android_ripple={{ color: '#a6f1b8' }}
            >
              <Icon color={color} />
              <Text style={[styles.tabText, isActive && styles.activeTabText, { color }]}>
                {tabName}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 60, // Match your bottomTabHeight
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    height: '100%', // Make sure it fills the gradient
    backgroundColor: 'transparent', // Important: let gradient show through
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: '#34C759',
  },
  activeTabText: {
    color: '#34C759',
  },
  pressedTab: {
    opacity: 0.7,
  },
});

