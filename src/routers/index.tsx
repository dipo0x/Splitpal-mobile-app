import { RootStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options.utils";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AuthStack from "./auth";
import WalkStack from "./splash";

const Stack = createStackNavigator<RootStackParamList>();

const RootRouter = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="walkthrough-stack"
    >
      <Stack.Screen name="walkthrough-stack" component={WalkStack} />
      <Stack.Screen name="auth-stack" component={AuthStack} />
    </Stack.Navigator>
  );
};

export default RootRouter;
