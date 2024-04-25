// NewsScreen.js
import React from "react";
import { View, Text, Button, Platform } from "react-native";

const NewsScreen = ({ navigation }) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text>News Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
};

export default NewsScreen;
