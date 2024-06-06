import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

const fields = [
  { id: "1", name: "Sân A" },
  { id: "2", name: "Sân B" },
  // Thêm các sân khác vào đây
];

const OrderYardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={fields}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldName}>{item.name}</Text>
            <Button
              title="Xem lịch đặt"
              color="#1E90FF"
              onPress={() =>
                navigation.navigate("Booking", { fieldId: item.id })
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  fieldContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
});

export default OrderYardScreen;
