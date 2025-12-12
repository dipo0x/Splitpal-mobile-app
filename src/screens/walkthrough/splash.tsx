import AppStatusBar from "@/src/layout/appStatusBar";
import { useAuth } from "@/src/lib/authcontext.lib";
import { SplashScreenProps } from "@/src/types/types";
import { CommonActions } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  const { user, appUser, isLoadingUser } = useAuth();

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }

    const timer = setTimeout(() => {
      if (user && appUser) {
        navigation.getParent()?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "dashboard-stack" }],
          })
        );
      } else {
        navigation.replace("bills-screen");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, appUser, isLoadingUser, navigation]);

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
