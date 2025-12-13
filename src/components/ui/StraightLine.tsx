import { View } from "react-native";

const StraightHorizontalLine = (Props: {}) => {
  return (
    <View
      style={{
        paddingTop: 5,
        borderBottomColor: "rgba(242, 244, 245, 1)",
        borderBottomWidth: 1,
        width: "100%",
        marginVertical: 10,
        alignSelf: "center",
      }}
    />
  );
};

export default StraightHorizontalLine;
