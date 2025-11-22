import React from "react";
import { TextInput, View } from "react-native";
import styles from "../../../styles/input/style.input";

const AuthInput = (props: any) => {
  const { placeholder, secureTextEntry } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholderTextColor="#5F6368"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default AuthInput;
