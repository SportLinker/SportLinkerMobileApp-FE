import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PostLinkerScreen from "../screens/PostLinkerScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";

export default function HomeTabs() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        options={{
          headerShown: false,
          headerLeft: () => null, // This will remove the left button
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerLeft: () => null, // This will remove the left button
          }}
        />

        <Stack.Screen
          name="PostLinkerScreen"
          component={PostLinkerScreen}
          // options={{
          //   headerShown: false,
          //   headerLeft: () => null, // This will remove the left button
          // }}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            title: "Notification",
            headerStyle: { backgroundColor: "#1646a9" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </>
  );
}
