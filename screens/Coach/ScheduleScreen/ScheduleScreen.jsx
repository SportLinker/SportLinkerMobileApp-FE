import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";

const ScheduleScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState({
    id: "1",
    name: "Huấn luyện viên A",
  }); // Người dùng hiện tại (huấn luyện viên)
  const [bookings, setBookings] = useState({}); // Dữ liệu lịch
  const [selectedDates, setSelectedDates] = useState([]); // Ngày đã chọn

  // Sample booking data
  const sampleBookings = {
    1: {
      "2024-06-10": [
        { startTime: "08:00", endTime: "10:00", booked: true },
        { startTime: "10:00", endTime: "12:00", booked: false },
      ],
      "2024-06-12": [{ startTime: "14:00", endTime: "16:00", booked: true }],
    },
    2: {
      "2024-06-10": [
        { startTime: "08:00", endTime: "10:00", booked: false },
        { startTime: "10:00", endTime: "12:00", booked: true },
      ],
    },
    3: {
      "2024-06-10": [
        { startTime: "08:00", endTime: "10:00", booked: true },
        { startTime: "10:00", endTime: "12:00", booked: true },
      ],
    },
  };

  console.log("currentUser", currentUser);
  console.log("selectedDates", selectedDates);
  console.log("bookings", bookings);

  useEffect(() => {
    // Load booking data for current user
    if (currentUser) {
      setBookings(sampleBookings[currentUser.id] || {});
    }
  }, [currentUser]);

  useEffect(() => {
    // Initialize selected dates from bookings data
    if (Object.keys(bookings).length > 0) {
      setSelectedDates(Object.keys(bookings));
    }
  }, [bookings]);

  const renderBookingDetail = ({ item }) => (
    <View style={styles.bookingDetail}>
      <Text style={styles.bookingDate}>{item.date}</Text>
      {item.slots.map((slot, index) => (
        <Text key={index} style={styles.bookingSlot}>
          {slot.startTime} - {slot.endTime} (
          {slot.booked ? "Taught" : "Available"})
        </Text>
      ))}
    </View>
  );

  const bookingDetails = selectedDates.map((date) => ({
    date,
    slots: bookings[date] || [],
  }));

  console.log("bookingDetails", bookingDetails);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Lịch Dạy Của Bạn</Text> */}
      <Calendar
        markedDates={selectedDates.reduce((acc, date) => {
          const bookedSlots = bookings[date] || [];
          const allBooked =
            bookedSlots.length > 0 && bookedSlots.every((slot) => slot.booked);
          const color = allBooked ? "#1646a9" : "#ff0000";
          acc[date] = {
            selected: true,
            marked: true,
            selectedColor: color,
          };
          return acc;
        }, {})}
        style={styles.calendar}
      />
      <FlatList
        data={bookingDetails}
        keyExtractor={(item) => item.date}
        renderItem={renderBookingDetail}
        style={styles.bookingList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  calendar: {
    marginVertical: 10,
  },
  bookingList: {
    flex: 1,
  },
  bookingDetail: {
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
  bookingDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bookingSlot: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 1,
  },
});

export default ScheduleScreen;
