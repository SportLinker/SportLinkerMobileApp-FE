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
import { color } from "react-native-elements/dist/helpers";
import UpgradeScreen from "../screens/UpgradeScreen/UpgradeScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: "#4878D9",
      tabBarInactiveTintColor: "black",
      tabBarLabelStyle: {
        fontSize: 12,
      },
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
      name="Upgrade"
      component={UpgradeScreen}
      options={{
        headerShown: false,
        tabBarLabel: "Nâng Cấp",
        tabBarIcon: ({ color, size }) => (
          <Icon
            name={"arrow-up-bold-box-outline"}
            color={color}
            size={size + 5}
          />
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

export default BottomTabNavigator;
