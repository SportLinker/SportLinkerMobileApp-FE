import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function CoachTrain() {
  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginVertical: 5 }}>
        <Text
          style={{
            fontWeight: 600,
            color: "#707070",
            fontSize: 16,
            paddingBottom: 10,
          }}
        >
          {"Kinh nghiệm".toUpperCase()}
        </Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 16,
            paddingBottom: 10,
          }}
        >
          15-year-old volleyball player. University captain of amateur teams and
          players in the VN
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontWeight: 600,
            color: "#707070",
            fontSize: 16,
            paddingBottom: 10,
          }}
        >
          {"Mức phí huấn luyện".toUpperCase()}
        </Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          $100 an hour
        </Text>
      </View>
    </View>
  );
}
