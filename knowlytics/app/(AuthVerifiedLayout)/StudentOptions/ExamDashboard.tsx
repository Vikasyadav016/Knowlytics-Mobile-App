import CommonDashboardLayout from "@/app/(CommonDashboardLayout)/CommonDashboardLayout";
import {
  BackArrowIcon,
  DashboardIcon,
  ExamDashboardIcon,
  FeedbackIcon,
  LogoutIcon,
  ProfileIcon,
  ResultsIcon,
  SettingsIcon,
} from "@/commonComponents/SvgIcons";
import React from "react";
import { View, Text } from "react-native";

const menuItems = [
  { key: "back", label: "Go Back" },
  { key: "dashboard", label: "Dashboard" },
  { key: "exams", label: "Exams" },
  { key: "results", label: "Results" },
  { key: "feedback", label: "Feedback" },
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
  { key: "logout", label: "Logout" },
];

// Wrap each icon to accept fill, width, height, and pass fill as color
const wrapIcon = (IconComponent: React.FC<{ color?: string }>) => {
  return ({
    fill,
    width = 28,
    height = 28,
  }: {
    fill: string;
    width?: number;
    height?: number;
  }) => <IconComponent color={fill} />;
};

const iconComponents = {
  back: wrapIcon(BackArrowIcon),
  dashboard: wrapIcon(DashboardIcon),
  exams: wrapIcon(ExamDashboardIcon),
  results: wrapIcon(ResultsIcon),
  feedback: wrapIcon(FeedbackIcon),
  profile: wrapIcon(ProfileIcon),
  settings: wrapIcon(SettingsIcon),
  logout: wrapIcon(LogoutIcon),
};

const screenComponents = {
  dashboard: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Exam Dashboard</Text>
      <Text>Welcome to your exam overview.</Text>
    </View>
  ),
  exams: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Exams</Text>
      <Text>List of upcoming and past exams.</Text>
    </View>
  ),
  results: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Results</Text>
      <Text>Check your exam results here.</Text>
    </View>
  ),
  feedback: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Feedback</Text>
      <Text>Provide or review feedback.</Text>
    </View>
  ),
  profile: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Profile</Text>
      <Text>Manage your profile settings.</Text>
    </View>
  ),
  settings: () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Settings</Text>
      <Text>Adjust app preferences.</Text>
    </View>
  ),
};

export default function ExamDashboard() {
  return (
    <CommonDashboardLayout
      menuItems={menuItems}
      iconComponents={iconComponents}
      screenComponents={screenComponents}
      onBack={() => {
        console.log("Back pressed from ExamDashboard");
        // Implement your custom back logic here
      }}
    />
  );
}
