// SearchTopTabNavigator.js
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import EventScreen from "../screens/SearchScreen/EventScreen/EventScreen";
import CoachScreen from "../screens/SearchScreen/CoachScreen/CoachScreen";
import ClubScreen from "../screens/ChatScreen/ClubScreen";
import PlayerScreen from "../screens/SearchScreen/PlayerScreen/PlayerScreen";
import YardScreen from "../screens/SearchScreen/YardScreen";
import SearchInputDynamic from "../component/SearchInputDynamic";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import PlayerTabs from "./PlayerTabs";
import CoachTabs from "./CoachTabs";

const TopTab = createMaterialTopTabNavigator();

const SearchTopTabNavigator = () => {
  const navigationState = useNavigationState((state) => state); // Get the navigation state
  const activeRouteName = navigationState;

  return (
    <>
      <SearchInputDynamic />

      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#4878D9",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        initialRouteName="Event"
      >
        <TopTab.Screen
          name="Club"
          component={ClubScreen}
          options={{
            tabBarLabel: "CLB",
            tabBarIcon: ({ color }) => (
              <Icon
                name="account-supervisor"
                size={15}
                color={color}
                style={{ marginTop: 10, textAlign: "center" }} // Adjust the marginTop to center the icon
              />
            ),
          }}
        />
        <TopTab.Screen
          name="Events"
          component={EventScreen}
          options={{
            tabBarLabel: "Kèo",
            tabBarIcon: ({ color }) => (
              <Icon
                name="calendar-search"
                size={15}
                color={color}
                style={{ marginTop: 10, textAlign: "center" }} // Adjust the marginTop to center the icon
              />
            ),
          }}
        />
        <TopTab.Screen
          name="Players"
          component={PlayerTabs}
          O
          options={{
            tabBarLabel: "Người",
            tabBarIcon: ({ color }) => (
              <Icon
                name="account"
                size={15}
                color={color}
                style={{ marginTop: 10, textAlign: "center" }} // Adjust the marginTop to center the icon
              />
            ),
          }}
        />
        <TopTab.Screen
          name="Yard"
          component={YardScreen}
          options={{
            tabBarLabel: "Sân",
            tabBarIcon: ({ color }) => (
              <Icon
                name="calendar-text-outline"
                size={15}
                color={color}
                style={{ marginTop: 10, textAlign: "center" }} // Adjust the marginTop to center the icon
              />
            ),
          }}
        />
        <TopTab.Screen
          name="Coaches"
          component={CoachTabs}
          options={{
            tabBarLabel: "HLV",
            tabBarIcon: ({ color }) => (
              <Icon
                name="account-plus"
                size={15}
                color={color}
                style={{ marginTop: 10, textAlign: "center" }} // Adjust the marginTop to center the icon
              />
            ),
          }}
        />
      </TopTab.Navigator>
    </>
  );
};

export default SearchTopTabNavigator;
