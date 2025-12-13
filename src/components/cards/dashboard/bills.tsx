import FoodAvatar from "@/assets/images/dashboard/food.svg";
import TravelsAvatar from "@/assets/images/dashboard/ride.svg";
import AvatarStack from "@/src/components/ui/AvatarStack";
import styles from "@/src/styles/dashboard/home.style";
import { IBill } from "@/src/types/bills/bill.type";
import { getRelativeDueDate } from "@/src/utils/date.util";
import React, { FunctionComponent } from "react";
import { Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import StraightHorizontalLine from "../../ui/StraightLine";

const BillCard: React.FC<IBill> = (bill) => {
  let CarouselSVG: FunctionComponent<SvgProps> = FoodAvatar;

  switch (bill.category) {
    case "transport":
      CarouselSVG = TravelsAvatar;
      break;
    case "food":
      CarouselSVG = FoodAvatar;
      break;
  }

  const memberImages = bill.members.map((m) => m.image);

  const getTextStyle = () => {
    if (bill.paymentStatus === "settled") {
      return {
        color: "rgba(42, 182, 115, 100)",
      };
    } else {
      return {
        color: "rgba(255, 128, 0, 1)",
      };
    }
  };

  return (
    <View
      style={{
        borderColor: "rgba(242, 244, 245, 1)",
        height: 190,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {React.createElement(CarouselSVG, {
          width: 40,
          height: 40,
          style: styles.caroselsIcon,
        })}

        <Text
          style={{
            paddingTop: 20,
            color: "black",
            fontFamily: "Satoshi-Medium",
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          {bill.name}
        </Text>

        <View
          style={{
            marginLeft: "auto",
            marginRight: 20,
            backgroundColor: "rgba(20, 125, 128, 1)",
            height: 40,
            width: 80,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Satoshi-Medium",
            }}
          >
            ₦{bill.amount}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: "rgba(95, 99, 104, 1)",
          fontFamily: "Satoshi-Regular",
          fontSize: 14,
          marginLeft: 15,
          paddingTop: 10,
          paddingBottom: 7,
        }}
      >
        {bill.description}
      </Text>

      <StraightHorizontalLine />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AvatarStack images={memberImages} />
        <Text
          style={[
            getTextStyle(),
            {
              fontFamily: "Satoshi-Medium",
              marginLeft: "auto",
              paddingRight: 20,
            },
          ]}
        >
          {bill.paymentStatus === "settled" ? (
            "✓ Settled"
          ) : (
            <Text>
              Pending{" "}
              <Text style={{ color: "rgba(95, 99, 104, 1)" }}>
                `(Due {getRelativeDueDate(bill.dueDate)})`
              </Text>
            </Text>
          )}
        </Text>
      </View>
    </View>
  );
};

export default BillCard;
