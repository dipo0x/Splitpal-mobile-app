import { verifyFirebase } from "@/src/lib/firebase.lib";
import { useLoadFonts } from "@/src/utils/font.utils";
import { preloadImages } from "@/src/utils/preloadAssets";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  // Removed navigation redirect from layout — routing is handled by React Navigation
  // Keep this component as a simple passthrough for now (reserved for UI guard)
  return <>{children}</>;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useLoadFonts();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Keep splash visible while we load fonts and images
  useEffect(() => {
    let mounted = true;
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await preloadImages();
        if (mounted) setAssetsLoaded(true);
      } catch (e) {
        console.log(e);
        if (mounted) setAssetsLoaded(true);
      }
    }
    prepare();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    async function hideIfReady() {
      if ((fontsLoaded || fontError) && assetsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideIfReady();
  }, [fontsLoaded, fontError, assetsLoaded]);

  useEffect(() => {
    const verify = async () => {
      const verified = await verifyFirebase();
      if (verified) {
        console.log("firebase connection is up and running");
      } else {
        throw new Error("firebase connection failed");
      }
    };
    verify();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <RouteGuard>
      <Stack screenOptions={{ headerShown: false }} />
    </RouteGuard>
  );
}
