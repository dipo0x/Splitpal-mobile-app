import { StyleSheet } from "react-native";

export const colors = {
  primary: "#ffffffff",
  background: "#ffffffff",
  white: "#FFF",
  grayText: "#5F6368CC",
  lightGray: "#AAA",
  pinkLink: "#FF69B4",
  divider: "#555",
  outlineColor: "#4C4C4C",
  placeHolderColor: "#7D7D7D",
  errorMessage: "#FF0000",
};

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  gradient: {
    flex: 1.2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
  },
  mainText: {
    textAlign: "center",
    color: "#2D2D2D",
    paddingHorizontal: 50,
    paddingTop: 40,
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: -0.5,
    fontFamily: "Satoshi-Bold",
  },
  subText: {
    paddingHorizontal: 40,
    textAlign: "center",
    fontFamily: "Satoshi-Regular",
    color: colors.grayText,
  },
  formSection: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 15,
  },
});

export default styles;
