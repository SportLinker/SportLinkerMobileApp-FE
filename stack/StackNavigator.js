// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screen components
import EditAccountScreen from "../screens/AccountScreen/EditAccountScreen";
import PasswordScreen from "../screens/AccountScreen/PasswordScreen";
import ChatDetail from "../screens/ChatScreen/ChatDetail";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomTabNavigator from "../tabs/BottomTabNavigator";
import CoachTopTabNavigator from "../tabs/CoachTopTabNavigator";

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
      name="EditAccountScreen"
      component={EditAccountScreen}
      options={{
        headerShown: false,
        headerLeft: () => null,
      }}
    />
    <Stack.Screen
      name="PasswordScreen"
      component={PasswordScreen}
      options={{
        headerShown: false,
        headerLeft: () => null,
      }}
    />
    <Stack.Screen
      name="CoachTopTabs"
      component={CoachTopTabNavigator}
      options={{
        headerShown: false,
        headerLeft: () => null,
      }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
