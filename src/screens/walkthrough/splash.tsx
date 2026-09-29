import { useAuth } from "@/src/hooks/useAuth";
import AppStatusBar from "@/src/layout/AppStatusBar";
import { useRouter } from "expo-router";
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

const SplashScreen = () => {
  const { user, appUser, isLoadingUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }

    const timer = setTimeout(() => {
      if (user && appUser) {
        router.replace("/dashboard");
      } else {
        router.replace("/walkthrough/bills");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, appUser, isLoadingUser, router]);

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
