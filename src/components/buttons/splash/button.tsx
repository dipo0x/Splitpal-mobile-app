import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
type Props = {
  width: number;
  height: number;
  text: string;
  border?: boolean;

  onPress: () => void;
};
const SplashButton = (props: Props) => {
  const { width, height, text, border, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        width,
        height,
        borderRadius: 40,
        borderWidth: 0.8,
        ...(border ? styles.border : styles.nonBorder),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={[border ? styles.borderText : styles.nonBorderText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  border: {
    borderColor: "#5F63681A",
    backgroundColor: "white",
  },
  borderText: {
    color: "#5F6368",
  },
  nonBorder: {
    backgroundColor: "#7B61FF",
    borderColor: "#7B61FF",
  },
  nonBorderText: {
    color: "white",
  },
});

export default SplashButton;
