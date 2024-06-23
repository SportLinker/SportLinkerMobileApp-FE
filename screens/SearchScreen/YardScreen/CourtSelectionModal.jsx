import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { getAllYardByUserSelector } from "../../../redux/selectors";
import { getAllYardByUser } from "../../../redux/slices/yardSlice";

// Configure the calendar locale if necessary
LocaleConfig.locales["fr"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "fr";

export const CourtSelectionModal = ({ visible, onClose, stadiumId }) => {
  const dispatch = useDispatch();

  const yardList = useSelector(getAllYardByUserSelector);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedYard, setSelectedYard] = useState(null);
  const [isManualTimeSelection, setIsManualTimeSelection] = useState(false);
  const [startTime, setStartTime] = useState("8:00");
  const [endTime, setEndTime] = useState("12:00");
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [yards, setYards] = useState("");

  // console.log("yards", yards);
  // console.log("bookings", bookings);

  useEffect(() => {
    dispatch(getAllYardByUser({ stadium_id: stadiumId }));
  }, []);

  useEffect(() => {
    if (yardList) {
      setYards(yardList);
      // Extract and set bookings from yardList
      const allBookings = yardList.flatMap((yard) =>
        yard.BookingYard.map((booking) => ({
          date: booking.date,
          timeSlots: booking.matches.map(
            (match) => `${match.time_start} - ${match.time_end}`
          ),
        }))
      );
      setBookings(allBookings);
    }
  }, [yardList]);

  const handleBooking = (yard) => {
    setSelectedYard(yard);
    setShowBookingModal(true);
  };

  const checkOverlap = (selectedTime) => {
    const bookingsForSelectedDate = bookings.find(
      (b) => b.date === selectedDate
    );
    if (bookingsForSelectedDate) {
      // Kiểm tra từng slot đặt có trùng với selectedTime không
      return bookingsForSelectedDate.timeSlots.some(
        (slot) => slot === selectedTime
      );
    }
    return false;
  };

  const handleConfirmTime = () => {
    if (!selectedDate) {
      Alert.alert("Vui lòng chọn ngày");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate < currentDate) {
      Alert.alert("Không thể đặt sân trước ngày hiện tại");
      return;
    }

    let isOverlapping = false;
    if (!isManualTimeSelection) {
      // Kiểm tra trùng giờ nếu không phải chọn thủ công
      if (selectedSlot) {
        isOverlapping = checkOverlap(selectedSlot);
      }
    } else {
      // Kiểm tra trùng giờ nếu chọn thủ công
      isOverlapping = checkOverlap(`${startTime} - ${endTime}`);
    }

    if (isOverlapping) {
      Alert.alert("Thời gian đã có lịch đặt, vui lòng chọn thời gian khác");
      return;
    }

    // Nếu không trùng lịch, tiến hành xác nhận đặt sân
    if (!isManualTimeSelection) {
      if (selectedSlot) {
        const [start, end] = selectedSlot.split(" - ");
        confirmBooking(start, end);
      } else {
        Alert.alert("Vui lòng chọn giờ");
      }
    } else {
      if (startTime === "" || endTime === "") {
        Alert.alert("Vui lòng chọn giờ bắt đầu và kết thúc");
        return;
      }

      if (endTime <= startTime) {
        Alert.alert("Thời gian kết thúc phải sau thời gian bắt đầu");
        return;
      }

      confirmBooking(startTime, endTime);
    }
  };

  const confirmBooking = (start, end) => {
    const bookingDetails = {
      yard: selectedYard.yard_name,
      date: selectedDate,
      startTime: start,
      endTime: end,
    };

    console.log("Booking details:", bookingDetails);

    Alert.alert(
      `Bạn đã đặt sân ${selectedYard.yard_name} từ ${start} đến ${end} vào ngày ${selectedDate}`
    );

    setShowBookingModal(false);
  };

  const handleTimePickerChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }
    const currentTime = selectedTime || new Date();
    setShowTimePicker(false);

    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;

    if (isSelectingStartTime) {
      setStartTime(formattedTime);
    } else {
      setEndTime(formattedTime);
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
    setIsManualTimeSelection(false);
  };

  const renderBookingsForDate = () => {
    if (selectedDate) {
      const bookingsForSelectedDate = bookings.find(
        (b) => b.date === selectedDate
      );
      if (bookingsForSelectedDate) {
        return (
          <View>
            <Text style={styles.bookingTitle}>
              Bookings for {selectedDate}:
            </Text>
            {bookingsForSelectedDate.timeSlots.map((slot, index) => (
              <Text key={index} style={styles.bookingTimeSlot}>
                {slot}
              </Text>
            ))}
          </View>
        );
      } else {
        return (
          <Text style={styles.bookingTitle}>
            No bookings for {selectedDate}
          </Text>
        );
      }
    }
    return null;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
            <Text style={styles.modalText}>Chọn sân</Text>
            {yards &&
              yards.map((yard) => (
                <TouchableOpacity
                  key={yard.yard_id}
                  style={styles.courtButton}
                  onPress={() => handleBooking(yard)}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        color: "#4878d9",
                        padding: 5,
                        marginHorizontal: "auto",
                      }}
                    >
                      {yard.yard_name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#5f6d7a",
                        marginHorizontal: "auto",
                        marginVertical: 10,
                      }}
                    >
                      {yard.yard_description}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text style={{ paddingBottom: 10, paddingHorizontal: 5 }}>
                        Môn thể thao:
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {yard.yard_sport}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Text style={{ paddingBottom: 10, paddingHorizontal: 5 }}>
                        Giá thuê:
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {yard.price_per_hour} VNĐ/giờ
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showBookingModal}
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalViewBooking}>
            <TouchableOpacity
              onPress={() => setShowBookingModal(false)}
              style={styles.closeModalButton}
            >
              <Text style={styles.closeModalButtonText}>Đóng</Text>
            </TouchableOpacity>
            <Text style={styles.bookingTitle}>Chọn ngày</Text>
            <TouchableOpacity
              style={styles.toggleCalendarButton}
              onPress={() => setShowCalendar(!showCalendar)}
            >
              <Text style={styles.toggleCalendarButtonText}>
                {showCalendar ? "Ẩn lịch" : "Hiển thị lịch"}
              </Text>
            </TouchableOpacity>
            {showCalendar && (
              <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: "orange",
                  },
                }}
              />
            )}
            {selectedDate && renderBookingsForDate()}
            <View style={styles.timeSelectionContainer}>
              <Text style={styles.timeSelectionTitle}>
                {isManualTimeSelection
                  ? "Chọn giờ bắt đầu và kết thúc"
                  : "Chọn slot thời gian"}
              </Text>
              {isManualTimeSelection ? (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSelectingStartTime(true);
                      setShowTimePicker(true);
                    }}
                    style={styles.timePickerButton}
                  >
                    <Text style={styles.timePickerButtonText}>
                      Chọn giờ bắt đầu: {startTime}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsSelectingStartTime(false);
                      setShowTimePicker(true);
                    }}
                    style={styles.timePickerButton}
                  >
                    <Text style={styles.timePickerButtonText}>
                      Chọn giờ kết thúc: {endTime}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {["8:00 - 12:00", "12:00 - 16:00", "16:00 - 20:00"].map(
                    (slot) => (
                      <TouchableOpacity
                        key={slot}
                        onPress={() => handleSlotSelection(slot)}
                        style={[
                          styles.timeSlotButton,
                          selectedSlot === slot &&
                            styles.selectedTimeSlotButton,
                        ]}
                      >
                        <Text
                          style={[
                            styles.timeSlotButtonText,
                            selectedSlot === slot &&
                              styles.selectedTimeSlotButtonText,
                          ]}
                        >
                          {slot}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              )}
              <TouchableOpacity
                onPress={() => setIsManualTimeSelection(!isManualTimeSelection)}
                style={styles.manualTimeSelectionButton}
              >
                <Text style={styles.manualTimeSelectionButtonText}>
                  {isManualTimeSelection
                    ? "Chọn theo slot thời gian"
                    : "Chọn giờ thủ công"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmTime}
                style={styles.confirmBookingButton}
              >
                <Text style={styles.confirmBookingButtonText}>
                  Xác nhận đặt sân
                </Text>
              </TouchableOpacity>
            </View>
            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimePickerChange}
              />
            )}
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: "100%",
    minHeight: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "red",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  courtButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    minWidth: "100%",
  },
  courtButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  courtButtonDescription: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  modalViewBooking: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  closeModalButton: {
    alignSelf: "flex-end",
  },
  closeModalButtonText: {
    color: "red",
    fontSize: 16,
  },
  bookingTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  timeSelectionContainer: {
    marginTop: 20,
  },
  timeSelectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  timePickerButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  timePickerButtonText: {
    color: "white",
    fontSize: 16,
  },
  timeSlotButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  timeSlotButtonText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: "auto",
  },
  selectedTimeSlotButton: {
    backgroundColor: "#1646a9",
  },
  selectedTimeSlotButtonText: {
    color: "white",
    fontSize: 16,
  },
  manualTimeSelectionButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },

  manualTimeSelectionButtonText: {
    color: "white",
    fontSize: 16,
  },
  confirmBookingButton: {
    backgroundColor: "#1646a9",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  confirmBookingButtonText: {
    color: "white",
    fontSize: 16,
    marginHorizontal: "auto",
  },
  toggleCalendarButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    width: "40%",
  },
  toggleCalendarButtonText: {
    color: "white",
    fontSize: 12,
    marginHorizontal: "auto",
  },
});
