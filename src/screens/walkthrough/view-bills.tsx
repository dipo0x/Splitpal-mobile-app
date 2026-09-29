import SplashButton from "@/src/components/buttons/splash/Button";
import OnboardingProgress from "@/src/components/ui/splash/OnboardingProgress";
import AppStatusBar from "@/src/layout/AppStatusBar";
import styles from "@/src/styles/walkthrough/walkthrough.style";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ColorValue, Image, Text, View } from "react-native";

const buttonColors: readonly [ColorValue, ColorValue] = ["#F6F7FF", "#EAF6F6"];

const ViewBillsScreen = () => {
  const router = useRouter();
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
        <Text style={styles.mainText}>Bills Made Clear, Splits Made Easy</Text>
        <Text style={styles.subText}>
          Every detail of the bill is visible so your friends always know
          exactly what they’re paying for.
        </Text>
        <View style={{ width: "100%", paddingTop: 30, marginBottom: 30 }}>
          <OnboardingProgress currentStep={2} />
        </View>
        <SplashButton
          width={130}
          height={58}
          border={true}
          text="Skip"
          onPress={() => {
            router.push("/auth/login");
          }}
        />
        <SplashButton
          width={130}
          height={58}
          border={false}
          text="Next"
          onPress={() => {
            router.push("/auth/login");
          }}
        />
      </View>
    </View>
  );
};

export default ViewBillsScreen;
