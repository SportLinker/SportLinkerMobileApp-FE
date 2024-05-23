import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../../component/style";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function YardItem({ data }) {
  return (
    <View style={{ marginTop: 20, marginHorizontal: "auto" }}>
      {data.map((yard) => (
        <TouchableOpacity style={styles.containerYard}>
          <View key={yard.id}>
            <Image source={{ uri: yard.image }} style={styles.imageYard} />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#4878d9" }}
              >
                {yard.yardName}
              </Text>
              <Text>
                Địa điểm:{" "}
                <Text style={{ fontWeight: "bold" }}>{yard.location}</Text>
              </Text>
              <Text>
                Thời gian:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {yard.openTime} | {yard.openDay}
                </Text>
              </Text>
            </View>
            <View style={{ marginVertical: "auto" }}>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
