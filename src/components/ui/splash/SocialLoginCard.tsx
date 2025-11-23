import React from "react";
import { Image, StyleSheet, View } from "react-native";
const GooglePng = require("@/assets/images/social/google.png");
const FacebookPng = require("@/assets/images/social/facebook.png");
const ApplePng = require("@/assets/images/social/apple.png");

interface Props {
  logoRoute?: string;
}

export default function SocialLoginCard({ logoRoute = "google.svg" }: Props) {
  const logos: Record<string, any> = {
    "google.png": GooglePng,
    "facebook.png": FacebookPng,
    "apple.png": ApplePng,
  };

  const Logo = logos[logoRoute];

  return (
    <View style={[styles.card]}>
      <Image source={Logo} style={{ width: 23, height: 23 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",

    width: 85,
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    marginHorizontal: 5,
  },
});
