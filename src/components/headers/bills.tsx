import BillsTabIcon from "@/src/components/icons/BillsTabIcon";
import GroupsTabIcon from "@/src/components/icons/GroupsTabIcon";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type ActiveTab = "bills" | "groups";

export function BillHeader({
  activeTab = "bills",
  onTabPress,
}: {
  activeTab: ActiveTab;
  onTabPress: (tab: ActiveTab) => void;
}) {
  const pendingBillsCount = 5;
  const pendingGroupsCount = 1;

  const billTabBg = useSharedValue(
    activeTab === "bills" ? "rgba(123, 97, 255, 1)" : "rgba(249, 249, 249, 1)"
  );
  const billTabTextColor = useSharedValue(
    activeTab === "bills" ? "#fff" : "rgba(95, 99, 104, 1)"
  );
  const groupTabBg = useSharedValue(
    activeTab === "groups" ? "rgba(123, 97, 255, 1)" : "rgba(249, 249, 249, 1)"
  );
  const groupTabTextColor = useSharedValue(
    activeTab === "groups" ? "#fff" : "rgba(95, 99, 104, 1)"
  );

  useEffect(() => {
    billTabBg.value = withTiming(
      activeTab === "bills" ? "rgba(123, 97, 255, 1)" : "rgba(249, 249, 249, 1)"
    );
    billTabTextColor.value = withTiming(
      activeTab === "bills" ? "#fff" : "rgba(95, 99, 104, 1)"
    );
    groupTabBg.value = withTiming(
      activeTab === "groups"
        ? "rgba(123, 97, 255, 1)"
        : "rgba(249, 249, 249, 1)"
    );
    groupTabTextColor.value = withTiming(
      activeTab === "groups" ? "#fff" : "rgba(95, 99, 104, 1)"
    );
  }, [activeTab, billTabBg, billTabTextColor, groupTabBg, groupTabTextColor]);

  const animatedBillTabStyle = useAnimatedStyle(() => ({
    backgroundColor: billTabBg.value,
  }));

  const animatedBillTextStyle = useAnimatedStyle(() => ({
    color: billTabTextColor.value,
  }));

  const animatedGroupTabStyle = useAnimatedStyle(() => ({
    backgroundColor: groupTabBg.value,
  }));

  const animatedGroupTextStyle = useAnimatedStyle(() => ({
    color: groupTabTextColor.value,
  }));

  return (
    <View
      style={{
        height: 75,
        marginLeft: 30,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "rgba(249, 249, 249, 1)",
        borderRadius: 80,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={() => onTabPress("bills")}>
        <Animated.View
          style={[
            {
              margin: 15,
              flex: 1,
              borderRadius: 30,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            },
            animatedBillTabStyle,
          ]}
        >
          <BillsTabIcon
            style={{ marginRight: 5 }}
            width={20}
            height={20}
            fill={activeTab === "bills" ? "#fff" : "rgba(123, 97, 255, 1)"}
          />
          <Animated.Text
            style={[
              {
                fontFamily: "Satoshi-Medium",
              },
              animatedBillTextStyle,
            ]}
          >
            Bills ({pendingBillsCount})
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onTabPress("groups")}>
        <Animated.View
          style={[
            {
              margin: 15,
              flex: 1,
              marginRight: 30,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            },
            animatedGroupTabStyle,
          ]}
        >
          <GroupsTabIcon
            style={{ marginRight: 5 }}
            width={20}
            height={20}
            fill={activeTab === "groups" ? "#fff" : "rgba(123, 97, 255, 1)"}
          />
          <Animated.Text
            style={[
              {
                fontFamily: "Satoshi-Medium",
              },
              animatedGroupTextStyle,
            ]}
          >
            Groups ({pendingGroupsCount})
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
