import React from "react";
import { View, Text } from "react-native";
import {
  Entypo,
  FontAwesome,
  Feather,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

export function DetailsSection({ rating, stadium }) {
  return (
    <View style={{ marginVertical: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Entypo
          name="location-pin"
          size={30}
          color="black"
          style={{ marginHorizontal: 25 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
            width: "70%",
          }}
        >
          <Text style={{ fontSize: 16 }}>{stadium.stadium_address}</Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <Feather
          name="clock"
          size={30}
          color="black"
          style={{ marginHorizontal: 25 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>{stadium.stadium_time}</Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <AntDesign
          name="star"
          size={30}
          color="#F9A825"
          style={{ marginHorizontal: 25 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>Đánh giá</Text>
          <Text style={{ marginHorizontal: 6 }}>●</Text>
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontWeight: 700 }}>
              {stadium.stadium_rating} ({stadium.total_rating} lượt đánh giá)
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
