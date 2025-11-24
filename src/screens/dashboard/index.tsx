import AppStatusBar from "@/src/layout/appStatusBar";
import { auth } from "@/src/lib/firebase.lib";
import styles from "@/src/styles/dashboard/home.style";
import { User } from "firebase/auth";
import { View } from "react-native";

import UserAvatar from "@/assets/images/dashboard/avatar.svg";
import { useState } from "react";

const Homecreen = ({ navigation }: any) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  return (
    <View style={styles.dashboardContainer}>
      <AppStatusBar
        backgroundColor={styles.dashboardContainer.backgroundColor}
      />

      <View style={styles.header}>
        <UserAvatar width={50} height={50} />
      </View>
    </View>
  );
};

export default Homecreen;
