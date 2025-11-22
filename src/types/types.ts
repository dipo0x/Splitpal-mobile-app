import { StackScreenProps } from "@react-navigation/stack";

export type WalkthroughStackParamList = {
  "splash-screen": undefined;
  "bills-screen": undefined;
  "view-bills-screen": undefined;
};

export type SplashScreenProps = StackScreenProps<
  WalkthroughStackParamList,
  "splash-screen"
>;

export type RootStackParamList = {
  "walkthrough-stack": undefined;
  "auth-stack": undefined;
};

export type AuthStackParamList = {
  "login-screen": undefined;
};
