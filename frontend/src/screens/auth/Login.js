import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import COLORS from "../../constants/Colors";
import InputBox from "../../components/InputBox";
import SubmitButton from "../../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH } from "../../context/AuthContext";
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {data, setData}=useContext(AUTH)
  const handleSubmit = async () => {
    if (!email || !password) {
      setLoading(true);
      Alert.alert("All field is required");
      setLoading(false);
    } else {
      setLoading(true);
      const data = await fetch("http://192.168.1.68:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const d = await data.json();
      setData(d)
      if (d.status === false) {
        Alert.alert(d.message);
      } else {
        await AsyncStorage.setItem("auth", JSON.stringify(d));
        Alert.alert(d.message);
        navigation.navigate('main')
      }
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <Text style={styles.register}>Login</Text>
        <View>
          <InputBox title="Email" keyboardType="email-address" value={email} setValue={setEmail} />
          <InputBox
            title="Password"
            secureTextEntry={true}
            value={password}
            setValue={setPassword}
          />
        </View>
        <SubmitButton title="Submit" loading={loading} handleSubmit={handleSubmit} />
        <View style={styles.bottomLink}>
          <Text style={styles.link}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("register")}>
            <Text style={styles.login}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: 'white',
  },
  register: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  bottomLink: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "center",
    gap: 6,
  },
  link: {
    fontSize: 15,
    fontWeight: "500",
  },
  login: {
    fontSize: 15,
    fontWeight: "500",
    color: "blue",
    textDecorationLine: "underline",
  },
});
