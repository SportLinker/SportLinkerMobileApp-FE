import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
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
      </Stack.Navigator>
    </>
  );
}
