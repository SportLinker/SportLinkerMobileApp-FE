import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CourtSelectionModalContent = ({ yards, handleBooking }) => {
  return (
    <View>
      {yards.map((yard) => (
        <TouchableOpacity
          key={yard.yard_id}
          style={styles.yardItem}
          onPress={() => handleBooking(yard)}
        >
          <Text style={styles.yardName}>{yard.yard_name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <Text style={styles.label}>Giới thiệu</Text>
            <Text style={styles.yardAddress}>{yard.yard_description}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Giá</Text>
            <Text style={styles.yardAddress}>
              {yard.price_per_hour} VNĐ/giờ
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  yardItem: {
    minWidth: "100%",
    marginBottom: 15,
    padding: 10,
    borderWidth: 5,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  yardName: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: "auto",
    marginBottom: 5,
  },
  yardAddress: {
    fontSize: 16,
    color: "#555",
  },
  label: { fontWeight: "bold" },
});

export default CourtSelectionModalContent;
