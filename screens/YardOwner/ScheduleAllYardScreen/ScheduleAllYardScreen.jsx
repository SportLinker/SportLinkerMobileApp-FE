import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";
import {
  getAllYardSelector,
  getLoadingSelector,
} from "../../../redux/selectors";
import NoYard from "../ListAllYardScreen/NoYard/NoYard";

const ScheduleAllYardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const yardList = useSelector(getAllYardSelector);
  const loading = useSelector(getLoadingSelector);

  const [yards, setYards] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [bookings, setBookings] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    dispatch(getAllYardByOwner());
  }, []);

  useEffect(() => {
    if (yardList) setYards(yardList);
  }, [yardList]);

  useEffect(() => {
    if (yards.length > 0) {
      setSelectedField({ id: yards[0].yard_id, name: yards[0].yard_name });
    }
  }, [yards]);

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

  useEffect(() => {
    if (selectedField) {
      const selectedYard = yards.find(
        (yard) => yard.yard_id === selectedField.id
      );
      if (selectedYard) {
        const parsedBookings = parseYardDetail(selectedYard);
        setBookings(parsedBookings);
      }
    }
  }, [selectedField, yards]);

  useEffect(() => {
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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : yards.length === 0 ? (
        <NoYard />
      ) : (
        <>
          <FlatList
            data={yards.map((yard) => ({
              id: yard.yard_id,
              name: yard.yard_name,
            }))}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.fieldButton,
                  selectedField &&
                    selectedField.id === item.id &&
                    styles.selectedFieldButton,
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

export default ScheduleAllYardScreen;
