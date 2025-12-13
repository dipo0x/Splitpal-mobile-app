import { StyleSheet } from "react-native";

export const colors = {
  primary: "rgba(255, 255, 255, 1)",
  background: "#ffffffff",
  white: "#FFF",
  grayText: "#5F6368CC",
  outlineColor: "#4C4C4C",
  placeHolderColor: "#7D7D7D",
  errorMessage: "#FF0000",
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    flexDirection: "column",
    paddingTop: 15,
    paddingHorizontal: 30,
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  avatar: {
    marginTop: 15,
  },
  headerText: {
    paddingTop: 15,
    alignContent: "center",
    marginLeft: 10,
    letterSpacing: 0.1,
    fontFamily: "Satoshi-Medium",
  },
  caroselsIcon: {
    marginTop: 20,
    marginLeft: 15,
  },
  carouselText: {
    paddingLeft: 5,
    color: "black",
    marginTop: 23,
    fontFamily: "Satoshi-Medium",
  },
 
});

export default styles;
