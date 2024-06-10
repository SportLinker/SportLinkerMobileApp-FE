import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";

const ScheduleScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState({
    id: "1",
    name: "Huấn luyện viên A",
  });
  const [bookings, setBookings] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const [newBooked, setNewBooked] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  useEffect(() => {
    if (currentUser) {
      setBookings(sampleBookings[currentUser.id] || {});
    }
  }, [currentUser]);

  useEffect(() => {
    if (Object.keys(bookings).length > 0) {
      setSelectedDates(Object.keys(bookings));
    }
  }, [bookings]);

  console.log("Bookings data:", bookings);

  const handleUpdatePress = (date, slot) => {
    setSelectedDate(date);
    setSelectedSlot(slot);
    setNewStartTime(slot.startTime);
    setNewEndTime(slot.endTime);
    setNewBooked(slot.booked);
    setFormMode("update");
    setFormVisible(true);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setFormMode("add");
    setFormVisible(true);
  };

  const handleAddBooking = () => {
    if (selectedDate && newStartTime && newEndTime) {
      const newBooking = {
        startTime: newStartTime,
        endTime: newEndTime,
        booked: newBooked,
      };
      setBookings((prevBookings) => {
        const updatedBookings = { ...prevBookings };
        if (updatedBookings[selectedDate]) {
          updatedBookings[selectedDate].push(newBooking);
        } else {
          updatedBookings[selectedDate] = [newBooking];
        }
        return updatedBookings;
      });
      setNewStartTime("");
      setNewEndTime("");
      setNewBooked(false);
      setFormVisible(false);
    }
  };

  const handleUpdateBooking = () => {
    if (selectedDate && newStartTime && newEndTime && selectedSlot) {
      const updatedBookings = { ...bookings };
      const index = updatedBookings[selectedDate].indexOf(selectedSlot);
      updatedBookings[selectedDate][index] = {
        startTime: newStartTime,
        endTime: newEndTime,
        booked: newBooked,
      };
      setBookings(updatedBookings);
      setNewStartTime("");
      setNewEndTime("");
      setNewBooked(false);
      setFormVisible(false);
      setSelectedSlot(null);
    }
  };

  const handleDeleteBooking = () => {
    if (selectedDate && selectedSlot) {
      const updatedBookings = { ...bookings };
      const index = updatedBookings[selectedDate].indexOf(selectedSlot);
      updatedBookings[selectedDate].splice(index, 1);

      // Kiểm tra nếu không còn dữ liệu nào trong ngày được chọn, xóa cả ngày đó ra khỏi state
      if (updatedBookings[selectedDate].length === 0) {
        delete updatedBookings[selectedDate];
        setSelectedDates((prevDates) =>
          prevDates.filter((date) => date !== selectedDate)
        );
      }

      setBookings(updatedBookings);
      setNewStartTime("");
      setNewEndTime("");
      setNewBooked(false);
      setFormVisible(false);
      setSelectedSlot(null);
    }
  };

  // Hàm xử lý hiển thị DateTimePicker cho thời gian bắt đầu
  const showStartDateTimePicker = () => {
    setShowStartPicker(true);
  };

  // Hàm xử lý hiển thị DateTimePicker cho thời gian kết thúc
  const showEndDateTimePicker = () => {
    setShowEndPicker(true);
  };

  const renderBookingDetail = ({ item }) => (
    <View style={styles.bookingDetail}>
      <Text style={styles.bookingDate}>{item.date}</Text>
      {item.slots.map((slot, index) => (
        <View key={index} style={styles.slotContainer}>
          <Text style={styles.bookingSlot}>
            {slot.startTime} - {slot.endTime} (
            {slot.booked ? "Taught" : "Available"})
          </Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleUpdatePress(item.date, slot)}
            >
              <MaterialIcons name="edit" size={24} color="blue" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => handleDeletePress(item.date, slot)}
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity> */}
          </View>
        </View>
      ))}
    </View>
  );

  const bookingDetails = selectedDates.map((date) => ({
    date,
    slots: bookings[date] || [],
  }));

  return (
    <View style={styles.container}>
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
        onDayPress={handleDayPress}
        style={styles.calendar}
      />
      <FlatList
        data={bookingDetails}
        keyExtractor={(item) => item.date}
        renderItem={renderBookingDetail}
        style={styles.bookingList}
      />
      <Modal
        visible={formVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFormVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.addBookingForm}>
            <TextInput
              style={styles.input}
              placeholder="Start Time (HH:MM)"
              value={newStartTime}
              onChangeText={(text) => setNewStartTime(text)}
              onFocus={showStartDateTimePicker}
            />

            {showStartPicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedTime) => {
                  setShowStartPicker(false);
                  if (selectedTime) {
                    const hours = selectedTime
                      .getHours()
                      .toString()
                      .padStart(2, "0");
                    const minutes = selectedTime
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                    setNewStartTime(`${hours}:${minutes}`);
                  }
                }}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="End Time (HH:MM)"
              value={newEndTime}
              onChangeText={(text) => setNewEndTime(text)}
              onFocus={showEndDateTimePicker}
            />
            {showEndPicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedTime) => {
                  setShowEndPicker(false);
                  if (selectedTime) {
                    const hours = selectedTime
                      .getHours()
                      .toString()
                      .padStart(2, "0");
                    const minutes = selectedTime
                      .getMinutes()
                      .toString()
                      .padStart(2, "0");
                    setNewEndTime(`${hours}:${minutes}`);
                  }
                }}
              />
            )}
            <View style={styles.checkboxContainer}>
              <Text>Booked:</Text>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setNewBooked(!newBooked)}
              >
                {newBooked ? (
                  <MaterialIcons name="check-box" size={24} color="green" />
                ) : (
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={24}
                    color="red"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              {formMode === "add" ? (
                <Button title="Add" onPress={handleAddBooking} />
              ) : (
                <>
                  <Button title="Update" onPress={handleUpdateBooking} />
                  <Button
                    title="Delete"
                    color="red"
                    onPress={handleDeleteBooking}
                  />
                </>
              )}
              <Button
                title="Cancel"
                color="red"
                onPress={() => setFormVisible(false)}
              />
            </View>
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
    backgroundColor: "#f8f8f8",
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
    margin: 3,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addBookingForm: {
    width: "90%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 5,
  },
  slotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ScheduleScreen;
