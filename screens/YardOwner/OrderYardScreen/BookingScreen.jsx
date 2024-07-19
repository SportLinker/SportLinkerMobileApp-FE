import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Snackbar } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { screenHeight, screenWidth } from "../../../component/style";
import { confirmBooked } from "../../../redux/slices/bookSlice";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";

const BookingScreen = ({ route, navigation }) => {
  const { booking, yard_name } = route.params || {};

  const dispatch = useDispatch();

  const [bookings, setBookings] = useState(booking);
  const [selectedDates, setSelectedDates] = useState(
    booking.map((item) => item.date)
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onDayPress = (day) => {
    const currentDate = new Date();
    const selectedDate = new Date(day.dateString);

    if (selectedDate < currentDate) {
      console.log("Cannot book for past dates");
      return;
    }

    setSelectedDate(day.dateString);
    setSelectedTimeSlot(null);
  };

  const updateBookingStatus = (date, timeSlot, status) => {
    Alert.alert(
      "Xác nhận",
      `Bạn có chắc chắn muốn ${
        status === "accepted" ? "chấp nhận" : "xóa"
      } đặt sân này không?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            dispatch(confirmBooked({ status, booking_id: timeSlot.id })).then(
              () => {
                setBookings((prevBookings) =>
                  prevBookings.map((booking) =>
                    booking.date === date
                      ? {
                          ...booking,
                          matches: booking.matches.map((match) =>
                            match.id === timeSlot.id
                              ? { ...match, status }
                              : match
                          ),
                        }
                      : booking
                  )
                );
                dispatch(getAllYardByOwner());
                setSnackbarMessage(
                  `${
                    status === "accepted" ? "Chấp nhận" : "Xóa"
                  } đặt sân thành công!`
                );
                setSnackbarVisible(true);
              }
            );
          },
        },
      ]
    );
  };

  const acceptBooking = (date, timeSlot) => {
    updateBookingStatus(date, timeSlot, "accepted");
  };

  const deleteBooking = (date, timeSlot) => {
    updateBookingStatus(date, timeSlot, "rejected");
  };

  const selectTimeSlot = (date, timeSlot) => {
    setSelectedDate(date);
    setSelectedTimeSlot(timeSlot);
  };

  const sortedDates = selectedDates.sort((a, b) => new Date(a) - new Date(b));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch đặt cho sân {yard_name}</Text>
      <FlatList
        style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        data={sortedDates}
        keyExtractor={(item) => item}
        renderItem={({ item: date }) => {
          const bookingItem = bookings.find((booking) => booking.date === date);
          if (!bookingItem) return null;
          return (
            <View
              style={{
                marginBottom: 15,
                padding: 15,
                backgroundColor: "rgba(240, 240, 240, 0.5)",
              }}
            >
              <Text style={styles.dateText}>{date}</Text>
              {bookingItem.matches.map((timeSlot, index) => (
                <View key={index} style={styles.dateItem}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.timeText}>
                      {timeSlot.time_start} - {timeSlot.time_end}
                    </Text>
                    {timeSlot.status === "accepted" && (
                      <AntDesign name="check" size={24} color="black" />
                    )}
                    {timeSlot.status === "rejected" && (
                      <AntDesign name="close" size={24} color="red" />
                    )}
                  </View>
                  {selectedDate === date &&
                    selectedTimeSlot === timeSlot &&
                    timeSlot.status !== "accepted" &&
                    timeSlot.status !== "rejected" && (
                      <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={[styles.button, styles.acceptButton]}
                          onPress={() => acceptBooking(date, timeSlot)}
                        >
                          <Icon name="check-circle" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, styles.deleteButton]}
                          onPress={() => deleteBooking(date, timeSlot)}
                        >
                          <Icon name="delete" size={24} color="black" />
                        </TouchableOpacity>
                      </View>
                    )}
                  {selectedDate !== date || selectedTimeSlot !== timeSlot ? (
                    <TouchableOpacity
                      style={styles.dateItemButton}
                      onPress={() => selectTimeSlot(date, timeSlot)}
                    >
                      <Text>Chọn</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ))}
            </View>
          );
        }}
      />
      <Icon.Button
        name={showCalendar ? "calendar-today" : "calendar-view-day"}
        backgroundColor="#3b5998"
        onPress={() => setShowCalendar(!showCalendar)}
      >
        {showCalendar ? "Ẩn Lịch" : "Hiện Lịch"}
      </Icon.Button>
      {showCalendar && (
        <Calendar
          markedDates={selectedDates.reduce((acc, date) => {
            const bookingItem = bookings.find(
              (booking) => booking.date === date
            );
            const accepted = bookingItem.matches.some(
              (match) => match.status === "accepted"
            );
            const color = accepted ? "#1646a9" : "#ff0000"; // Red if not all accepted
            acc[date] = {
              selected: true,
              marked: true,
              selectedColor: color,
            };
            return acc;
          }, {})}
          onDayPress={onDayPress}
          style={styles.calendar}
        />
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbarContainer}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  dateItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    height: 50,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  timeText: {
    fontSize: 18,
    color: "black",
    marginVertical: "auto",
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: "auto",
    marginRight: 10,
    width: "38%",
  },
  button: {
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  acceptButton: {
    backgroundColor: "#00ff00",
    paddingHorizontal: 7,
  },
  dateItemButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  snackbarContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#1646A9",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: -0.02 * screenHeight },
    ],
  },
});

export default BookingScreen;
