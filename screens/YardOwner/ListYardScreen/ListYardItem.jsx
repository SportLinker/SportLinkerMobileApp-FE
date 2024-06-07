import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../component/style";
import { useNavigation } from "@react-navigation/native";

export default function ListYardItem({ data }) {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 20, marginHorizontal: "auto" }}>
      {data.map((yard) => (
        <TouchableOpacity
          key={yard.id}
          style={styles.containerYard}
          onPress={() => navigation.navigate("DetailYardScreen")}
        >
          <View>
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
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#4878d9",
                  paddingVertical: 5,
                }}
              >
                {yard.yardName}
              </Text>
              <Text style={{ paddingBottom: 10 }}>
                Thời gian:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {yard.openTime} | {yard.openDay}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
