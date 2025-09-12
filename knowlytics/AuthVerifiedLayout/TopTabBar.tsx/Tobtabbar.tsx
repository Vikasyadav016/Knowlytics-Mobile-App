import { useAuth } from '@/auth/useAuth';
import { HorizontalMenuIcon, OverviewIcon, SettingsIcon, StatsIcon } from '@/commonComponents/SvgIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface TopTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const ICONS_MAP: Record<string, React.FC<{ color: string }>> = {
  Overview: OverviewIcon,
  Stats: StatsIcon,
  Settings: SettingsIcon,
  Dashboard: HorizontalMenuIcon
};

export default function TopTabBar({ activeTab, onTabPress }: TopTabBarProps) {
  const { userRole } = useAuth();

  const tabsForRole: Record<string, string[]> = {
    admin: ['Dashboard','Overview', 'Stats', 'Settings'],
    user: ['Dashboard','Overview', 'Stats'],
    guest: ['Dashboard','Overview', 'Stats', 'Settings'],
  };

  const tabs = tabsForRole[userRole ?? 'guest'] ?? ['Overview'];

  return (
    <LinearGradient
      colors={['#105a06ff', '#a8310aff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {tabs.map((tabName) => {
          const isActive = tabName === activeTab;
          const Icon = ICONS_MAP[tabName];
          const color = isActive ? '#34C759' : '#fff';

          return (
            <Pressable
              key={tabName}
              onPress={() => onTabPress(tabName)}
              style={({ pressed }) => [
                styles.tab,
                isActive && styles.activeTab,
                pressed && styles.pressedTab,
              ]}
              android_ripple={{ color: '#b3f9d1' }}
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
    height: 50,
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    height: '100%',
    backgroundColor: 'transparent',
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
    borderBottomWidth: 3,
    borderBottomColor: '#34C759',
  },
  activeTabText: {
    color: '#34C759',
  },
  pressedTab: {
    opacity: 0.7,
  },
});

