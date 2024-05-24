import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventMember from "../screens/SearchScreen/EventScreen/EventMember";
import EventDetail from "../screens/SearchScreen/EventScreen/EventDetail";
import { useEffect } from "react";
import { Text, View } from "react-native";

const TopTab = createMaterialTopTabNavigator();

const EventDetailTabs = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#1646A9" }}>16:30 thứ tư, 22/5</Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Football với Thăng Long
          </Text>
        </View>
      ),
      headerTitleAlign: "center",
    });
  }, [navigation]);
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#707070",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
      }}
      initialRouteName="Info"
    >
      <TopTab.Screen
        name="Info"
        component={EventDetail}
        options={{
          tabBarLabel: "Chi tiết",
        }}
      />
      <TopTab.Screen
        name="Members"
        component={EventMember}
        options={{
          tabBarLabel: "Người tham gia",
        }}
      />
    </TopTab.Navigator>
  );
};

export default EventDetailTabs;
