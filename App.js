// App.js
import React from "react";
import { Button, Platform, SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/LoginScreen";
import NewsScreen from "./screens/NewsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeTabs from "./tabs/HomeTabs";
import { HomeOutlined, BellOutlined } from "@ant-design/icons-react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { PaperProvider } from "react-native-paper";

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
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
