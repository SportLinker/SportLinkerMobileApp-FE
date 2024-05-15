import { View, Text, ScrollView } from "react-native";
import React from "react";

export default function CoachTrain() {
  return (
    <View>
      <View style={{ marginVertical: 5 }}>
        <Text
          style={{
            fontWeight: 600,
            color: "#707070",
            fontSize: 16,
          }}
        >
          {"Kinh nghiệm".toUpperCase()}
        </Text>
        <Text
          style={{
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          15-year-old soccer player. University captain amateur teams and
          players in the US
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontWeight: 600,
            color: "#707070",
            fontSize: 16,
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
