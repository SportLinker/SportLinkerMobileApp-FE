import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function WelcomeScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 2000);
  }, []);

  return (
    <View
      style={{
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            resizeMode: "contain",
            width: "90%",
          }}
          source={require("./../assets/logo.png")}
        />
        <ActivityIndicator animating={true} size="large" color="#1646A9" />
      </View>
    </View>
  );
}
