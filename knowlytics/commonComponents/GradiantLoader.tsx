import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, View } from "react-native";

export default function GradientLoader() {
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: "transparent",
      }}
    >
      <LinearGradient
        colors={["#a8310aff", "#105a06ff"]}
        style={{ padding: 15, borderRadius: 50 }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    </View>
  );
}
