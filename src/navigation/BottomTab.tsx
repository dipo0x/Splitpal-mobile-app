import NavIcon from "@/src/components/icons/NavIcon";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const PURPLE = "rgba(123, 97, 255, 1)";
const GRAY = "rgba(95, 99, 104, 1)";

export function BottomNav() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <NavItem iconName="home" label="Home" active />
        <NavItem iconName="bills" label="Bills" />

        <View style={styles.fabWrapper}>
          <TouchableOpacity style={styles.fab}>
            <Icon name="plus" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <NavItem iconName="wallet" label="Wallet" />
        <NavItem iconName="account" label="Account" />
      </View>
    </View>
  );
}

type NavItemProps = {
  iconName: "home" | "bills" | "wallet" | "account";
  label: string;
  active?: boolean;
};

function NavItem({ iconName, label, active }: NavItemProps) {
  return (
    <TouchableOpacity style={styles.item}>
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
