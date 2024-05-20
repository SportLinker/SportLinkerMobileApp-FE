// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screen components
import EditAccountScreen from "../screens/AccountScreen/EditAccountScreen";
import PasswordScreen from "../screens/AccountScreen/PasswordScreen";
import ChatDetail from "../screens/ChatScreen/ChatDetail";
import LoginScreen from "../screens/LoginScreen";
import OTPInputScreen from "../screens/OTPScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DetailCoachScreen from "../screens/SearchScreen/CoachScreen/DetailCoachScreen";
import EventDetail from "../screens/SearchScreen/EventScreen/EventDetail";
import BottomTabNavigator from "../tabs/BottomTabNavigator";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Login">
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
      name="ChatDetailScreen"
      options={{
        headerShown: false,
      }}
      component={ChatDetail}
    />
    <Stack.Screen
      name="EventDetailScreen"
      options={{
        headerShown: false,
      }}
      component={EventDetail}
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
        title: "",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
