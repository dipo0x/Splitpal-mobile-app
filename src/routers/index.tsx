import { RootStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options.utils";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AuthStack from "./auth";
import DashboardStack from "./dashboard";
import WalkStack from "./splash";
import BillsStack from "./bills";

const Stack = createStackNavigator<RootStackParamList>();

const RootRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions as any}
      initialRouteName="walkthrough-stack"
    >
      <Stack.Screen name="walkthrough-stack" component={WalkStack} />
      <Stack.Screen name="auth-stack" component={AuthStack} />
      <Stack.Screen name="dashboard-stack" component={DashboardStack} />
      <Stack.Screen name="bills-stack" component={BillsStack} />
    </Stack.Navigator>
  );
};

export default RootRouter;
