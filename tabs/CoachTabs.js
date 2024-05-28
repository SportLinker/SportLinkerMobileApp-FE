import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CoachScreen from "../screens/SearchScreen/CoachScreen/CoachScreen";

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
      </Stack.Navigator>
    </>
  );
}
