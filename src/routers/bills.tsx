import BillsScreen from "@/src/screens/bills/index";
import { BillsStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options.utils";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator<BillsStackParamList>();
const BillsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
   
        animation: 'default' as const,
      }}
    
    >
      <Stack.Screen name="all-bills-screen" component={BillsScreen} />
    </Stack.Navigator>
  );
};

export default BillsStack;
