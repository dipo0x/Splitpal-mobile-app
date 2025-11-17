
import { useLoadFonts } from "@/src/utils/font.utils";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useLoadFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}