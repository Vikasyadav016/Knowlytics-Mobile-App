import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";


export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <LinearGradient
        colors={["#a8310aff", "#105a06ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />
      <View style={styles.content}>
         <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          Welcome to Knowlytics!
        </Text> 
       
        <Text style={styles.subtitle}>
          Your are on journey of
          <Text style={styles.know}> Knowledge</Text> and{" "}
          <Text style={styles.analitic}>Analytics</Text>.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(AuthUnVerifiedLayout)/MainAuthPage")}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "#0008",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  know: {
    fontFamily: "areal",
    fontSize: 35,
    color: "#51E83D",
    fontWeight: "bold",
  },
  analitic: {
    fontFamily: "areal",
    fontSize: 35,
    color: "#FEBE53",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "#eee",
    textAlign: "center",
    textShadowColor: "#0008",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  footer: {
    paddingBottom: 40,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a8310aff",
  },
});