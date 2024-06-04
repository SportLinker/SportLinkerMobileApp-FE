import { View, Text } from "react-native";
import React from "react";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

export default function InfoPayment() {
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
          borderRadius: 15,
          borderWidth: 1,
          width: "90%",
          paddingVertical: 5,
        }}
      >
        <MaterialIcons
          name="upgrade"
          size={40}
          color="green"
          style={{ marginVertical: "auto", paddingHorizontal: 20 }}
        />
        <View>
          <Text style={{ color: "#a7a7a7", fontSize: 20, fontWeight: 500 }}>
            {"Upgrade Premium".toUpperCase()}
          </Text>
          <Text
            style={{
              color: "#5BD027",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            33.000đ
          </Text>
        </View>
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
        <Text style={{ color: "#838383", fontSize: 16 }}>Trạng thái</Text>
        <Text
          style={{
            backgroundColor: "#00ff61",
            textAlign: "center",
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 20,
            fontWeight: 700,
            color: "#008000",
          }}
        >
          Thành công
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
        <Text style={{ color: "#838383", fontSize: 16 }}>Thời gian</Text>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          13:30 - 05/01/2023
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
        <Text style={{ color: "#838383", fontSize: 16 }}>Mã giao dịch</Text>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          123456789
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
        <Text style={{ color: "#838383", fontSize: 16 }}>Tài khoản</Text>
        <Text
          style={{
            fontWeight: 700,
          }}
        >
          Ví SportLinker
        </Text>
      </View>
    </View>
  );
}
