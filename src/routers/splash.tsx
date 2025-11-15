import SplashScreen from "@/screens/walkthrough/splash";
import WalkthroughScreen from "@/screens/walkthrough";
import { WalkthroughStackParamList } from "@/types/types";
import { screenOptions } from "@/utils/stack_options";
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
