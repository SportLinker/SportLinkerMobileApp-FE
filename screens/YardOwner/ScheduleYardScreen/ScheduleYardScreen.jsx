import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";

const ScheduleYardScreen = ({ navigation }) => {
  const [selectedField, setSelectedField] = useState({
    id: "1",
    name: "Sân A",
  }); // Sân đã chọn để xem lịch
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

  const fields = [
    { id: "1", name: "Sân 1" },
    { id: "2", name: "Sân 2" },
    { id: "3", name: "Sân 3" },
  ];

  console.log("selectedField", selectedField);
  console.log("selectedDates", selectedDates);
  console.log("bookings", bookings);

  useEffect(() => {
    // Load booking data for selected field
    if (selectedField) {
      setBookings(sampleBookings[selectedField.id] || {});
    }
  }, [selectedField]);

  useEffect(() => {
    // Initialize selected dates from bookings data
    if (Object.keys(bookings).length > 0) {
      setSelectedDates(Object.keys(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    // Auto select Sân A when entering ScheduleScreen
    setSelectedField({ id: "1", name: "Sân A" });
  }, []);

  const renderBookingDetail = ({ item }) => (
    <View style={styles.bookingDetail}>
      <Text style={styles.bookingDate}>{item.date}</Text>
      {item.slots.map((slot, index) => (
        <Text key={index} style={styles.bookingSlot}>
          {slot.startTime} - {slot.endTime} (
          {slot.booked ? "Booked" : "Available"})
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
      <FlatList
        data={fields}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.fieldButton,
              selectedField.id === item.id && styles.selectedFieldButton,
              { marginHorizontal: 5 },
            ]}
            onPress={() => setSelectedField(item)}
          >
            <Text style={styles.fieldButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.fieldList}
      />
      {selectedField && (
        <>
          <Text style={styles.title}>Lịch - {selectedField.name}</Text>
          <Calendar
            markedDates={selectedDates.reduce((acc, date) => {
              const bookedSlots = bookings[date] || [];
              const allBooked =
                bookedSlots.length > 0 &&
                bookedSlots.every((slot) => slot.booked);
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
          <Text style={styles.legendTitle}>Legend</Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#1646a9" }]}
              />
              <Text>All Slots Booked</Text>
            </View>
            <View style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: "#ff0000" }]}
              />
              <Text>Partially Booked</Text>
            </View>
          </View>
          <FlatList
            data={bookingDetails}
            keyExtractor={(item) => item.date}
            renderItem={renderBookingDetail}
            style={styles.bookingList}
          />
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("Booking", { fieldId: selectedField.id })
            }
          >
            <Text style={styles.buttonText}>Go to Booking Screen</Text>
          </TouchableOpacity> */}
        </>
      )}
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
  fieldList: {
    paddingVertical: 10,
    flexGrow: 0,
    marginBottom: 5,
  },
  fieldButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#1E90FF",
    marginRight: 10,
    // height: 40,
    justifyContent: "center", // Để các sân được căn giữa
    alignItems: "center", // Để các sân được căn giữa
  },
  selectedFieldButton: {
    backgroundColor: "#4169E1",
  },
  fieldButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    padding: 5,
  },
  calendar: {
    marginVertical: 10,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
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
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ScheduleYardScreen;
