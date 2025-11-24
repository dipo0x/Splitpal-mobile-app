import SplashButton from "@/src/components/buttons/splash/button";
import AuthInput from "@/src/components/input/auth/auth.input";
import Checkbox from "@/src/components/ui/CheckBox";
import SocialLoginCard from "@/src/components/ui/splash/SocialLoginCard";
import AuthWrapper from "@/src/components/wrappers/auth/AuthWrapper";
import { EMAIL, PASSWORD, SIGN_IN } from "@/src/const/auth.const";
import { useAuth } from "@/src/lib/authcontext.lib";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setChecked] = useState(false);

  type LoginErrors = {
    email?: string | null;
    password?: string | null;
  };

  const [errors, setErrors] = useState<LoginErrors>({});

  const { signIn } = useAuth();

  const setFieldError = (field: keyof LoginErrors, message?: string | null) => {
    setErrors((prev) => ({ ...prev, [field]: message || null }));
  };

  const validate = () => {
    const next: LoginErrors = {};
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Please enter a valid email.";
    if (!password) next.password = "Please enter your password.";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleAuth = async () => {
    setErrors({});
    if (!validate()) return;

    const result = await signIn(email, password, isChecked);
    if (result) {
      if (result.isEmail) setFieldError("email", result.message);
      else setFieldError("password", result.message);
      return;
    }
    navigation.navigate("dashboard-stack", { screen: "home-screen" });

  };

  return (
    <AuthWrapper formHeight={"78%"}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("@/assets/images/signin-logo.png")}
            style={{ marginTop: 30, width: 60, height: 40 }}
          />
          <Text
            style={{
              fontFamily: "Satoshi-Bold",
              paddingTop: 30,
              fontSize: 30,
            }}
          >
            Sign In
          </Text>
          <Text
            style={{
              color: "#5F6368",
              marginTop: 20,
              marginBottom: 20,
              fontFamily: "Satoshi-Regular",
            }}
          >
            {SIGN_IN}
          </Text>
          <AuthInput
            hasError={!!errors.email}
            error={errors.email}
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            value={email}
            placeholder={EMAIL}
            secureTextEntry={false}
            onChangeText={(text: string) => {
              setEmailAddress(text);
              setFieldError("email", null);
            }}
          />
          <AuthInput
            hasError={!!errors.password}
            error={errors.password}
            autoComplete="password"
            placeholder={PASSWORD}
            value={password}
            secureTextEntry={true}
            onChangeText={(text: string) => {
              setPassword(text);
              setFieldError("password", null);
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            boxStyle={{ paddingLeft: 20, paddingTop: 20 }}
            checked={isChecked}
            onChange={setChecked}
          />
          <Text
            style={{
              fontFamily: "Satoshi-Medium",
              color: "rgba(95, 99, 104, 1)",
              paddingTop: 20,
              paddingLeft: 7,
            }}
          >
            Remember me
          </Text>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: 16,
              fontFamily: "Satoshi-Bold",
              color: "rgba(20, 125, 128, 1)",
              paddingTop: 20,
            }}
          >
            Forgot Password ?
          </Text>
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
            text="Login"
            onPress={handleAuth}
          />
          <Text
            style={{
              paddingTop: 20,
              fontFamily: "Satoshi-Regular",
              color: "rgba(95, 99, 104, 1)",
            }}
          >
            Or login with{" "}
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
            Don&lsquo;t have an account?
          </Text>

          <Pressable
            onPress={() => navigation.navigate("signup-screen")}
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
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default LoginScreen;
