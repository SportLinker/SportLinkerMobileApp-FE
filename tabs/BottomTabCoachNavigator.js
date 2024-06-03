// BottomTabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import { Image } from "react-native";
import AccountTabs from "./AccountTabs";
import ChatTabs from "./ChatTabs";
import HomeTabs from "./HomeTabs";
import SearchTopTabNavigator from "./SearchTopTabNavigator";
import HomeYardOwnerScreen from "../screens/YardOwner/HomeYardOwnerScreen";
import HomeCoach from "../screens/Coach/HomeCoach";
import WithDraw from "../screens/Coach/WithDrawScreen";

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
      component={HomeCoach}
      options={{
        headerShown: false,
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Icon name={"home-outline"} color={color} size={size + 5} />
        ),
      }}
    />
    <Tab.Screen
      name="WithDrawCoachScreen"
      component={WithDraw}
      options={{
        headerShown: false,
        tabBarLabel: "Rút Tiền",
        tabBarIcon: ({ color, size }) => (
          <Icon name={"home-outline"} color={color} size={size + 5} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabCoachNavigator;
