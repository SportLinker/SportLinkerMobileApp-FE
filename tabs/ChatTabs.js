import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ChatListScreen from "../screens/ChatScreen/ChatListScreen";

export default function ChatTabs() {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        initialRouteName="ChatListScreen"
        options={{
          headerShown: false,
          headerLeft: () => null, // This will remove the left button
        }}
      >
        <Stack.Screen
          name="ChatListScreen"
          component={ChatListScreen}
          options={{
            headerShown: false,
            headerLeft: () => null, // This will remove the left button
          }}
        />
      </Stack.Navigator>
    </>
  );
}
