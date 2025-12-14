import DashboardScreen from "@/src/screens/dashboard/index";
import { DashboardStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options.utils";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator<DashboardStackParamList>();
const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="home-screen" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
