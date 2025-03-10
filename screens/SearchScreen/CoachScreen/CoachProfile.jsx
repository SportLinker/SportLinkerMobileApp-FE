import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../../component/style";

export default function CoachProfile() {
  return (
    <View style={[styles.centerStyle, { padding: 20 }]}>
      <View style={styles.profileCoach}>
        <View>
          <View style={styles.bottomInfoSport}>
            <View style={styles.centerStyle}>
              <Text style={{ color: "#707070", paddingBottom: 8 }}>
                Trình độ (Tự đánh giá)
              </Text>
              <Text style={{ fontWeight: "bold" }}>Chuyên nghiệp</Text>
            </View>
            <View style={styles.centerStyle}>
              <Text style={{ color: "#707070", paddingBottom: 8 }}>Vị trí</Text>
              <Text style={{ fontWeight: "bold" }}>Libero</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
