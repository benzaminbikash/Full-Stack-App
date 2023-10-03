import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const HomeList = ({ item }) => {
  return (
    <View key={item.id} style={styles.main}>
      <View style={styles.submain}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.postby}>Post By: {item.postBy.name}</Text>
        <View style={styles.like}>
          <TouchableOpacity>
          <AntDesign name="like2" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
          <AntDesign name="dislike2" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default HomeList;

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  submain: {
    backgroundColor: "white",
    elevation: 10,
    padding: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
  },
  like: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  postby: {
    color: "grey",
    alignSelf: "flex-end",
    paddingRight: 10,
    fontSize: 13,
    textDecorationLine: "underline",
    marginVertical: 1,
  },
});
