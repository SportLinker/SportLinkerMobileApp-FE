// BottomTabNavigator.js
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Import screen components
import { Image } from "react-native";
import AccountTabs from "./AccountTabs";
import ChatTabs from "./ChatTabs";
import HomeTabs from "./HomeTabs";
import SearchTopTabNavigator from "./SearchTopTabNavigator";
import { color } from "react-native-elements/dist/helpers";
import UpgradeScreen from "../screens/UpgradeScreen/UpgradeScreen";
import { useSelector } from "react-redux";
import { getUserSelector } from "../redux/selectors";
import defaultAvatar from "../assets/avatar_default.png";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const userSelector = useSelector(getUserSelector);
  const [image, setImage] = useState(userSelector.avatar_url);

  useEffect(() => {
    if (!userSelector.avatar_url) {
      setImage(defaultAvatar);
    } else {
      setImage(userSelector.avatar_url);
    }
  }, [userSelector.avatar_url]);

  return (
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
      {/* <Tab.Screen
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
      /> */}
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
              source={image === defaultAvatar ? image : { uri: image }}
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
};
export default BottomTabNavigator;
