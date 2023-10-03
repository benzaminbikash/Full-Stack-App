import { View, Text, Alert } from "react-native";
import React, { useContext, useState } from "react";
import InputBox from "../components/InputBox";
import SubmitButton from "../components/SubmitButton";
import { API, AUTH } from "../context/AuthContext";
const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data } = useContext(AUTH);
  const { fetchApi } = useContext(API);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert("Alert", "Add title and Description");
    } else {
      const fetchAp =await fetch("http://192.168.1.68:8000/blog/create", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + data.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const d = await fetchAp.json();
      if (d.status === true) {
        fetchApi();
        Alert.alert(d.message);
      } else {
        Alert.alert(d.message);
      }
    }
  };
  return (
    <View style={{ padding: 10 }}>
      <InputBox title="Title" value={title} setValue={setTitle} />
      <InputBox title="Description" value={description} setValue={setDescription} />
      <SubmitButton title="Add" handleSubmit={handleSubmit} />
    </View>
  );
};

export default Post;
