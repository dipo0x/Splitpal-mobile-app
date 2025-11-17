import BillsScreen from "@/src/screens/walkthrough/bills";
import ViewBillsScreen from "@/src/screens/walkthrough/view-bills";
import SplashScreen from "@/src/screens/walkthrough/splash";
import { WalkthroughStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options.utils";
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
      <Stack.Screen name="bills-screen" component={BillsScreen} />
      <Stack.Screen name="view-bills-screen" component={ViewBillsScreen} />
    </Stack.Navigator>
  );
};

export default WalkStack;
