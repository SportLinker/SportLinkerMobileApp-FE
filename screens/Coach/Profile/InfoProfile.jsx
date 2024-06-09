import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../component/style";

export const InfoProfile = ({ fakeData }) => {
  return (
    <>
      <View style={styles.topInfoSport}>
        <Text style={{ color: "#707070", fontWeight: "bold" }}>
          {"Thể thao".toUpperCase()}
        </Text>
        <Text style={{ color: "#4878D9", fontWeight: "bold" }}>Thêm</Text>
      </View>
      <View style={styles.centerStyle}>
        {fakeData.map((item) => (
          <View key={item.id} style={styles.innerInfoSport}>
            <View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginTop: 10,
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <FontAwesome6
                    name={item.icon}
                    size={24}
                    color="#000"
                    style={{ marginRight: 10 }}
                  />
                  <Text>{item.title}</Text>
                </View>
                <View>
                  <AntDesign name="right" size={24} color="#000" />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  borderColor: "#C4C4C4",
                }}
              />
              <View style={styles.bottomInfoSport}>
                <View style={styles.centerStyle}>
                  <Text style={{ color: "#707070" }}>
                    Trình độ (Tự đánh giá)
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>{item.level}</Text>
                </View>
                <View style={styles.centerStyle}>
                  <Text style={{ color: "#707070" }}>Vị trí</Text>
                  <Text style={{ fontWeight: "bold" }}>{item.position}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
