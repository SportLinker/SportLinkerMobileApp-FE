import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingModal = ({
  visible,
  onClose,
  selectedDate,
  setSelectedDate,
  showCalendar,
  setShowCalendar,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  isManualTimeSelection,
  setIsManualTimeSelection,
  selectedSlot,
  setSelectedSlot,
  showTimePicker,
  setShowTimePicker,
  handleConfirmTime,
  handleSlotSelection,
  renderBookingsForDate,
  selectedYard,
}) => {
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirmBooking = () => {
    if (!selectedDate) {
      Alert.alert("Vui lòng chọn ngày");
      return;
    }

    if (!startTime || !endTime) {
      Alert.alert("Vui lòng chọn đầy đủ giờ bắt đầu và kết thúc");
      return;
    }

    const start = new Date(`${selectedDate}T${startTime}`);
    const end = new Date(`${selectedDate}T${endTime}`);

    // Tính thời gian giữa start và end (đơn vị là mili giây)
    const timeDiff = end.getTime() - start.getTime();

    // Chuyển thời gian từ mili giây sang giờ
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Kiểm tra nếu thời gian lớn hơn 3 tiếng
    if (hoursDiff > 4) {
      Alert.alert("Bạn chỉ có thể đặt tối đa 4 tiếng");
      return;
    }

    handleConfirmTime(start.toISOString(), end.toISOString());
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      // Adjusting date to local timezone
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      setSelectedDate(localDate);
    }
  };

  const handleTimePickerChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      const localTime = time.toLocaleTimeString("en-GB", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      if (isSelectingStartTime) {
        setStartTime(localTime);
      } else {
        setEndTime(localTime);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalViewBooking}>
          <TouchableOpacity onPress={onClose} style={styles.closeModalButton}>
            <Text style={styles.closeModalButtonText}>Đóng</Text>
          </TouchableOpacity>
          <Text style={styles.bookingTitle}>
            Đặt sân {selectedYard ? selectedYard.yard_name : ""}
          </Text>
          <Text style={styles.bookingTitle}>Chọn ngày</Text>
          <TouchableOpacity
            style={styles.toggleCalendarButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.toggleCalendarButtonText}>
              {selectedDate ? selectedDate : "Chọn ngày"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          {selectedDate && renderBookingsForDate()}
          <View style={styles.timeSelectionContainer}>
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
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.timePickerButtonText}>
                      Chọn giờ bắt đầu:
                    </Text>
                    <Text
                      style={{
                        color: "#1446a9",
                        fontWeight: "bold",
                        fontSize: 20,
                        marginVertical: "auto",
                      }}
                    >
                      {startTime || "HH:MM"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsSelectingStartTime(false);
                    setShowTimePicker(true);
                  }}
                  style={styles.timePickerButton}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.timePickerButtonText}>
                      Chọn giờ kết thúc:
                    </Text>
                    <Text
                      style={{
                        color: "#1446a9",
                        fontWeight: "bold",
                        fontSize: 20,
                        marginVertical: "auto",
                      }}
                    >
                      {endTime || "HH:MM"}
                    </Text>
                  </View>
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
                        selectedSlot === slot && styles.selectedTimeSlotButton,
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
              onPress={handleConfirmBooking}
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
              display="spinner"
              onChange={handleTimePickerChange}
              minuteInterval={30}
            />
          )}
        </View>
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  toggleCalendarButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    width: "50%",
    marginBottom: 10,
  },
  toggleCalendarButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  timeSelectionContainer: {
    marginTop: 20,
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
    textAlign: "center",
  },
  timeSelectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  timePickerButton: {
    backgroundColor: "#a5a5a5",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  timePickerButtonText: {
    color: "#000",
    fontSize: 16,
    marginVertical: "auto",
  },
  timeSlotButton: {
    backgroundColor: "#cbcbcb",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  timeSlotButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  selectedTimeSlotButton: {
    backgroundColor: "#1646a9",
  },
  selectedTimeSlotButtonText: {
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
    textAlign: "center",
  },
});

export default BookingModal;
