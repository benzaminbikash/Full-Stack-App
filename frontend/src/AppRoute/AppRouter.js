import React, { useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Entypo } from "@expo/vector-icons";
import Post from "../screens/Post";
import About from "../screens/auth/About";
const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH } from "../context/AuthContext";
import Logout from "../components/Logout";
import MyPost from "../screens/MyPost";

const AppRouter = () => {
  const {data} = useContext(AUTH);
  const authentication = data?.user && data?.token;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          animation: "none",
        }}
      >
        {authentication ? (
          <Stack.Screen
            name="main"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "home") {
            (iconName = "home"), (color = focused ? "black" : "grey"), (size = focused ? 25 : 20);
          } else if (route.name == "profile") {
            (iconName = "user"), (color = focused ? "black" : "grey"), (size = focused ? 25 : 20);
          } else if (route.name == "post") {
            (iconName = "squared-plus"),
              (color = focused ? "black" : "grey"),
              (size = focused ? 25 : 20);
          } else if (route.name == "mypost") {
            (iconName = "text-document"), (color = focused ? "black" : "grey"), (size = focused ? 25 : 20);
          }
          return <Entypo name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 5,
          margin: 10,
          borderRadius: 40,
          height: 55,
        },
      tabBarHideOnKeyboard:true
      })}
    >
      <Bottom.Screen
        name="home"
        component={Home}
        options={{
          title: "Full Stack App",
          headerTitleAlign: "center",
          headerRight: () => <Logout/>,
        }}
      />
      <Bottom.Screen name="post" component={Post} options={{
        title:'Add Post',
        headerTitleAlign:'center'
      }} />
      <Bottom.Screen name="mypost" component={MyPost}  options={{
        title:'My Post',
        headerTitleAlign:'center'
      }} />
      <Bottom.Screen name="profile" component={Profile}  options={{
        title:'Profile',
        headerTitleAlign:'center'
      }} />
    </Bottom.Navigator>
  );
};

export default AppRouter;
