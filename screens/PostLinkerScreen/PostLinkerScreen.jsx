import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PostLinkerScreen({ navigation }) {
  return (
    <SafeAreaView style={{ paddingHorizontal: 10, flex: 1 }}>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Avatar.Image
          size={50}
          source={{
            uri: "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
          }}
        />
        <Button
          contentStyle={{ flexDirection: "row-reverse" }}
          labelStyle={{ fontWeight: "bold" }}
          onPress={() => console.log("Pressed")}
          mode="outlined"
          icon="chevron-down"
          style={{ borderRadius: 5 }}
        >
          Công khai
        </Button>
      </View>
    </SafeAreaView>
  );
}
