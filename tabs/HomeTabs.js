import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import PostLinkerScreen from "../screens/PostLinkerScreen";

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
      </Stack.Navigator>
    </>
  );
}
