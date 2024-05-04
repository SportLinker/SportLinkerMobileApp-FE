// App.js
import React from "react";
import { Button, Platform, SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/LoginScreen";
import NewsScreen from "./screens/NewsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChatListScreen from "./screens/ChatScreen/ChatListScreen";

import HomeTabs from "./tabs/HomeTabs";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ChatTabs from "./tabs/ChatTabs";
import ChatDetail from "./screens/ChatScreen/ChatDetail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Authentabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#157cdb",
        tabBarInactiveTintColor: "#262626",
      }}
    >
      <Tab.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon name={"home-outline"} color={color} size={size + 5} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatTabs}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name={"chat-processing-outline"}
              color={color}
              size={size + 5}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider>
            <StatusBar style="dark" />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Login"
                options={{
                  headerShown: false,
                  headerLeft: () => null, // This will remove the left button
                }}
                screenOptions={{
                  cardStyle: {
                    flex: 1,
                    paddingTop:
                      Platform.OS === "ios" ? StatusBar.currentHeight : 40,
                  },
                }}
              >
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                    headerLeft: () => null, // This will remove the left button
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{
                    headerShown: false,
                    headerLeft: () => null, // This will remove the left button
                  }}
                />
                <Stack.Screen
                  name="Authentabs"
                  component={Authentabs}
                  options={{
                    headerShown: false,
                    headerLeft: () => null, // This will remove the left button
                  }}
                />
                <Stack.Screen
                  name="ChatDetailScreen"
                  component={ChatDetail}
                  options={{
                    headerShown: false,
                    headerLeft: () => null, // This will remove the left button
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
