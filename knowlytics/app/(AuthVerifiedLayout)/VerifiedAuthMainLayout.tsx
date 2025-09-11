import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Overview from "@/TabBarTabsPages/Overview";
import Stats from "@/TabBarTabsPages/Stats";
import TopTabBar from "@/AuthVerifiedLayout/TopTabBar.tsx/Tobtabbar";
import BottomTabBar from "@/AuthVerifiedLayout/BottomTabBar.tsx/BottomTabbar";

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
});

const CONTENT_COMPONENTS: Record<string, React.ComponentType> = {
  Overview,
  Stats,
};

export default function VerifiedAuthMainLayout() {
  const [activeTab, setActiveTab] = React.useState<{
    name: string;
    bar: "top" | "bottom";
  }>({
    name: "Overview",
    bar: "top",
  });

  const onTopTabPress = (tabName: string) =>
    setActiveTab({ name: tabName, bar: "top" });
  const onBottomTabPress = (tabName: string) =>
    setActiveTab({ name: tabName, bar: "bottom" });

  const ActiveComponent = CONTENT_COMPONENTS[activeTab.name];

  return (
    <LinearGradient
      colors={["#a8310aff", "#105a06ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <TopTabBar
          activeTab={activeTab.bar === "top" ? activeTab.name : ""}
          onTabPress={onTopTabPress}
        />
        <View style={styles.content}>{ActiveComponent ? <ActiveComponent /> : null}</View>
        <BottomTabBar
          activeTab={activeTab.bar === "bottom" ? activeTab.name : ""}
          onTabPress={onBottomTabPress}
        />
      </View>
    </LinearGradient>
  );
}

