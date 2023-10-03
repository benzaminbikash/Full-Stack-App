import { View, Text, Image, TextInput, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { AUTH } from "../context/AuthContext";
import SubmitButton from "../components/SubmitButton";

const Profile = () => {
  const { data, setData } = useContext(AUTH);
  const [name, setName] = useState(data.user.name);
  const [email, setEmail] = useState(data.user.email);
  const [role, setRoll] = useState(data.user.role);
  const handleSubmit = async () => {
    const fetchApi = await fetch("http://192.168.1.68:8000/update", {
      method: "put",
      headers: {
        Authorization: "Bearer " + data.token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
      }),
    });
    const d = await fetchApi.json();
    console.log(d);
    if (d.status == true) {
      Alert.alert(d.message);
      setData(d)
    } else {
      Alert.alert(d.message);
    }
  };
  return (
    <View>
      <Image
        source={{ uri: "https://i.pinimg.com/564x/27/01/7f/27017f7c507f8d045c48dc545c462159.jpg" }}
        style={{ width: 120, height: 120, borderRadius: 120, alignSelf: "center", marginTop: 30 }}
      />
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", fontSize: 15, fontWeight: "bold" }}>
          You can update only name now!
        </Text>
        <View style={{ flexDirection: "row", gap: 30, alignItems: "center", marginVertical: 10 }}>
          <Text style={{ width: 40 }}>Name</Text>
          <TextInput
            style={{
              backgroundColor: "white",
              width: 275,
              height: 35,
              elevation: 13,
              paddingLeft: 10,
            }}
            value={name}
            onChangeText={(e) => setName(e)}
          />
        </View>
        <View style={{ flexDirection: "row", gap: 30, alignItems: "center", marginVertical: 10 }}>
          <Text style={{ width: 40 }}>Email</Text>
          <TextInput
            style={{
              paddingLeft: 10,
              backgroundColor: "white",
              width: 275,
              height: 35,
              elevation: 13,
            }}
            value={email}
            editable={false}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 30, alignItems: "center", marginVertical: 10 }}>
          <Text style={{ width: 40 }}>Roll</Text>
          <TextInput
            style={{
              paddingLeft: 10,
              backgroundColor: "white",
              width: 275,
              height: 35,
              elevation: 13,
            }}
            value={role}
            editable={false}
          />
        </View>
        <SubmitButton title="Update" handleSubmit={handleSubmit} />
      </View>
    </View>
  );
};

export default Profile;
