import BillsSettledAvatar from "@/assets/images/dashboard/iconsax-clipboard-tick.svg";
import LockIndicator from "@/assets/images/dashboard/Lock-indicator.svg";

import PendingBillsAvatar from "@/assets/images/dashboard/Clip-path-group-3.svg";

import styles from "@/src/styles/dashboard/home.style";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
type settled = "settled" | "pending";

type Props = {
  type: settled;
  amount: string;
};
const DashboardBalanceCarousel = (props: Props) => {
  const { type, amount } = props;
  let backgroundColor: string = "";
  let text: string = "";
  let carouselSVG: FunctionComponent<SvgProps>;
  switch (type) {
    case "settled": {
      backgroundColor = "rgba(42, 182, 115, 0.1)";
      text = "Bills settled";
      carouselSVG = BillsSettledAvatar;
      break;
    }
    case "pending": {
      backgroundColor = "rgba(255, 209, 102, 0.1)";
      text = "Pending Bills";
      carouselSVG = PendingBillsAvatar;
      break;
    }
  }
  return (
    <View
      style={{
        borderRadius: 20,
        width: 160,
        height: 200,
        backgroundColor: backgroundColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View>
          {React.createElement(carouselSVG, {
            width: 24,
            height: 24,
            style: styles.caroselsIcon,
          })}
        </View>
        <Text style={styles.carouselText}>{text}</Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LockIndicator />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: "Satoshi-Bold",
          }}
        >
          ₦ {amount}
        </Text>
      </View>
    </View>
  );
};

export default DashboardBalanceCarousel;
