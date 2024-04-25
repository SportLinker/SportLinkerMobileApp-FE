import { View, Text, Button } from "react-native";
import React from "react";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Text>RegisterScreen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}
