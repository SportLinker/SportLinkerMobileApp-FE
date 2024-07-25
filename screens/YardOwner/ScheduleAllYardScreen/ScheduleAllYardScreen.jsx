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
import {
  getAllYardSelector,
  getLoadingSelector,
} from "../../../redux/selectors";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";
import NoYard from "../ListAllYardScreen/NoYard/NoYard";
import Loading from "../../../component/Loading";

const ScheduleAllYardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const yardList = useSelector(getAllYardSelector);
  const loading = useSelector(getLoadingSelector);

  const [yards, setYards] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [bookings, setBookings] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);

  const filteredYard = yards?.filter((yard) => yard.yard_status === "avaiable");

  useEffect(() => {
    dispatch(getAllYardByOwner());
  }, []);

  useEffect(() => {
    if (yardList) setYards(yardList);
  }, [yardList]);

  useEffect(() => {
    if (yards.length > 0) {
      setSelectedField({
        id: filteredYard[0].yard_id,
        name: filteredYard[0].yard_name,
      });
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

        // Update selectedDates
        setSelectedDates(Object.keys(parsedBookings));
      }
    }
  }, [selectedField, yards]);

  const renderBookingDetail = ({ item }) => (
    <View style={styles.bookingDetail}>
      <Text style={styles.bookingDate}>{item.date}</Text>
      {item.slots.map((slot, index) => (
        <Text key={index} style={styles.bookingSlot}>
          {slot.startTime} - {slot.endTime} (
          {slot.booked ? "Đã đặt sân" : "Chưa hoặc từ chối đặt sân"})
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading visible={loading} />
      ) : yards.length === 0 ? (
        <NoYard />
      ) : (
        <>
          <FlatList
            data={filteredYard.map((yard) => ({
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
                  const anyBooked = bookedSlots.some((slot) => slot.booked); // Kiểm tra xem có bất kỳ slot nào đã được đặt hay không
                  const anyAvailable = bookedSlots.some((slot) => !slot.booked); // Kiểm tra xem có bất kỳ slot nào còn trống hay không

                  if (anyBooked) {
                    // Nếu có booked, đánh dấu màu xanh
                    acc[date] = {
                      selected: true,
                      marked: true,
                      selectedColor: "#1646a9", // Màu xanh cho các ngày có slot đã được đặt
                    };
                  } else if (anyAvailable) {
                    // Nếu có available nhưng không có booked, đánh dấu màu đỏ
                    acc[date] = {
                      selected: true,
                      marked: true,
                      selectedColor: "#ff0000", // Màu đỏ cho các ngày có slot còn trống
                    };
                  }

                  return acc;
                }, {})}
                style={styles.calendar}
              />
              <Text style={styles.legendTitle}>Chú thích</Text>
              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, { backgroundColor: "#1646a9" }]}
                  />
                  <Text>Đã đặt sân</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendColor, { backgroundColor: "#ff0000" }]}
                  />
                  <Text>Chưa hoặc từ chối đặt sân</Text>
                </View>
              </View>
              <FlatList
                data={selectedDates.map((date) => ({
                  date,
                  slots: bookings[date] || [],
                }))}
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
});

export default ScheduleAllYardScreen;
