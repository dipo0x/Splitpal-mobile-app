import { SURFACE_COLOR } from "@/src/constants/colors";
import { isColorDark } from "@/src/utils/helpers";
import React, { ReactNode } from "react";
import { Platform, StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
};

const AppStatusBar = (props: Props) => {
  const { children, style, backgroundColor } = props;
  const bgColor = backgroundColor || SURFACE_COLOR;
  const isDark = isColorDark(bgColor);
  const barStyle = isDark ? "light-content" : "dark-content";

  // Set it immediately, not in useEffect
  if (Platform.OS === 'ios') {
    StatusBar.setBarStyle(barStyle, false);
  }
  
  return (
    <>
      <StatusBar 
        barStyle={barStyle}
        backgroundColor={bgColor}
      />
      <View style={[styles.outerContainer, { backgroundColor: bgColor }]}>
        <SafeAreaView
          edges={['left', 'right', 'bottom']}
          style={[
            styles.container,
            style,
            {
              backgroundColor: bgColor,
              paddingTop: Platform.OS === "android" ? 30 : 0,
            },
          ]}
        >
          {children}
        </SafeAreaView>
      </View>
    </>
  );
};

export default AppStatusBar;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    flex: 1,
  },
});