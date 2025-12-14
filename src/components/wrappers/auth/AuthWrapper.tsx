import React from "react";
import { ColorValue, DimensionValue, View, ViewProps } from "react-native";

import AppStatusBar from "@/src/layout/AppStatusBar";
import styles from "@/src/styles/walkthrough/walkthrough.style";
import { LinearGradient } from "expo-linear-gradient";

const gradientColors: readonly [ColorValue, ColorValue] = [
  "#F6F7FF",
  "#F6F7FF",
];

interface AuthWrapperProps extends ViewProps {
  children?: React.ReactNode;
  formWidth?: DimensionValue;
  formHeight?: DimensionValue;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  formWidth = "83%",
  formHeight = "50%",
  ...props
}) => {
  return (
    <View style={[styles.splashContainer]}>
      <AppStatusBar backgroundColor={gradientColors[0] as string} />
      <LinearGradient
        colors={gradientColors}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View
          style={[styles.formSection, { width: formWidth, height: formHeight }]}
          {...props}
        >
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

export default AuthWrapper;
