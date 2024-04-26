// HomeScreen.js
import React from "react";
import { View, Text, Button, Platform, SafeAreaView } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ paddingHorizontal: 10 }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Post Linker"
        onPress={() => navigation.navigate("PostLinkerScreen")}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
