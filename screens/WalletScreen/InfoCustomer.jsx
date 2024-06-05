import { View, Text } from "react-native";
import React from "react";

export default function InfoCustomer() {
  return (
    <View
      style={{
        alignItems: "center",
        width: "95%",
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingVertical: 15,
        marginVertical: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 25,
        }}
      >
        <Text style={{ color: "#838383", fontSize: 16 }}>Nhà cung cấp</Text>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          SportLinker
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 25,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#838383", fontSize: 16 }}>Mã khách hàng</Text>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          SL1234567890
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 25,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#838383", fontSize: 16 }}>Tên khách hàng</Text>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          Võ Tấn Tài
        </Text>
      </View>
    </View>
  );
}
