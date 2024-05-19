import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

export const mock_data = [
  { id: 1, name: "Tai Vo", star: "true" },
  { id: 2, name: "Tai Vo", star: "false" },
  { id: 3, name: "Tai Vo", star: "false" },
  { id: 4, name: "Tai Vo", star: "true" },
  { id: 5, name: "Tai Vo", star: "false" },
  { id: 6, name: "Tai Vo", star: "true" },
  { id: 7, name: "Tai Vo", star: "false" },
  { id: 8, name: "Tai Vo", star: "true" },
  { id: 9, name: "Tai Vo", star: "false" },
];

export default function PlayerScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {mock_data.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                onPress={() => navigation.navigate("DetailPlayerScreen")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    marginLeft: 20,
                  }}
                >
                  <Avatar.Image
                    size={60}
                    source={{
                      uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
                    }}
                  />
                  <Text
                    style={{
                      marginHorizontal: 20,
                      fontSize: 20,
                      fontWeight: "600",
                    }}
                  >
                    {item.name}
                  </Text>
                  {item.star === "true" && (
                    <AntDesign name="star" size={24} color="#F9A825" />
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 10,
                  borderColor: "#C4C4C4",
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
