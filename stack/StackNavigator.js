// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screen components
import EditAccountScreen from "../screens/AccountScreen/EditAccountScreen";
import PasswordScreen from "../screens/AccountScreen/PasswordScreen";
import ChatDetail from "../screens/ChatScreen/ChatDetail";
import ListLikeScreen from "../screens/HomeScreen/ListLikeScreen";
import LoginScreen from "../screens/LoginScreen";
import OTPInputScreen from "../screens/OTPScreen";
import PostLinkerScreen from "../screens/PostLinkerScreen/PostLinkerScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DetailCoachScreen from "../screens/SearchScreen/CoachScreen/DetailCoachScreen";
import DetailYardScreen from "../screens/SearchScreen/YardScreen/DetailYardScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import BottomTabNavigator from "../tabs/BottomTabNavigator";
import EventDetailTabs from "../tabs/EventDetailTabs";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      options={{
        headerShown: false,
      }}
      component={WelcomeScreen}
    />
    <Stack.Screen
      name="Login"
      options={{
        headerShown: false,
      }}
      component={LoginScreen}
    />
    <Stack.Screen
      name="Register"
      options={{
        headerShown: false,
      }}
      component={RegisterScreen}
    />
    <Stack.Screen
      name="OTPScreen"
      options={{
        headerShown: false,
      }}
      component={OTPInputScreen}
    />
    <Stack.Screen
      name="BottomTabs"
      options={{
        headerShown: false,
      }}
      component={BottomTabNavigator}
    />
    <Stack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{
        title: "Thông Báo",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="ChatDetailScreen"
      options={{
        headerShown: false,
      }}
      component={ChatDetail}
    />
    <Stack.Screen
      name="EventDetailScreen"
      options={{
        title: "Event Detail",
      }}
      component={EventDetailTabs}
    />
    <Stack.Screen
      name="EditAccountScreen"
      component={EditAccountScreen}
      options={{
        title: "",
        headerMode: "screen",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="PasswordScreen"
      component={PasswordScreen}
      options={{
        title: "",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="DetailCoachScreen"
      component={DetailCoachScreen}
      options={{
        title: "Chi Tiết Huấn Luyện Viên",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="ListLikeScreen"
      component={ListLikeScreen}
      options={{
        headerShown: false,
        headerLeft: () => null,
      }}
    />
    <Stack.Screen
      name="DetailYardScreen"
      component={DetailYardScreen}
      options={{
        title: "Chi Tiết Sân",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="PostLinkerScreen"
      component={PostLinkerScreen}
      options={{
        title: "Tạo bài đăng",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
