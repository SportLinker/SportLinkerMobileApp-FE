// NewsScreen.js
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewsScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <Text>News Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("HomeScreen")}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
