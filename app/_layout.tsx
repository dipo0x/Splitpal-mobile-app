import { verifyFirebase } from "@/src/lib/firebase.lib";
import { isSecureStorageAvailable } from "@/src/lib/securestorage.lib";
import { useLoadFonts } from "@/src/utils/font.util";
import { preloadImages } from "@/src/utils/preloadAssets";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect, useState } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useLoadFonts();
  const [assetsLoaded, setAssetsLoaded] = useState(false);

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
    const isWorking = async () => {
      const working = await isSecureStorageAvailable()
      if (working) {
        console.log("secure storage is up and running");
      } else {
        throw new Error("secure storage not working");
      }
    };
    isWorking();
  }, []);



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
