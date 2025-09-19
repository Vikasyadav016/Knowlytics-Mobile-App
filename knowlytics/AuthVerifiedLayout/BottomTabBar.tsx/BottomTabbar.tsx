import { useAuth } from "@/auth/useAuth";
import {
  AdminPanelIcon,
  DefaultManIcon,
  ExamDashboardIcon,
  FeedbackIcon,
  HomeIcon,
  MessagesIcon,
  ProfileIcon,
  ResultsIcon,
  TakingExamsIcon,
} from "@/commonComponents/SvgIcons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const ICONS_MAP: Record<string, React.FC<{ color: string }>> = {
  Home: HomeIcon,
  Messages: MessagesIcon,
  Profile: ProfileIcon,
  AdminPanel: AdminPanelIcon,
  ExamDashboard: ExamDashboardIcon,
  TakingExams: TakingExamsIcon,
  Results: ResultsIcon,
  Feedback: FeedbackIcon,
};

const TAB_LABELS: Record<string, string> = {
  Home: "Home",
  Messages: "Messages",
  Profile: "Profile",
  AdminPanel: "Admin Panel",
  ExamDashboard: "ExamHub", // <--- space added here
  TakingExams: "Taking Exams",
  Results: "Results",
  Feedback: "Feedback",
};

export default function BottomTabBar({
  activeTab,
  onTabPress,
}: BottomTabBarProps) {
  const { userRole } = useAuth();
  const [user] = useState<any>();
  const tabsForRole: Record<string, string[]> = {
    admin: ["Home", "Messages", "Profile", "AdminPanel"],
    user: ["Home", "Messages", "Profile"],
    student: ["Profile", "ExamDashboard", "TakingExams", "Results", "Feedback"],
  };

  const tabs = tabsForRole[userRole ?? "student"] ?? ["Home"];

  return (
    <LinearGradient
      colors={["#a8310aff", "#105a06ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {tabs.map((tabName) => {
          const isActive = tabName === activeTab;
          const Icon = ICONS_MAP[tabName];
          const color = isActive ? "#34C759" : "#fff";

          return (
            <Pressable
              key={tabName}
              onPress={() => onTabPress(tabName)}
              style={({ pressed }) => [
                styles.tab,
                isActive && styles.activeTab,
                pressed && styles.pressedTab,
              ]}
              android_ripple={{ color: "#a6f1b8" }}
            >
              {tabName === "Profile" ? (
                user?.profileImageUrl ? (
                  <Image
                    source={{ uri: user.profileImageUrl }}
                    style={[
                      styles.profileImage,
                      { borderColor: isActive ? "#34C759" : "transparent" },
                    ]}
                  />
                ) : (
                  <DefaultManIcon color={color} />
                )
              ) : (
                <Icon color={color} />
              )}

              <Text
                style={[
                  styles.tabText,
                  isActive && styles.activeTabText,
                  { color },
                ]}
              >
                {TAB_LABELS[tabName] || tabName}
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
    height: 60,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    height: "100%",
    backgroundColor: "transparent",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  activeTab: {
    borderTopWidth: 3,
    borderTopColor: "#34C759",
  },
  activeTabText: {
    color: "#34C759",
  },
  pressedTab: {
    opacity: 0.7,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
});
