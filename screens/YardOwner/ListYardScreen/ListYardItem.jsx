import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../component/style";

const ListYardItem = ({ data }) => {
  const navigation = useNavigation();

  // console.log("data", data);

  return (
    <View style={{ marginTop: 20, marginHorizontal: "auto" }}>
      {data.map((yard) => (
        <TouchableOpacity
          key={yard.id}
          style={styles.containerYard}
          onPress={() =>
            navigation.navigate("InfoYard", {
              yardName: yard.yardName,
              yardDescription: yard.description,
              yardPrice: yard.price,
              openTime: yard.openTime,
              openDay: yard.openDay,
              yardImage: yard.image,
            })
          }
        >
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
                  paddingHorizontal: 5,
                }}
              >
                {yard.yardName}
              </Text>
              <Text style={{ paddingBottom: 10, paddingHorizontal: 5 }}>
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
};

export default ListYardItem;
