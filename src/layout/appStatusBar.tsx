import React, { ReactNode } from "react";
import { Platform, StatusBar, View } from "react-native";

interface Props {
  children?: ReactNode;
  backgroundColor?: string;
}

const AppStatusBar: React.FC<Props> = ({
  children,
  backgroundColor = "white",
}) => {
  return (
    <View style={[{ backgroundColor }]}>
      <View
        style={{
          height: Platform.OS === "ios" ? 44 : StatusBar.currentHeight,
          backgroundColor,
        }}
      />

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {children}
    </View>
  );
};

export default AppStatusBar;
