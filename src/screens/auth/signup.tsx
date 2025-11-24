import SplashButton from "@/src/components/buttons/splash/button";
import AuthInput from "@/src/components/input/auth/auth.input";
import SocialLoginCard from "@/src/components/ui/splash/SocialLoginCard";
import AuthWrapper from "@/src/components/wrappers/auth/AuthWrapper";
import {
  EMAIL,
  FULL_NAME,
  PASSWORD,
  SIGN_UP,
  USERNAME,
} from "@/src/const/auth.const";
import { useAuth } from "@/src/lib/authcontext.lib";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type SignupErrors = {
  fullName?: string | null;
  email?: string | null;
  username?: string | null;
  password?: string | null;
  general?: string | null;
};

export default function SignUpScreen({ navigation }: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});

  const { signUp } = useAuth();

  const setFieldError = (
    field: keyof SignupErrors,
    message?: string | null
  ) => {
    setErrors((prev) => ({ ...prev, [field]: message || null }));
  };

  const validate = () => {
    const next: SignupErrors = {};
    if (!fullName.trim()) next.fullName = "Please enter your full name.";
    if (!email.trim()) next.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Please enter a valid email.";
    if (!username.trim()) next.username = "Choose a username.";
    if (!password || password.length < 6)
      next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = async () => {
    setErrors({});
    if (!validate()) return;

    const result = await signUp(email, password, fullName, username);
    if (result) {
      if (result.isEmail) setFieldError("email", result.message);
      else setFieldError("password", result.message);
      return;
    }

    navigation.navigate("auth-stack", { screen: "login-screen" });
  };

  return (
    <AuthWrapper formHeight={"90%"}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("@/assets/images/signin-logo.png")}
            style={{ marginTop: 30, width: 60, height: 40 }}
          />
          <Text
            style={{ fontFamily: "Satoshi-Bold", paddingTop: 30, fontSize: 30 }}
          >
            Sign Up
          </Text>
          <Text
            style={{
              color: "#5F6368",
              marginTop: 20,
              marginBottom: 20,
              fontFamily: "Satoshi-Regular",
            }}
          >
            {SIGN_UP}
          </Text>

          <AuthInput
            hasError={!!errors.fullName}
            error={errors.fullName}
            value={fullName}
            placeholder={FULL_NAME}
            onChangeText={(t: string) => {
              setFullName(t);
              setFieldError("fullName", null);
            }}
          />

          <AuthInput
            autoCapitalize="none"
            hasError={!!errors.email}
            error={errors.email}
            autoComplete="email"
            keyboardType="email-address"
            value={email}
            placeholder={EMAIL}
            onChangeText={(t: string) => {
              setEmail(t);
              setFieldError("email", null);
            }}
          />

          <AuthInput
            autoCapitalize="none"
            autoComplete="username"
            hasError={!!errors.username}
            error={errors.username}
            value={username}
            placeholder={USERNAME}
            onChangeText={(t: string) => {
              setUsername(t);
              setFieldError("username", null);
            }}
          />

          <AuthInput
            hasError={!!errors.password}
            error={errors.password}
            value={password}
            placeholder={PASSWORD}
            secureTextEntry={true}
            onChangeText={(t: string) => {
              setPassword(t);
              setFieldError("password", null);
            }}
          />
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 30,
          }}
        >
          <SplashButton
            width={300}
            height={58}
            border={false}
            text="Register"
            onPress={handleRegister}
          />
          <Text
            style={{
              paddingTop: 20,
              fontFamily: "Satoshi-Regular",
              color: "rgba(95, 99, 104, 1)",
            }}
          >
            Or register with{" "}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingTop: 20,
            justifyContent: "center",
          }}
        >
          <SocialLoginCard logoRoute="google.png" />
          <SocialLoginCard logoRoute="facebook.png" />
          <SocialLoginCard logoRoute="apple.png" />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              color: "rgba(110, 110, 110, 1)",
              fontFamily: "Satoshi-Medium",
            }}
          >
            Already have an account ?
          </Text>

          <Pressable
            onPress={() => navigation.navigate("login-screen")}
            android_ripple={{ color: "transparent" }}
            style={{ paddingLeft: 4 }}
            accessibilityRole="link"
          >
            <Text
              style={{
                color: "rgba(123, 97, 255, 1)",
                fontSize: 14,
                fontFamily: "Satoshi-Bold",
              }}
            >
              Sign In
            </Text>
          </Pressable>
        </View>
      </View>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
