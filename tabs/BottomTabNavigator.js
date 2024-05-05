// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import HomeTabs from "./HomeTabs";
import ChatTabs from "./ChatTabs";
import SearchTopTabNavigator from "./SearchTopTabNavigator";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "#4878D9", // Color when tab is selected
      inactiveTintColor: "black", // Color when tab is not selected
      labelStyle: { fontSize: 12 }, // Style for tab label
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeTabs}
      options={{
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Icon name={"home-outline"} color={color} size={size + 5} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchTopTabNavigator}
      options={{
        headerShown: false,
        tabBarLabel: "Tìm Kiếm",
        tabBarIcon: ({ color, size }) => (
          <Icon name={"magnify"} color={color} size={size + 5} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatTabs}
      options={{
        headerShown: false,
        tabBarLabel: "Chat",
        tabBarIcon: ({ color, size }) => (
          <Icon
            name={"chat-processing-outline"}
            color={color}
            size={size + 5}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Tài Khoản",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={{
              uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
            }}
            style={{
              height: size + 5,
              width: size + 5,
              borderRadius: size + 5,
            }}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
