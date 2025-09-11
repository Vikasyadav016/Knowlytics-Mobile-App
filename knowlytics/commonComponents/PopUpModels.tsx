import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type ModalPosition = "center" | "top" | "bottom";
type Dimension = number | `${number}%`; // Only number or percentage string

interface DynamicModalProps {
  visible: boolean;
  onClose: () => void;
  position?: ModalPosition;
  title?: string;
  message?: string;
  width?: Dimension;
  height?: Dimension;
}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    elevation: 6,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 14,
    zIndex: 10,
  },
  closeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#888",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

const DynamicModal: React.FC<DynamicModalProps> = ({
  visible,
  onClose,
  position = "center",
  title = "Notification",
  message = "This is a message.",
  width = "80%",
  height = "30%",
}) => {
  const getPositionStyle = (): ViewStyle => {
    switch (position) {
      case "top":
        return { justifyContent: "flex-start", paddingTop: 60 };
      case "bottom":
        return { justifyContent: "flex-end", paddingBottom: 60 };
      default:
        return { justifyContent: "center" };
    }
  };

  return (
    <Modal
      isVisible={visible}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      backdropOpacity={0.5}
      onBackdropPress={onClose}
      useNativeDriver
      style={[styles.modalContainer, getPositionStyle()]}
    >
      <View style={[styles.modalContent, { width, height }]}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>×</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Modal>
  );
};

export default DynamicModal;



// use like this

{/* <DynamicModal
  visible={visible}
  onClose={() => setVisible(false)}
  title="Success!"
  message="You have been registered successfully."
  position="bottom"
  width="90%"
  height={250}
/> */}

