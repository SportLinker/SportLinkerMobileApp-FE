import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import MenuAccount from "../screens/AccountScreen/MenuAccount";

export default function AccountTabs() {
  const Stack = createStackNavigator();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Stack.Navigator initialRouteName="AccountScreen">
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={({ navigation }) => ({
            title: "",
            headerTintColor: "black",
            headerStyle: { backgroundColor: "#1646a9" },
            headerLeft: () => (
              <View style={{ marginLeft: 5 }}>
                <MaterialIcons
                  name="edit"
                  size={24}
                  color="white"
                  style={{ marginLeft: 15 }}
                  onPress={() => navigation.navigate("EditAccountScreen")}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{ marginRight: 20 }}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color="white"
                  onPress={() => setShowMenu(true)}
                />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
      <MenuAccount showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
}
