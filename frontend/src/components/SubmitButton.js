import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";

const SubmitButton = ({handleSubmit, loading, title}) => {
  return (
    <TouchableOpacity style={styles.main} onPress={handleSubmit}>
     {loading?<ActivityIndicator color='white' size={20}/> : <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    borderRadius: 15,
    height: 45,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
