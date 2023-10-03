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
import React, { useState } from "react";
import COLORS from "../../constants/Colors";
import InputBox from "../../components/InputBox";
import SubmitButton from "../../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation=useNavigation()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit =async () => {
    if (!name || !email || !password) {
      setLoading(true);
      Alert.alert("All field is required");
      setLoading(false);
    } else {
      setLoading(true);
      const data=await fetch('http://192.168.1.68:8000/create', {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name, email, password
        })
      })
      const d=await data.json()
      if(d.status===false){
        Alert.alert(d.message)
      }
      else{
        setName('')
        setEmail('')
        setPassword('')
        Alert.alert(d.message)
      }
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        <Text style={styles.register}>Register</Text>
        <View>
          <InputBox title="Name" value={name} setValue={setName} />
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
          <Text style={styles.link}>Already Register?</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('login')}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
  bottomLink:{
    flexDirection:'row',
    marginTop:5,
    justifyContent:"center",
    gap:6
  },
  link: {
    fontSize:15,
    fontWeight:'500'
  },
  login: {
    fontSize:15,
    fontWeight:'500',
    color:'blue',
    textDecorationLine:'underline'
  },
});
