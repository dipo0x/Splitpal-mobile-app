import HeaderComponent from "@/src/components/headers/home";
import { useAuth } from "@/src/hooks/useAuth";
import AppStatusBar from "@/src/layout/AppStatusBar";

import { BottomNav } from "@/src/navigation/BottomTab";
import styles from "@/src/styles/dashboard/home.style";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { ActiveTab, BillHeader } from "@/src/components/headers/bills";

const BillScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("bills");
  useAuth();

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
        {/* <BillHeader activeTab={activeTab} onTabPress={setActiveTab} /> */}
      </ScrollView>
      <BottomNav navigation={navigation} activeTab="bills" />
    </View>
  );
};

export default BillScreen;
