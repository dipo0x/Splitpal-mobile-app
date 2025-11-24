import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

interface Props {
  boxStyle: object;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function CustomCheckbox({ boxStyle, checked, onChange }: Props) {
  const scale = useRef(new Animated.Value(checked ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: checked ? 1 : 0,
      useNativeDriver: true,
      speed: 15,
      bounciness: 8,
    }).start();
  }, [checked, scale]);

  return (
    <View style={boxStyle}>
      <Pressable
        onPress={() => onChange(!checked)}
        style={[styles.box, checked && styles.checkedBox]}
      >
        <Animated.View
          style={[
            styles.tick,
            {
              transform: [{ scale }],
              opacity: scale,
            },
          ]}
        >
          {checked && <FontAwesome name="check" size={9} color="white" />}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: "#444",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  checkedBox: {
    borderColor: "rgba(123, 97, 255, 1)",
  },
  tick: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: "rgba(123, 97, 255, 1)",
    borderRadius: 5,
  },
});
