import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, ColorValue, Text } from "react-native";
import AppStatusBar from "@/src/layout/appStatusBar";

const buttonColors: readonly [ColorValue, ColorValue] = ["#F6F7FF", "#EAF6F6"];

export default function Index() {
  return (
    <View style={styles.container}>
      <AppStatusBar
        backgroundColor={buttonColors[0] as string}

      />
      <LinearGradient
        colors={buttonColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <Text style={{ color: "black" }}>button section</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {},
});
