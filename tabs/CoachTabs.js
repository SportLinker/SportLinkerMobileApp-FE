import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CoachScreen from "../screens/SearchScreen/CoachScreen/CoachScreen";
import CoachTabView from "../screens/SearchScreen/CoachScreen/CoachTabView";

export default function CoachTabs() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator initialRouteName="CoachScreen">
        <Stack.Screen
          name="CoachScreen"
          component={CoachScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="CoachTabView"
          component={CoachTabView}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
