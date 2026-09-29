import UserAvatar from "@/assets/images/dashboard/avatar.svg";
import { useAuth } from "@/src/hooks/useAuth";

import styles from "@/src/styles/dashboard/home.style";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";

const HeaderComponent = () => {
  const { appUser } = useAuth();
  const [notificationCount] = useState(1);
  return (
    <View>
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
                  width: 25,
                  height: 27,
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
          borderColor: "rgba(242, 244, 245, 1)",
          borderBottomWidth: 1,
          width: "100%",
          marginTop: 10,
          marginBottom: 0,
          alignSelf: "center",
        }}
      />
    </View>
  );
};

export default HeaderComponent;
