import React from "react";
import { View, Text } from "react-native";
import {
  Entypo,
  FontAwesome,
  Feather,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

export function DetailsSection({ rating }) {
  return (
    <View style={{ marginVertical: 20 }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Entypo
          name="location-pin"
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
          <Text style={{ fontSize: 16, width: 300 }}>
            343/26 Nơ Trang Long, P13, Q Bình Thạnh, Ho Chi Minh City, Vietnam.
          </Text>
        </View>
      </View>
      {/* <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <FontAwesome
          name="phone"
          size={30}
          color="black"
          style={{ marginHorizontal: 33 }}
        />
        <View
          style={{
            marginVertical: "auto",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16 }}>Điện thoại</Text>
          <Text style={{ marginHorizontal: 6 }}>●</Text>
          <Text style={{ fontSize: 16, fontWeight: 700 }}>0123456789</Text>
        </View>
      </View> */}
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
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
          <Text style={{ fontSize: 16 }}>Thứ 2 - Thứ 7 | Mở cả ngày</Text>
        </View>
      </View>
      {/* <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
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
          <Text style={{ fontSize: 16, fontWeight: 700 }}>30000 vnđ</Text>
        </View>
      </View> */}
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <AntDesign
          name="star"
          size={30}
          color="#F9A825"
          style={{ marginHorizontal: 30 }}
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
            <Text style={{ fontWeight: 700 }}>{rating}</Text> (130 lượt thích)
          </Text>
        </View>
      </View>
    </View>
  );
}
