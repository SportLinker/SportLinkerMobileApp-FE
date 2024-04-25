import { View, Text, Button } from "react-native";
import React from "react";

export default function PostLinkerScreen({ navigation }) {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text>PostLinkerScreen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
  );
}
