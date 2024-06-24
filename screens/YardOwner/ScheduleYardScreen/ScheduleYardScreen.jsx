import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch } from "react-redux";

const ScheduleYardScreen = ({ navigation, route }) => {
  const { yardDetail } = route?.params;
  const dispatch = useDispatch();
  console.log("yardDetail", yardDetail);

  const [selectedField, setSelectedField] = useState({
    id: yardDetail.yard_id,
    name: yardDetail.yard_name,
  }); // Sân đã chọn để xem lịch
  const [bookings, setBookings] = useState({}); // Dữ liệu lịch
  const [selectedDates, setSelectedDates] = useState([]); // Ngày đã chọn

  // Convert yardDetail to bookings format
  const parseYardDetail = (yardDetail) => {
    const parsedBookings = {};
    yardDetail.BookingYard.forEach((booking) => {
      const date = booking.date;
      if (!parsedBookings[date]) {
        parsedBookings[date] = [];
      }
      booking.matches.forEach((match) => {
        parsedBookings[date].push({
          startTime: match.time_start,
          endTime: match.time_end,
          booked: match.status === "accepted",
        });
      });
    });
    return parsedBookings;
  };

  const fields = [{ id: yardDetail.yard_id, name: yardDetail.yard_name }];

  useEffect(() => {
    // Load booking data for selected field
    if (selectedField) {
      const parsedBookings = parseYardDetail(yardDetail);
      setBookings(parsedBookings);
    }
  }, [selectedField, yardDetail]);

  useEffect(() => {
    // Initialize selected dates from bookings data
    if (Object.keys(bookings).length > 0) {
      setSelectedDates(Object.keys(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    // Auto select the yard when entering ScheduleScreen
    setSelectedField({ id: yardDetail.yard_id, name: yardDetail.yard_name });
  }, [yardDetail]);

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
    justifyContent: "center",
    alignItems: "center",
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
