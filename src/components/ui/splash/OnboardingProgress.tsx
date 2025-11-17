import { View } from "react-native";

type Props = {
  currentStep: number;
  totalSteps?: number;
};

export default function OnboardingProgress({
  currentStep,
  totalSteps = 2,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {[...Array(totalSteps)].map((_, index) => {
        const active = index + 1 === currentStep;

        return (
          <View
            key={index}
            style={{
              width: active ? 17 : 5,
              height: 5,
              borderRadius: 50,
              backgroundColor: active ? "#2D2D2D" : "#E8E8E8",
            }}
          />
        );
      })}
    </View>
  );
}
