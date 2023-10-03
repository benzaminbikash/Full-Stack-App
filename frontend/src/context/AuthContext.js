import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AUTH = createContext();
export const API = createContext();

const AuthContext = ({ children }) => {
  const [data, setData] = useState({
    user: null,
    token: "",
  });
  const GetToken = async () => {
    try {
      let d = await AsyncStorage.getItem("auth");
      let value = JSON.parse(d);
      setData({ ...data, user: value?.user, token: value?.token });
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    GetToken();
  }, []);

  //for api:
  const [api, setApi] = useState([]);
  const fetchApi=async()=>{
    const response=await fetch('http://192.168.1.68:8000/blog/all')
    const value=await response.json()
    setApi(value.blogs)
  }
  useEffect(()=>{
    fetchApi()
  }, [])
  return (
    <AUTH.Provider value={{ data, setData }}>
      <API.Provider value={{ api, fetchApi }}>{children}</API.Provider>
    </AUTH.Provider>
  );
};

export default AuthContext;
