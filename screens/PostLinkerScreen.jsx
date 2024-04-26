import { View, Text, Button, SafeAreaView } from "react-native";
import React from "react";

export default function PostLinkerScreen({ navigation }) {
  return (
    <SafeAreaView style={{ paddingHorizontal: 10 }}>
      <Text>PostLinkerScreen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </SafeAreaView>
  );
}
