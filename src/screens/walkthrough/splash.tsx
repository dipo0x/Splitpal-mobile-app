import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import ScreenView from "@/src/layout/screenView";
import { SplashScreenProps } from "@/src/types/types";
// import { HEIGHT } from "@/constants/size";

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("walkthrough-screen");
    }, 2000);
  }, [navigation]);
  return (
    <ScreenView>
     <View
      style={ styles.logo}
    >
       <Image source={require("@/assets/images/splitpal-logo.png")}
       style={{ width: 100, height: 100 }}
          />
    </View>
    </ScreenView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
