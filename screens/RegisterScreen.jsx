import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>RegisterScreen</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
}
