import { RootStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import WalkStack from "./splash";

const Stack = createStackNavigator<RootStackParamList>();
const RootRouter = () => {
  return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="walkthrough-stack" component={WalkStack} />
      </Stack.Navigator>
  );
};

export default RootRouter;
