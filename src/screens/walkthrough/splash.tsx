import ScreenView from "@/src/layout/appStatusBar";
import { SplashScreenProps } from "@/src/types/types";
import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    // Force status bar style immediately
    StatusBar.setBarStyle("dark-content", true);
    
    const timer = setTimeout(() => {
      navigation.navigate("walkthrough-screen");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenView style={styles.logo} backgroundColor="#FFFFFF">
      <Image
        source={require("@/assets/images/splitpal-logo.png")}
        style={{ width: 50, height: 50 }}
      />
    </ScreenView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});