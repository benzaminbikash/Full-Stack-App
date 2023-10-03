import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { API, AUTH } from "../context/AuthContext";
import HomeList from "../components/HomeList";

const Home = () => {
  const { api } = useContext(API);

  return (
    <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
      {api.map((item, index) => {
        return <HomeList item={item} />;
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    marginBottom:50
  },
});
export default Home;
