import NavIcon from "@/src/components/icons/NavBarIcon";
import { AddBillModal } from "@/src/components/modals/AddBillModal";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

type ActiveTab = "home" | "bills" | "wallet" | "account";

const PURPLE = "rgba(123, 97, 255, 1)";
const GRAY = "rgba(95, 99, 104, 1)";

export function BottomNav({
  navigation,
  activeTab,
}: {
  navigation: any;
  activeTab: ActiveTab;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleScanBill = () => {
    setIsModalVisible(false);

    console.log("Scan bill pressed");
  };

  const handleAddManually = () => {
    setIsModalVisible(false);

    console.log("Add manually pressed");
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <NavItem
            iconName="home"
            route="dashboard-stack"
            label="Home"
            navigation={navigation}
            active={activeTab === "home"}
          />
          <NavItem
            iconName="bills"
            route="bills-stack"
            subRoute="all-bills-screen"
            label="Bills"
            navigation={navigation}
            active={activeTab === "bills"}
          />
          <View style={styles.fabWrapper}>
            <TouchableOpacity
              style={styles.fab}
              onPress={() => setIsModalVisible(true)}
            >
              <Icon name="plus" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <NavItem
            iconName="wallet"
            route="login-screen"
            label="Wallet"
            navigation={navigation}
            active={activeTab === "wallet"}
          />

          <NavItem
            iconName="account"
            route="login-screen"
            label="Account"
            navigation={navigation}
            active={activeTab === "account"}
          />
        </View>
      </View>

      <AddBillModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onScanBill={handleScanBill}
        onAddManually={handleAddManually}
      />
    </>
  );
}

type NavItemProps = {
  iconName: "home" | "bills" | "wallet" | "account";
  route: string;
  label: string;
  navigation: any;
  active?: boolean;
  subRoute?: string;
};

function NavItem({
  iconName,
  route,
  label,
  navigation,
  active,
  subRoute,
}: NavItemProps) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate(route, subRoute ? { screen: subRoute } : undefined);
      }}
    >
      <NavIcon
        name={iconName}
        width={24}
        height={24}
        stroke={active ? PURPLE : GRAY}
      />
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 0 : 0,
    left: 0,
    right: 0,
  },

  container: {
    height: 90,
    backgroundColor: "#fff",
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "rgba(217, 217, 217, 0.5)",
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  label: {
    fontFamily: "Satoshi-Regular",
    fontSize: 12,
    marginTop: 4,
    color: GRAY,
  },

  activeLabel: {
    fontFamily: "Satoshi-Bold",
    color: PURPLE,
  },

  fabWrapper: {
    width: 72,
    alignItems: "center",
  },

  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PURPLE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
});
