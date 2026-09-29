import SplashButton from "@/src/components/buttons/splash/Button";
import OnboardingProgress from "@/src/components/ui/splash/OnboardingProgress";
import AppStatusBar from "@/src/layout/AppStatusBar";
import styles from "@/src/styles/walkthrough/walkthrough.style";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ColorValue, Image, Text, View } from "react-native";

const buttonColors: readonly [ColorValue, ColorValue] = ["#F6F7FF", "#EAF6F6"];

const BillsScreen = () => {
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
            source={require("@/assets/images/artwork.png")}
            style={styles.image}
          />
        </View>
      </LinearGradient>
      <View style={styles.buttonContainer}>
        <Text style={styles.mainText}>
          The Easy Way To Split Expenses With Friends
        </Text>
        <Text style={styles.subText}>
          Quickly share group expenses, keep everything fair, and avoid the
          awkward money talk.
        </Text>
        <View style={{ width: "100%", paddingTop: 30, marginBottom: 30 }}>
          <OnboardingProgress currentStep={1} />
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
            router.push("/walkthrough/view-bills");
          }}
        />
      </View>
    </View>
  );
};

export default BillsScreen;
