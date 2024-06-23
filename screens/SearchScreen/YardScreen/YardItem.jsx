import { View, Image, StyleSheet, Text, ActivityIndicator } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../../component/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import DefaultImage from "../../../assets/default_img.png";

export default function YardItem({ data, loading }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 20, marginHorizontal: "auto" }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {data &&
            data.map((yard) => (
              <TouchableOpacity
                key={yard.id}
                style={styles.containerYard}
                onPress={() =>
                  navigation.navigate("DetailYardScreen", { stadium: yard })
                }
              >
                <View>
                  {yard.stadium_thumnail && yard.stadium_thumnail ? (
                    <Image
                      source={{ uri: yard.stadium_thumnail }}
                      style={styles.imageYard}
                    />
                  ) : (
                    <Image source={DefaultImage} style={styles.imageYard} />
                  )}
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                    padding: 5,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#4878d9",
                      }}
                    >
                      {yard.stadium_name} -{" "}
                      <Text style={{ color: "#000" }}>
                        {yard.distance.text}
                      </Text>
                    </Text>
                    <Text>
                      Địa điểm:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {yard.location}
                      </Text>
                    </Text>
                    <Text>
                      Thời gian:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {yard.stadium_time}
                      </Text>
                    </Text>
                  </View>
                  <View style={{ marginVertical: "auto" }}>
                    <AntDesign name="right" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </>
      )}
    </View>
  );
}
