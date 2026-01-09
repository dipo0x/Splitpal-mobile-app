
import WalletAvatar from "@/assets/images/dashboard/Clip-path-group.svg";
import MastercardAvatar from "@/assets/images/dashboard/Mastercard.svg";
import BillCard from "@/src/components/cards/dashboard/bills";
import DashboardBalanceCarousel from "@/src/components/carosels/DashboardBalance";
import HeaderComponent from "@/src/components/headers/home";
// import { useAuth } from "@/src/hooks/useAuth";
import AppStatusBar from "@/src/layout/AppStatusBar";
import userBills from "@/src/mocks/bill.mock";
import { BottomNav } from "@/src/navigation/BottomTab";
import styles from "@/src/styles/dashboard/home.style";
// import React, { useState } from "react";
import React from "react";
import {  ScrollView, Text, View } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  // const { appUser } = useAuth();
  // const [notificationCount] = useState(1);
  const walletBalance = "50,000";
  const cardLastFourDigit = "* 5623";
  const billsSettled = "15,000";
  const pendingBills = "20,000";
  return (
    <View style={styles.dashboardContainer}>
      <AppStatusBar
        backgroundColor={styles.dashboardContainer.backgroundColor}
      />

  <HeaderComponent navigation={navigation} />
    
      <ScrollView
        style={{ paddingVertical: 10, paddingTop: 0 }}
        contentContainerStyle={{ paddingBottom: 93 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            paddingLeft: 20,
            paddingTop: 15,
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
      <BottomNav navigation={navigation} activeTab="home" />
    </View>
  );
};

export default HomeScreen;
