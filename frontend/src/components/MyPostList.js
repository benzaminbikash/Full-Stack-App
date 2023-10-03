import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { API, AUTH } from "../context/AuthContext";
import UpdateBlog from "./UpdateBlog";
const MyPostList = ({ item, getApi }) => {
  const { data } = useContext(AUTH);
  const { fetchApi } = useContext(API);
  const deleteBlog = async (d) => {
    const deleteB = await fetch(`http://192.168.1.68:8000/blog/deleteblog/${d}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + data.token,
      },
    });
    const result = await deleteB.json();
    if (result.status == true) {
      getApi();
      fetchApi();
      Alert.alert(result.message);
    } else {
      Alert.alert(result.message);
    }
  };
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleEditing = (d) => {
    setVisible(true);
    setSelected(d);
  };
  return (
    <>
      <View key={item.id} style={styles.main}>
        <View style={styles.submain}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.like}>
            <TouchableOpacity onPress={() => handleEditing(item)}>
              <MaterialIcons name="mode-edit" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteBlog(item._id)}>
              <MaterialIcons name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
          <UpdateBlog
            visible={visible}
            cancelBlog={() => setVisible(false)}
            d={selected}
            getApi={getApi}
          />
        </View>
      </View>
    </>
  );
};
export default MyPostList;

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
    gap: 3,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
    paddingTop: 5,
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
