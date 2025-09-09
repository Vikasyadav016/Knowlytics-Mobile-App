import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Pressable,
  useWindowDimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function MainAuthPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const scaleLogin = useRef(new Animated.Value(1)).current;
  const scaleRegister = useRef(new Animated.Value(1)).current;

  const handlePressIn = (animRef: Animated.Value) => {
    Animated.spring(animRef, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (animRef: Animated.Value) => {
    Animated.spring(animRef, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        colors={["#a8310aff", "#105a06ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <AnimatedCard
        label="Login"
        animatedValue={scaleLogin}
        onPress={() => router.push("/(AuthPages)/login")}
        onPressIn={() => handlePressIn(scaleLogin)}
        onPressOut={() => handlePressOut(scaleLogin)}
      />

      <AnimatedCard
        label="Register"
        animatedValue={scaleRegister}
        onPress={() => router.push("/(AuthPages)/register")}
        onPressIn={() => handlePressIn(scaleRegister)}
        onPressOut={() => handlePressOut(scaleRegister)}
      />
    </View>
  );
}

function AnimatedCard({
  label,
  onPress,
  animatedValue,
  onPressIn,
  onPressOut,
}: {
  label: string;
  onPress: () => void;
  animatedValue: Animated.Value;
  onPressIn: () => void;
  onPressOut: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={({ hovered }) => [
        styles.cardWrapper,
        Platform.OS === "web" && hovered && { transform: [{ scale: 1.05 }] },
      ]}
    >
      <Animated.View
        style={[styles.card, { transform: [{ scale: animatedValue }] }]}
      >
        <Text style={styles.cardText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#f5f5f5",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    height: 60,
    justifyContent: "center",
    paddingLeft: 20,
    backgroundColor: "transparent",
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    left: 0,
    right: 0,
    zIndex: 10,
    color: '#333',
  },
  backText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  cardWrapper: {
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

