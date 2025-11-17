import AppStatusBar from "@/src/layout/appStatusBar";
import { SplashScreenProps } from "@/src/types/types";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("bills-screen");
    }, 3000);
  }, [navigation]);
  return (
    <SafeAreaProvider>
      <AppStatusBar backgroundColor={styles.container.backgroundColor} />
      <SafeAreaView style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/splitpal-logo.png")}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffffff",
  },
  logo: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
