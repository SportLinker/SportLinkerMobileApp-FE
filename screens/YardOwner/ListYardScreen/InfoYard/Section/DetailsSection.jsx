import React from "react";
import { View, Text } from "react-native";
import {
  Entypo,
  FontAwesome,
  Feather,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

export function DetailsSection({ yardPrice, openTime, openDay }) {
  return (
    <View style={{ marginVertical: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Feather
          name="clock"
          size={30}
          color="black"
          style={{ marginHorizontal: 29 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {openTime} | {openDay}
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <FontAwesome5
          name="coins"
          size={30}
          color="black"
          style={{ marginHorizontal: 30 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>Mức giá</Text>
          <Text style={{ marginHorizontal: 6 }}>●</Text>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>{yardPrice}</Text>
        </View>
      </View>
    </View>
  );
}
