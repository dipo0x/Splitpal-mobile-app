import SplashButton from "@/src/components/buttons/splash/button";
import AuthInput from "@/src/components/input/auth/auth.input";
import Checkbox from "@/src/components/ui/CheckBox";
import AuthWrapper from "@/src/components/wrappers/auth/AuthWrapper";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const LoginScreen = ({ navigation }: any) => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setChecked] = useState(false);

  console.log(isChecked);

  return (
    <AuthWrapper formHeight={"75%"}>
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
              fontFamily: "Satoshi-Regular",
            }}
          >
            Enter your email and password to log in
          </Text>
          <AuthInput
            value={emailAddress}
            placeholder="Email Address"
            secureTextEntry={false}
          ></AuthInput>
          <AuthInput
            placeholder="Password"
            value={password}
            secureTextEntry={true}
          ></AuthInput>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            boxStyle={{ paddingLeft: 20, paddingTop: 20 }}
            checked={isChecked}
            onChange={setChecked}
          />{" "}
          <Text
            style={{
              fontFamily: "Satoshi-Medium",
              color: "rgba(95, 99, 104, 1)",
              paddingTop: 20,
              paddingLeft: 5,
            }}
          >
            {" "}
            Remember me{" "}
          </Text>
          <Text
            style={{
              paddingLeft: 35,
              fontFamily: "Satoshi-Medium",
              color: "rgba(20, 125, 128, 1)",
              paddingTop: 20,
            }}
          >
            {" "}
            Forgot Password ?{" "}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <SplashButton
            width={300}
            height={58}
            border={false}
            text="Login"
            onPress={() => {
              navigation.navigate("view-bills-screen");
            }}
          />
          <Text style={{ paddingTop: 20,   fontFamily: "Satoshi-Regular", color: "rgba(95, 99, 104, 1)" }}>
            Or login with{" "}
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
