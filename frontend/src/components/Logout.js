import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { AUTH } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logout = () => {
    const {setData} = useContext(AUTH);
    const handleLogout = async () => {
      setData({ token: "", user: null });
      await AsyncStorage.removeItem("auth");
 
    };
  return (
    <TouchableOpacity style={{ paddingRight: 10 }} onPress={handleLogout}>
      <MaterialIcons name="logout" size={24} color="red" />
    </TouchableOpacity>
  )
}

export default Logout