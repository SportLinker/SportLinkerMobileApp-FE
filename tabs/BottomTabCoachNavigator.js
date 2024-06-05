// BottomTabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import { Image } from "react-native";
import HomeCoachScreen from "../screens/Coach/HomeCoach/HomeCoach";
import AccountTabs from "./AccountTabs";
import ChatTabs from "./ChatTabs";

const Tab = createBottomTabNavigator();

const BottomTabCoachNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeCoach"
    screenOptions={{
      tabBarActiveTintColor: "#4878D9",
      tabBarInactiveTintColor: "black",
      tabBarLabelStyle: {
        fontSize: 12,
      },
    }}
  >
    <Tab.Screen
      name="HomeCoach"
      component={HomeCoachScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Icon name={"home-outline"} color={color} size={size + 5} />
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
      component={AccountTabs}
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

export default BottomTabCoachNavigator;
