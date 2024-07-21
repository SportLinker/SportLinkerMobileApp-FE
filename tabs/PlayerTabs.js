import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DetailPlayerScreen from "../screens/SearchScreen/PlayerScreen/DetailPlayerScreen";
import PlayerScreen from "../screens/SearchScreen/PlayerScreen/PlayerScreen";

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
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
