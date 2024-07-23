import React, { useState } from "react";
import {
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
import Modal from "react-native-modal";
import { screenHeight, screenWidth } from "../../../component/style";
import { confirmBooked } from "../../../redux/slices/bookSlice";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const BookingScreen = ({ route, navigation }) => {
  const { booking, yard_name, price } = route.params || {};

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
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalConfirmAction, setModalConfirmAction] = useState(() => () => {});

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

  const calculateDurationInHours = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDate = new Date();
    startDate.setHours(startHours, startMinutes);

    const endDate = new Date();
    endDate.setHours(endHours, endMinutes);

    const durationInMillis = endDate - startDate;
    const durationInHours = durationInMillis / (1000 * 60 * 60);

    return durationInHours;
  };

  const showConfirmationModal = (message, onConfirm) => {
    setModalMessage(message);
    setModalConfirmAction(() => onConfirm);
    setModalVisible(true);
  };

  const updateBookingStatus = (date, timeSlot, status) => {
    const deposit = price * 0.3; // Tiền cọc là 30% của price
    const durationInHours = calculateDurationInHours(
      timeSlot.time_start,
      timeSlot.time_end
    );
    const calculatedPrice = (deposit / 2) * durationInHours; // Sử dụng công thức giá mới

    const message = `Bạn có chắc chắn muốn ${
      status === "accepted" ? "chấp nhận" : "xóa"
    } đặt sân này không?

  ${
    status === "accepted"
      ? `Bạn sẽ nhận được 
  ${calculatedPrice.toFixed(2)} VNĐ`
      : ""
  }
  `;

    showConfirmationModal(message, () => {
      dispatch(confirmBooked({ status, booking_id: timeSlot.id })).then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.date === date
              ? {
                  ...booking,
                  matches: booking.matches.map((match) =>
                    match.id === timeSlot.id ? { ...match, status } : match
                  ),
                }
              : booking
          )
        );
        dispatch(getAllYardByOwner());
        setSnackbarMessage(
          `${status === "accepted" ? "Chấp nhận" : "Xóa"} đặt sân thành công!`
        );
        setSnackbarVisible(true);
      });
      setModalVisible(false);
    });
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

  const adjustTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setHours(date.getHours() - 1);
    const newHours = String(date.getHours()).padStart(2, "0");
    const newMinutes = String(date.getMinutes()).padStart(2, "0");
    return `${newHours}:${newMinutes}`;
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
              {bookingItem.matches.map((timeSlot, index) => {
                const adjustedStart = adjustTime(timeSlot.time_start);
                const adjustedEnd = adjustTime(timeSlot.time_end);
                return (
                  <View key={index} style={styles.dateItem}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.timeText}>
                        {adjustedStart} - {adjustedEnd}
                      </Text>
                      {timeSlot.status === "accepted" && (
                        <AntDesign name="check" size={24} color="black" />
                      )}
                      {timeSlot.status === "rejected" && (
                        <AntDesign name="close" size={24} color="#ff4300" />
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
                            <FontAwesome5 name="check" size={24} color="#000" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.deleteButton]}
                            onPress={() => deleteBooking(date, timeSlot)}
                          >
                            <FontAwesome name="trash" size={24} color="#000" />
                          </TouchableOpacity>
                        </View>
                      )}
                    {selectedDate !== date || selectedTimeSlot !== timeSlot
                      ? timeSlot.status !== "accepted" &&
                        timeSlot.status !== "rejected" && (
                          <TouchableOpacity
                            style={styles.dateItemButton}
                            onPress={() => selectTimeSlot(date, timeSlot)}
                          >
                            <Text>Chọn</Text>
                          </TouchableOpacity>
                        )
                      : null}
                  </View>
                );
              })}
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
            const color = accepted ? "#1646a9" : "#ff4300";
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
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#1446a9" }]}
              onPress={() => {
                modalConfirmAction();
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Đồng ý</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#ff4300" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.modalButtonText, { color: "black" }]}>
                Hủy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#ff4300",
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
    color: "white",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    minWidth: 50,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default BookingScreen;
