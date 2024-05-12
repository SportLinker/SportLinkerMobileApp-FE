import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import EditAccountScreen from "../screens/AccountScreen/EditAccountScreen";

export default function AccountTabs() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName="AccountScreen"
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
      >
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="EditAccountScreen"
          component={EditAccountScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
