import {
  AboutIcon,
  BackArrowIcon,
  HelpIcon,
  HomeIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from "@/commonComponents/SvgIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";

const SIDEBAR_WIDTH = 80;
const menuItems = [
  { key: "back", label: "Go back" },
  { key: "home", label: "Home" },
  { key: "profile", label: "Profile" },
  { key: "settings", label: "Settings" },
  { key: "about", label: "Info" },
  { key: "help", label: "Help" },
  { key: "logout", label: "Logout" },
];

const iconComponents: any = {
  back: BackArrowIcon,
  home: HomeIcon,
  profile: ProfileIcon,
  settings: SettingsIcon,
  about: AboutIcon,
  help: HelpIcon,
  logout: LogoutIcon
};

function Home() {
  return (
    <View style={styles.content}>
      <Text>Home Screen</Text>
    </View>
  );
}
function Profile() {
  return (
    <View style={styles.content}>
      <Text>Profile Screen</Text>
    </View>
  );
}
function Settings() {
  return (
    <View style={styles.content}>
      <Text>Settings Screen</Text>
    </View>
  );
}
function About() {
  return (
    <View style={styles.content}>
      <Text>About Screen</Text>
    </View>
  );
}
function Help() {
  return (
    <View style={styles.content}>
      <Text>Help Screen</Text>
    </View>
  );
}

export default function Dashboard() {
   const router = useRouter();
  const [selected, setSelected] = useState("home");
  const [hoveredKey, setHoveredKey] = useState<any>(null);
  const [pressedKey, setPressedKey] = useState<any>(null);

  const scaleAnim: any = {};
  menuItems.forEach(({ key }) => {
    scaleAnim[key] = new Animated.Value(1);
  });

  const animateScale = (key: any, toValue: any) => {
    Animated.spring(scaleAnim[key], {
      toValue,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => {
    switch (selected) {
      case "home":
        return <Home />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      case "about":
        return <About />;
      case "help":
        return <Help />;
      default:
        return <Home />;
    }
  };

  useEffect(()=>{
    if(selected ==='back'){
      router.push("/(AuthVerifiedLayout)/VerifiedAuthMainLayout")
    }
  },[selected])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#105a06ff", "#a8310aff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.sidebar}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map(({ key, label }) => {
            const isSelected = selected === key;
            const isHovered = hoveredKey === key;
            const isPressed = pressedKey === key;

            const backgroundColor = isSelected
              ? "rgba(225, 113, 195, 0.3)"
              : isPressed
              ? "rgba(164, 14, 144, 0.2)"
              : isHovered
              ? "rgba(219, 219, 230, 0.1)"
              : "transparent";

            const iconColor =
              isSelected || isPressed || isHovered ? "#fff" : "#ddd";
            const labelColor = iconColor;

            const IconComponent = iconComponents[key];

            return (
              <Pressable
                key={key}
                onPress={() => setSelected(key)}
                onPressIn={() => {
                  setPressedKey(key);
                  animateScale(key, 1.1);
                }}
                onPressOut={() => {
                  setPressedKey(null);
                  animateScale(key, 1);
                }}
                onHoverIn={() => setHoveredKey(key)}
                onHoverOut={() => setHoveredKey(null)}
                style={({ pressed }) => [styles.menuItem, { backgroundColor }]}
              >
                <Animated.View
                  style={{ transform: [{ scale: scaleAnim[key] }] }}
                >
                  <View style={styles.iconWrapper}>
                    <IconComponent fill={iconColor} width={28} height={28} />
                  </View>
                  <Text
                    style={[
                      styles.label,
                      {
                        color: labelColor,
                        fontWeight: isSelected ? "bold" : "normal",
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </Animated.View>
              </Pressable>
            );
          })}
        </ScrollView>
      </LinearGradient>

      <View style={styles.contentWrapper}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    paddingTop: 50,
    paddingBottom: 50,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  scrollView: {
    alignItems: "center",
  },
  menuItem: {
    width: 60,
    height: 60,
    marginVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
