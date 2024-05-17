import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlayerScreen from "../screens/SearchScreen/PlayerScreen/PlayerScreen";
import DetailPlayerScreen from "../screens/SearchScreen/PlayerScreen/DetailPlayerScreen";

export default function PlayerTabs() {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="PlayerScreen"
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
      >
        <Stack.Screen
          name="PlayerScreen"
          component={PlayerScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="DetailPlayerScreen"
          component={DetailPlayerScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
