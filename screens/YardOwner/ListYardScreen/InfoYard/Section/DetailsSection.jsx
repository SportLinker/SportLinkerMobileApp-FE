import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export function DetailsSection({ yardDetail }) {
  return (
    <View style={{ marginVertical: 20 }}>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <AntDesign
          name="inbox"
          size={30}
          color="black"
          style={{ marginHorizontal: 30 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Môn thể thao</Text>
          <Text style={{ marginHorizontal: 6 }}>●</Text>
          <Text style={{ fontSize: 16 }}>
            {yardDetail ? yardDetail.yard_sport : "Loading..."}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <FontAwesome5
          name="coins"
          size={30}
          color="black"
          style={{ marginHorizontal: 30 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Giá thuê</Text>
          <Text style={{ marginHorizontal: 6 }}>●</Text>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>
            {yardDetail ? yardDetail.price_per_hour : "Loading..."} VNĐ/giờ
          </Text>
        </View>
      </View>
    </View>
  );
}
