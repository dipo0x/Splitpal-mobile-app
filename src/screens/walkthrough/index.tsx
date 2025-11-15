import { Image, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
       <Image source={require("../../../assets/images/splitpal-logo.png")}
       style={{ width: 100, height: 100 }}
          />
    </View>
  );
}
