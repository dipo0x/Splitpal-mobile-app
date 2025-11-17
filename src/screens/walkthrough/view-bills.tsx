import SplashButton from "@/src/components/buttons/splash/button";
import OnboardingProgress from "@/src/components/ui/splash/OnboardingProgress";
import AppStatusBar from "@/src/layout/appStatusBar";
import styles from "@/src/styles/walkthrough/style.walkthrough";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, Image, Text, View } from "react-native";

const buttonColors: readonly [ColorValue, ColorValue] = ["#F6F7FF", "#EAF6F6"];

const ViewBillsScreen = ({ navigation }: any) => {
  return (
    <View style={styles.splashContainer}>
      <AppStatusBar backgroundColor={buttonColors[0] as string} />
      <LinearGradient
        colors={buttonColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View>
          <Image
            source={require("@/assets/images/view-bills-image.png")}
            style={styles.image}
          />
        </View>
      </LinearGradient>
      <View style={styles.buttonContainer}>
        <Text style={styles.mainText}>
          Bills Made Clear, Splits Made Easy
        </Text>
        <Text style={styles.subText}>
          Every detail of the bill is visible so your friends always know exactly what they’re paying for.
        </Text>
        <View style={{ width: "100%", paddingTop: 30, marginBottom: 30 }}>
          <OnboardingProgress currentStep={2} />
        </View>
        <SplashButton
          border={true}
          text="Skip"
          onPress={() => {
            navigation.navigate("login-screen");
          }}
        />
        <SplashButton
          border={false}
          text="Next"
          onPress={() => {
            navigation.navigate("view-bills-screen");
          }}
        />
      </View>
    </View>
  );
};

export default ViewBillsScreen;
