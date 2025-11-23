import SplashButton from "@/src/components/buttons/splash/button";
import AuthInput from "@/src/components/input/auth/auth.input";
import Checkbox from "@/src/components/ui/CheckBox";
import SocialLoginCard from "@/src/components/ui/splash/SocialLoginCard";
import AuthWrapper from "@/src/components/wrappers/auth/AuthWrapper";
import { EMAIL, PASSWORD } from "@/src/const/auth.const";
import { useAuth } from "@/src/lib/authcontext";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setChecked] = useState(false);
  const [error, setError] = useState<{
    isEmail: boolean;
    message: string;
  } | null>(null);

  const { signIn } = useAuth();

  const handleAuth = async () => {
    setError(null);
    if (!email) {
      setError({ isEmail: true, message: "Please fill in your email" });
      return;
    }
    if (!password) {
      setError({ isEmail: false, message: "Please fill in your password" });
      return;
    }

    if (password.length < 6) {
      setError({
        isEmail: false,
        message: "Passwords must be at least 6 characters long.",
      });
      return;
    }

    const result = await signIn(email, password, isChecked);
    if (result) {
      setError(result);
    }
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
            Enter your email and password to log in
          </Text>
          <AuthInput
            hasError={error?.isEmail}
            error={error?.message}
            autoComplete="email"
            keyboardType="email-address"
            returnKeyType="next"
            autoCapitalize="none"
            value={email}
            placeholder={EMAIL}
            secureTextEntry={false}
            onChangeText={(text: string) => setEmailAddress(text)}
          ></AuthInput>
          <AuthInput
            hasError={error ? !error.isEmail : false}
            error={error?.message}
            autoComplete="password"
            placeholder={PASSWORD}
            value={password}
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
          ></AuthInput>
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
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Text
            style={{
              color: "rgba(110, 110, 110, 1)",
              fontFamily: "Satoshi-Medium",
            }}
          >
            Don&lsquo;t have an account?{" "}
            <Text style={{ color: "rgba(123, 97, 255, 1)" }}>Sign Up</Text>
          </Text>
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
