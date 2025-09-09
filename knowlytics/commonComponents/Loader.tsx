import React from "react";
import { View, StyleSheet, ActivityIndicator, Modal } from "react-native";

type LoaderProps = {
  visible: boolean;
};

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#eaf1f0ff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", // semi-transparent black shadow
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
