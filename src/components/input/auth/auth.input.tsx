import React from "react";
import { TextInput, View } from "react-native";
import styles from "../../../styles/input/style.input";

const AuthInput = (props: any) => {
  const { autoComplete, keyboardType, returnKeyType, autoCapitalize, placeholder, secureTextEntry } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        autoComplete= { autoComplete}
        keyboardType={ keyboardType }
        returnKeyType={ returnKeyType}
        autoCapitalize= { autoCapitalize }
        style={styles.input}
        placeholderTextColor="#5F6368"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default AuthInput;
