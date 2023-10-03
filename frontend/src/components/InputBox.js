import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

const InputBox = ({ title, keyboardType, secureTextEntry=false, value, setValue }) => {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(e)=>setValue(e)}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: "400",
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 5,
    marginTop: 5,
    paddingLeft: 10,
    color: 'black',
    marginBottom: 10,
    elevation:20
  },
});
