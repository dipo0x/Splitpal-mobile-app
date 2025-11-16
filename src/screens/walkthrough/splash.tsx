import { View, StyleSheet, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SplashScreenProps } from "@/src/types/types";
import AppStatusBar from "@/src/layout/appStatusBar";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("walkthrough-screen");
  //   }, 2000);
  // }, [navigation]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#73e1ffff"
          barStyle={"default"}
          showHideTransition={"none"}
          hidden={true}
        />
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
    justifyContent: 'center',
    backgroundColor: '#00ccffff',
  },
  logo: {
    backgroundColor: "white",
 
    justifyContent: "center",
    alignItems: "center",
  },
});
