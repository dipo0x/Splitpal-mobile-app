import WalkthroughScreen from "@/src/screens/walkthrough";
import SplashScreen from "@/src/screens/walkthrough/splash";
import { WalkthroughStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator<WalkthroughStackParamList>();
const WalkStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="splash-screen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="splash-screen" component={SplashScreen} />
      <Stack.Screen name="walkthrough-screen" component={WalkthroughScreen} />
    </Stack.Navigator>
  );
};

export default WalkStack;
