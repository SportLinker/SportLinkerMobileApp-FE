// HomeScreen.js
import React from "react";
import { View, Text, Button, Platform } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Post Linker"
        onPress={() => navigation.navigate("PostLinkerScreen")}
      />
    </View>
  );
};

export default HomeScreen;
