import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import MenuAccount from "../screens/AccountScreen/MenuAccount";
import CoachProfile from "../screens/Coach/Profile/CoachProfile";
import CourseSelectionModal from "../screens/Coach/Profile/SelectCourseModal/CourseSelectionModal";

export default function AccountCoachTabs() {
  const Stack = createStackNavigator();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Stack.Navigator initialRouteName="CoachProfile">
        <Stack.Screen
          name="CoachProfile"
          component={CoachProfile}
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
