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
    flex: 1,
  },
  dashboardContainer: {
    flex: 1,
    backgroundColor: colors.primary
  },

});

export default styles;
