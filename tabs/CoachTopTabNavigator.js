import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CoachProfile from "../screens/SearchScreen/CoachScreen/CoachProfile";
import CoachMatch from "../screens/SearchScreen/CoachScreen/CoachMatch";
import CoachTrain from "../screens/SearchScreen/CoachScreen/CoachTrain";
import { Text, View } from "react-native";

const TopTab = createMaterialTopTabNavigator();

const CoachTopTabNavigator = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4878D9",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        lazy: true,
        lazyPlaceholder: () => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading...</Text>
          </View>
        ),
      }}
      initialRouteName="Hồ sơ"
    >
      <TopTab.Screen name="Hồ sơ" component={CoachProfile} />
      <TopTab.Screen name="Trận đấu" component={CoachMatch} />
      <TopTab.Screen name="Huấn luyện" component={CoachTrain} />
    </TopTab.Navigator>
  );
};

export default CoachTopTabNavigator;
