import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export function DetailsSection({ stadiumDetail }) {
  return (
    <View style={{ marginVertical: 20, padding: 15 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Entypo
          name="location-pin"
          size={30}
          color="black"
          style={{ marginHorizontal: 20 }}
        />

        <Text style={{ fontSize: 16, paddingRight: 50 }}>
          {stadiumDetail.stadium_address}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <Feather
          name="clock"
          size={30}
          color="black"
          style={{ marginHorizontal: 20 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>{stadiumDetail.stadium_time}</Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <AntDesign
          name="star"
          size={30}
          color="#F9A825"
          style={{ marginHorizontal: 20 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>Lượt thích</Text>
          <Text style={{ marginHorizontal: 6 }}>●</Text>
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: 700 }}>
              {stadiumDetail.stadium_rating}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
