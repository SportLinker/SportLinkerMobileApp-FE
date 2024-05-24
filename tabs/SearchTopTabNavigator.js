// SearchTopTabNavigator.js
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import { useNavigationState } from "@react-navigation/native";
import SearchInputDynamic from "../component/SearchInputDynamic";
import EventScreen from "../screens/SearchScreen/EventScreen/EventScreen";
import YardScreen from "../screens/SearchScreen/YardScreen/YardScreen";
import CoachTabs from "./CoachTabs";
import PlayerTabs from "./PlayerTabs";

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
          swipeEnabled: false,
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        initialRouteName="Event"
      >
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
