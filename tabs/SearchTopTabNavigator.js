// SearchTopTabNavigator.js
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import { useNavigationState } from "@react-navigation/native";
import SearchInputDynamic from "../component/SearchInputDynamic";
import EventScreen from "../screens/SearchScreen/EventScreen/EventScreen";
import YardScreen from "../screens/SearchScreen/YardScreen/YardScreen";
import CoachTabs from "./CoachTabs";
import PlayerTabs from "./PlayerTabs";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { color } from "react-native-elements/dist/helpers";

const TopTab = createMaterialTopTabNavigator();

const SearchTopTabNavigator = () => {
  const navigationState = useNavigationState((state) => state); // Get the navigation state
  const activeRouteName = navigationState;
  const [activeTab, setActiveTab] = useState("match"); // save the active tab: match, user, yard, coach

  return (
    <>
      <SearchInputDynamic />

      <View style={styles.filterTab}>
        <TouchableOpacity
          style={[
            styles.textWrapper,
            activeTab == "match" && styles.activeTextWrapper,
          ]}
          onPress={() => {
            setActiveTab("match");
          }}
        >
          <Icon
            name="calendar-search"
            size={16}
            style={[styles.tabIcon, activeTab == "match" && styles.activeText]}
          />
          <Text
            style={[styles.boldText, activeTab == "match" && styles.activeText]}
          >
            KÈO
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab("user");
          }}
          style={[
            styles.textWrapper,
            activeTab == "user" && styles.activeTextWrapper,
          ]}
        >
          <Icon
            name="account"
            size={16}
            style={[styles.tabIcon, activeTab == "user" && styles.activeText]}
          />
          <Text
            style={[styles.boldText, activeTab == "user" && styles.activeText]}
          >
            NGƯỜI
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab("yard");
          }}
          style={[
            styles.textWrapper,
            activeTab == "yard" && styles.activeTextWrapper,
          ]}
        >
          <Icon
            name="calendar-text-outline"
            size={16}
            style={[styles.tabIcon, activeTab == "yard" && styles.activeText]}
          />
          <Text
            style={[styles.boldText, activeTab == "yard" && styles.activeText]}
          >
            SÂN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setActiveTab("coach");
          }}
          style={[
            styles.textWrapper,
            activeTab == "coach" && styles.activeTextWrapper,
          ]}
        >
          <Icon
            name="account-plus"
            size={16}
            style={[styles.tabIcon, activeTab == "coach" && styles.activeText]}
          />
          <Text
            style={[styles.boldText, activeTab == "coach" && styles.activeText]}
          >
            HLV
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab == "match" && <EventScreen />}
      {activeTab == "user" && <PlayerTabs />}
      {activeTab == "yard" && <YardScreen />}
      {activeTab == "coach" && <CoachTabs />}
    </>
  );
};

const styles = StyleSheet.create({
  filterTab: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
  },
  textWrapper: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
  },
  boldText: {
    fontSize: 12,
  },
  activeText: {
    color: "blue",
  },
  activeTextWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  tabIcon: { marginTop: 10, textAlign: "center" },
});

export default SearchTopTabNavigator;
