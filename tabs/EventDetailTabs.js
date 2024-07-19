import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { getEventSelector } from "../redux/selectors";
import EventDetail from "../screens/SearchScreen/EventScreen/EventDetail";
import EventMember from "../screens/SearchScreen/EventScreen/EventMember";
import { convertUTCToVietnamTime } from "../utils";

const TopTab = createMaterialTopTabNavigator();

const EventDetailTabs = ({ navigation }) => {
  const eventDetail = useSelector(getEventSelector);
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
          <Text style={{ color: "#1646A9" }}>
            {" "}
            {convertUTCToVietnamTime(eventDetail.start_time)}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {eventDetail.match_name}
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
