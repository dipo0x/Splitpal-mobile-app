import UserAvatar from "@/assets/images/dashboard/avatar.svg";
import WalletAvatar from "@/assets/images/dashboard/Clip-path-group.svg";
import MastercardAvatar from "@/assets/images/dashboard/Mastercard.svg";
import BillCard from "@/src/components/cards/dashboard/bills";
import DashboardBalanceCarousel from "@/src/components/carosels/DashboardBalance";
import AppStatusBar from "@/src/layout/AppStatusBar";
import { useAuth } from "@/src/lib/authcontext.lib";
import userBills from "@/src/mocks/bill.mock";
import { BottomNav } from "@/src/navigation/BottomTab";
import styles from "@/src/styles/dashboard/home.style";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  const { appUser } = useAuth();
  const [notificationCount, setNotificationCount] = useState(1);
  const walletBalance = "50,000";
  const cardLastFourDigit = "* 5623";
  const billsSettled = "15,000";
  const pendingBills = "20,000";
  return (
    <View style={styles.dashboardContainer}>
      <AppStatusBar
        backgroundColor={styles.dashboardContainer.backgroundColor}
      />

      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <UserAvatar style={styles.avatar} width={55} height={55} />
          <Text style={styles.headerText}>Hey, {appUser?.fullName} 👋</Text>
          <View
            style={{
              paddingTop: 15,
              marginLeft: "auto",
              marginRight: 5,
              position: "relative",
            }}
          >
            <View>
              <Image
                source={require("@/assets/images/notification.png")}
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  top: -5,
                  right: -3,
                  backgroundColor: "rgba(20, 125, 128, 1)",
                  width: 19,
                  height: 19,
                  borderRadius: 9,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "white", fontSize: 10 }}
                >
                  {notificationCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
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
      <ScrollView style={{ paddingVertical: 10 }}>
        <Text
          style={{
            paddingTop: 10,
            paddingLeft: 20,
            fontFamily: "Satoshi-Medium",
            fontSize: 20,
          }}
        >
          Your Money Moves 💰
        </Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 10 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingLeft: 25,
              paddingRight: 20,
            }}
          >
            <View
              style={{
                borderRadius: 20,
                width: 160,
                backgroundColor: "rgba(123, 97, 255, 1)",
                height: 200,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <WalletAvatar
                  style={styles.caroselsIcon}
                  width={25}
                  height={25}
                />
                <Text
                  style={{
                    color: "white",
                    marginTop: 23,
                    fontFamily: "Satoshi-Bold",
                  }}
                >
                  {" "}
                  Wallet{" "}
                </Text>
              </View>
              <Text
                style={{
                  paddingTop: 65,
                  paddingLeft: 15,
                  fontFamily: "Satoshi-Bold",
                  color: "white",
                  fontSize: 20,
                }}
              >
                ₦ {walletBalance}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 25,
                  paddingLeft: 10,
                }}
              >
                <MastercardAvatar />

                <Text
                  style={{
                    color: "rgb(182, 182, 182)",
                    fontFamily: "Satoshi-Medium",
                    paddingLeft: 10,
                    paddingTop: 3,
                  }}
                >
                  {cardLastFourDigit}
                </Text>
              </View>
            </View>
            <DashboardBalanceCarousel type="settled" amount={billsSettled} />
            <DashboardBalanceCarousel type="pending" amount={pendingBills} />
          </View>
        </ScrollView>
        <View
          style={{
            paddingTop: 20,
            flexDirection: "row",
            paddingLeft: 25,
          }}
        >
          <Text
            style={{
              fontFamily: "Satoshi-Medium",
              fontSize: 20,
            }}
          >
            Recent Splits
          </Text>
          <Text
            style={{
              paddingTop: 5,
              color: "rgba(123, 97, 255, 1)",
              fontFamily: "Satoshi-Bold",
              fontSize: 15,
              paddingRight: 25,
              marginLeft: "auto",
            }}
          >
            See All
          </Text>
        </View>
        <View
          style={{
            paddingTop: 25,
            paddingLeft: 25,
            paddingRight: 25,
            flexDirection: "column",
            gap: 10,
          }}
        >
          {userBills.map((bill, index) => (
            <BillCard key={index} {...bill} />
          ))}
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
};

export default HomeScreen;
