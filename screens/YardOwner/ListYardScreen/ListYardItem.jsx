import React from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../../../component/style";

const ListYardItem = ({ data }) => {
  const renderItem = ({ item: yard }) => (
    <View key={yard.yard_id} style={styles.containerYard}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginHorizontal: "auto",
          padding: 10,
        }}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#4878d9",
              padding: 5,
              marginHorizontal: "auto",
            }}
          >
            {yard.yard_name}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#5f6d7a",
              marginHorizontal: "auto",
              marginVertical: 10,
            }}
          >
            {yard.yard_description}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ paddingBottom: 10, paddingHorizontal: 5 }}>
              Môn thể thao:
            </Text>
            <Text style={{ fontWeight: "bold" }}>{yard.yard_sport}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text style={{ paddingBottom: 10, paddingHorizontal: 5 }}>
              Giá thuê:
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              {yard.price_per_hour} VNĐ/giờ
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ marginTop: 20, marginHorizontal: "auto" }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.yard_id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ListYardItem;
