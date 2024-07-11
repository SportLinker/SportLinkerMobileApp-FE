import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LocaleConfig } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getAllYardByUserSelector } from "../../../../redux/selectors";
import {
  bookYardByUser,
  getAllBookedByUser,
} from "../../../../redux/slices/bookSlice";
import { getAllYardByUser } from "../../../../redux/slices/yardSlice";
import BookingModal from "./BookingModal";
import CourtSelectionModalContent from "./CourtSelectionModalContent";

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

const CourtSelectionModal = ({ visible, onClose, stadiumId }) => {
  const dispatch = useDispatch();
  const yardList = useSelector(getAllYardByUserSelector);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedYard, setSelectedYard] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isManualTimeSelection, setIsManualTimeSelection] = useState(false);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("12:00");
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);

  useEffect(() => {
    dispatch(getAllYardByUser({ stadium_id: stadiumId }));
  }, []);

  useEffect(() => {
    if (yardList) {
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

  console.log("bookings", bookings);

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
      if (selectedSlot) {
        isOverlapping = checkOverlap(selectedSlot);
      }
    } else {
      isOverlapping = checkOverlap(`${startTime} - ${endTime}`);
    }

    if (isOverlapping) {
      Alert.alert("Thời gian đã có lịch đặt, vui lòng chọn thời gian khác");
      return;
    }

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
    // Tạo đối tượng Date từ chuỗi ngày và thời gian
    const startDate = new Date(`${selectedDate}T${start}`);
    const endDate = new Date(`${selectedDate}T${end}`);

    // Chuyển đổi ngày giờ thành định dạng ISO 8601
    const startISO = startDate.toISOString();
    const endISO = endDate.toISOString();

    // Đảm bảo định dạng "YYYY-MM-DDTHH:mm:ss.SSSZ"
    const bookingDetails = {
      yard_id: selectedYard.yard_id,
      time_start: startISO,
      time_end: endISO,
    };

    // Tính toán tiền đặt cọc
    const pricePerHour = selectedYard.price_per_hour;
    const deposit = pricePerHour * 0.3;
    setDepositAmount(deposit);

    setConfirmedBooking(bookingDetails);
    setShowConfirmationPopup(true);
  };

  const handleConfirmation = () => {
    if (confirmedBooking) {
      dispatch(bookYardByUser(confirmedBooking)).then(() => {
        dispatch(getAllBookedByUser());
      });
      Alert.alert(
        "Đặt sân thành công",
        `Bạn đã đặt sân ${selectedYard.yard_name} từ ${startTime} đến ${endTime} vào ngày ${selectedDate}`
      );
      setShowBookingModal(false);
      setShowConfirmationPopup(false);
      setConfirmedBooking(null);
    }
  };

  const handleTimePickerChange = (event, selectedTime) => {
    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }
    const currentTime = selectedTime || new Date();
    setShowTimePicker(false);

    const formattedTime = `${currentTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${currentTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

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
              Lịch đặt trong ngày {selectedDate}:
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
            Chưa có lịch đặt trong ngày {selectedDate}
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
            <CourtSelectionModalContent
              yards={yardList}
              handleBooking={handleBooking}
            />
          </View>
        </ScrollView>
      </View>
      {showBookingModal && (
        <BookingModal
          showBookingModal={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          showCalendar={showCalendar}
          setShowCalendar={setShowCalendar}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setShowTimePicker={setShowTimePicker}
          renderBookingsForDate={renderBookingsForDate}
          isManualTimeSelection={isManualTimeSelection}
          setIsManualTimeSelection={setIsManualTimeSelection}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          handleConfirmTime={handleConfirmTime}
          handleSlotSelection={handleSlotSelection}
          selectedSlot={selectedSlot}
          setIsSelectingStartTime={setIsSelectingStartTime}
          showTimePicker={showTimePicker}
          handleTimePickerChange={handleTimePickerChange}
          selectedYard={selectedYard}
        />
      )}
      {showConfirmationPopup && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showConfirmationPopup}
          onRequestClose={() => setShowConfirmationPopup(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.confirmationView}>
              <Text style={styles.confirmationText}>Xác nhận đặt sân</Text>
              <View style={styles.flexRowView}>
                <Text style={styles.confirmationDetails}>Sân:</Text>
                <Text style={styles.confirmationInfor}>
                  {selectedYard.yard_name}
                </Text>
              </View>
              <View style={styles.flexRowView}>
                <Text style={styles.confirmationDetails}>Thời gian:</Text>
                <Text style={styles.confirmationInfor}>
                  {startTime} - {endTime}
                </Text>
              </View>
              <View style={styles.flexRowView}>
                <Text style={styles.confirmationDetails}>Ngày:</Text>
                <Text style={styles.confirmationInfor}>{selectedDate}</Text>
              </View>
              <View style={styles.flexRowView}>
                <Text style={styles.confirmationDetails}>Giá:</Text>
                <Text style={styles.confirmationInfor}>
                  {selectedYard.price_per_hour} VNĐ/giờ
                </Text>
              </View>
              <View style={styles.flexRowView}>
                <Text style={styles.confirmationDetails}>
                  Giá Đặt Cọc (30%):
                </Text>
                <Text style={styles.depositInfor}>{depositAmount} VNĐ</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmation}
                >
                  <Text style={styles.confirmButtonText}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowConfirmationPopup(false)}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // marginTop: 22,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginHorizontal: "auto",
    backgroundColor: "white",
    // borderRadius: 20,
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
    minWidth: "90%",
    minHeight: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    color: "red",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  confirmationView: {
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
  },
  confirmationInfor: { fontSize: 16 },
  depositInfor: { fontSize: 18, color: "red", textDecorationLine: "underline" },
  confirmationText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  confirmationDetails: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: "auto",
  },
  flexRowView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: "45%",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
    width: "45%",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  bookingTimeSlot: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default CourtSelectionModal;
