import React from "react";
import { Text, TextInput, View } from "react-native";
import styles from "../../../styles/input/input.style";

const AuthInput = (props: any) => {
  const {
    autoComplete,
    keyboardType,
    returnKeyType,
    autoCapitalize,
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    onSubmitEditing,
    hasError,
    error,
  } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        style={hasError ? styles.logininputerror : styles.input}
        placeholderTextColor="#5F6368"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
      />
      {hasError && (
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            paddingTop: 10,
            color: "rgba(244, 63, 94, 1)",
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default AuthInput;
