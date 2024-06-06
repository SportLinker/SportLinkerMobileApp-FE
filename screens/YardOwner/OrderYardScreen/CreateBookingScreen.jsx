import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const CreateBookingScreen = ({ navigation, route }) => {
  const { selectedDate, bookings, setBookings } = route.params;
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const addBooking = () => {
    const newBookings = {
      ...bookings,
      [selectedDate]: [{ startTime, endTime, booked: true }],
    };
    setBookings(newBookings);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch cho ngày {selectedDate}</Text>
      <TextInput
        placeholder="Giờ bắt đầu (e.g., 13:30)"
        value={startTime}
        onChangeText={setStartTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Giờ kết thúc (e.g., 16:30)"
        value={endTime}
        onChangeText={setEndTime}
        style={styles.input}
      />
      <Button title="Đặt Lịch" onPress={addBooking} />
      <Button title="Hủy" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    padding: 5,
  },
});

export default CreateBookingScreen;
