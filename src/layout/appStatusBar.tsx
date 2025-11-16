import React, { ReactNode } from "react";
import { StatusBar, StyleSheet, View, Platform } from "react-native";

interface Props {
  children?: ReactNode;
  backgroundColor?: string;
}

const AppStatusBar: React.FC<Props> = ({
  children,
  backgroundColor = "black",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View
        style={{
          height: Platform.OS === "ios" ? 44 : StatusBar.currentHeight,
          backgroundColor,
        }}
      />

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default AppStatusBar;