import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllYardSelector } from "../../../redux/selectors";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";

const OrderYardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const yardList = useSelector(getAllYardSelector);

  const [yards, setYard] = useState(null);

  useEffect(() => {
    dispatch(getAllYardByOwner());
  }, []);

  useEffect(() => {
    if (yardList) {
      setYard(yardList);
    }
  }, [yardList]);

  return (
    <View style={styles.container}>
      <FlatList
        data={yards}
        keyExtractor={(item) => item.yard_id}
        renderItem={({ item }) => (
          <View style={styles.fieldContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.fieldName}>{item.yard_name}</Text>
              <Text>{item.yard_sport}</Text>
            </View>
            <Button
              title="Đặt lịch"
              color="#1E90FF"
              onPress={() =>
                navigation.navigate("Booking", {
                  yard_name: item.yard_name,
                  booking: item.BookingYard,
                })
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
