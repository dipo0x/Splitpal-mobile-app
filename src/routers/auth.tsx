import LoginScreen from "@/src/screens/auth/login";
import SignUpScreen from "@/src/screens/auth/signup";
import { AuthStackParamList } from "@/src/types/types";
import { screenOptions } from "@/src/utils/stack_options.utils";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator<AuthStackParamList>();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={(props) => screenOptions as any}
    >
      <Stack.Screen name="login-screen" component={LoginScreen} />
      <Stack.Screen name="signup-screen" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
