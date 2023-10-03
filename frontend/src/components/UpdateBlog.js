import { View, Text, Modal, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import InputBox from "./InputBox";
import SubmitButton from "./SubmitButton";
import { Entypo } from "@expo/vector-icons";
import { API, AUTH } from "../context/AuthContext";

const UpdateBlog = ({ visible, cancelBlog, d, getApi }) => {
  console.log(d)
  const {data}=useContext(AUTH)
  const {fetchApi}=useContext(API)
    const [title, setTitle]=useState('')
    const [description, setDescription]=useState('')
    useEffect(()=>{
        if(d){
            setTitle(d.title)
            setDescription(d.description)
        }
    }, [d])
    const handleEditing=async()=>{
      const fetchAp=await fetch(`http://192.168.1.68:8000/blog/updateblog/${d._id}`, {
        method:"PUT",
        headers:{
          Authorization:'Bearer '+ data.token,
          'Content-Type':"application/json"
        },
        body:JSON.stringify({title, description})
      })
      const result=await fetchAp.json()
      if(result.status==true){
        fetchApi()
        getApi()
        Alert.alert(result.message)
      }
      else{
        Alert.alert(result.message)
      }
    }
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 250,
            height: 210,
            elevation: 20,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <View></View>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
              Update Blog
            </Text>
            <TouchableOpacity onPress={cancelBlog}>
              <Entypo name="circle-with-cross" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: "grey" }}></View>
          <View>
            <TextInput
              placeholder="Title"
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 4,
                marginVertical: 10,
                height: 40,
              }}
              value={title}
              onChangeText={(e)=>setTitle(e)}
            />
            <TextInput
              placeholder="Description"
              style={{
                borderWidth: 1,
                borderRadius: 5,
                padding: 4,
                marginVertical: 10,
                height: 40,
              }}
              value={description}
              onChangeText={(e)=>setDescription(e)}
            />
            <SubmitButton title="Update" handleSubmit={handleEditing} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateBlog;
