import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";

const SIDEBAR_WIDTH = 80;

interface MenuItem {
  key: string;
  label: string;
}

interface CommonDashboardLayoutProps {
  menuItems: MenuItem[];
  iconComponents: Record<string, React.FC<{ fill: string; width?: number; height?: number }>>;
  screenComponents: Record<string, React.FC>;
  onBack?: () => void;
}

export default function CommonDashboardLayout({
  menuItems,
  iconComponents,
  screenComponents,
  onBack,
}: CommonDashboardLayoutProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(menuItems[0]?.key ?? "");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  // Use useRef to keep animated values stable across renders
  const scaleAnim = useRef<Record<string, Animated.Value>>({}).current;

  // Initialize animated values on first render
  if (Object.keys(scaleAnim).length === 0) {
    menuItems.forEach(({ key }) => {
      scaleAnim[key] = new Animated.Value(1);
    });
  }

  const animateScale = (key: string, toValue: number) => {
    Animated.spring(scaleAnim[key], {
      toValue,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (selected === "back") {
      if (onBack) {
        onBack();
      } else {
        router.push("/(AuthVerifiedLayout)/VerifiedAuthMainLayout");
      }
    }
  }, [selected]);

  const SelectedScreen = screenComponents[selected] ?? (() => (
    <View style={styles.content}>
      <Text>Screen "{selected}" not found.</Text>
    </View>
  ));

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
            if (!IconComponent) {
              console.warn(`No icon component found for key: "${key}"`);
              return null;
            }

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
                  style={{ transform: [{ scale: scaleAnim[key]}] }}
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

      <View style={styles.contentWrapper}>
        <SelectedScreen />
      </View>
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
