import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Feather";

interface AddBillModalProps {
  visible: boolean;
  onClose: () => void;
  onScanBill: () => void;
  onAddManually: () => void;
}

export const AddBillModal: React.FC<AddBillModalProps> = ({
  visible,
  onClose,
  onScanBill,
  onAddManually,
}) => {
  const [showModal, setShowModal] = useState(false);
  const translateY = useSharedValue(500);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      translateY.value = withTiming(0, { duration: 400 });
      backdropOpacity.value = withTiming(1, { duration: 400 });
    } else {
      translateY.value = withTiming(500, { duration: 400 });
      backdropOpacity.value = withTiming(0, { duration: 400 });

      const timer = setTimeout(() => {
        setShowModal(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [visible, backdropOpacity, translateY]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!showModal) return null;

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={onScanBill}
              activeOpacity={0.7}
            >
              <Icon
                name="camera"
                size={22}
                color="#fff"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Scan a bill</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={onAddManually}
              activeOpacity={0.7}
            >
              <Icon
                name="edit-3"
                size={22}
                color="#fff"
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Add bill manually</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View style={modalStyle}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="x" size={24} color="rgba(255, 255, 255, 1)" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    backgroundColor: "transparent",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingBottom: 50,
    paddingHorizontal: 24,
    minHeight: 280,
  },
  closeButton: {
    position: "absolute",
    bottom: 29,
    left: "50%",
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(45, 45, 45, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionsContainer: {
    gap: 20,
  },
  optionButton: {
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2D2D2D",
    paddingVertical: 22,
    paddingHorizontal: 28,
    borderRadius: 40,
  },
  optionIcon: {
    marginRight: 20,
  },
  optionText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Satoshi-Medium",
  },
});
