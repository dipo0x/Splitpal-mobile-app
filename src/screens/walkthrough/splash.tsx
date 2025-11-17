import { View, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { SplashScreenProps } from "@/src/types/types";
import AppStatusBar from "@/src/layout/appStatusBar";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("walkthrough-screen");
    }, 2000);
  }, [navigation]);
  return (
    <SafeAreaProvider>
      <AppStatusBar backgroundColor={styles.container.backgroundColor}/> 
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
    justifyContent: 'center',
    backgroundColor: '#ffffffff',
  },
  logo: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
