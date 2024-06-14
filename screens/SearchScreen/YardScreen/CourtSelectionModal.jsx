import React, { useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { listYardData } from "../../../utils/constant";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

export const CourtSelectionModal = ({ visible, onClose }) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedYard, setSelectedYard] = useState(null);
  const [isManualTimeSelection, setIsManualTimeSelection] = useState(false);
  const [startTime, setStartTime] = useState("8:00");
  const [endTime, setEndTime] = useState("12:00");
  const [isSelectingStartTime, setIsSelectingStartTime] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = (yard) => {
    setSelectedYard(yard);
    setShowBookingModal(true);
  };

  // console.log("selectedYard", selectedYard);
  console.log("startTime", startTime);
  console.log("endTime", endTime);

  const handleConfirmTime = () => {
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
    Alert.alert(
      `Bạn đã đặt sân ${selectedYard.yardName} từ ${start} đến ${end}`
    );

    onClose();
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

            {listYardData.map((yard) => (
              <TouchableOpacity
                key={yard.id}
                style={styles.courtButton}
                onPress={() => handleBooking(yard)}
              >
                <Text style={styles.courtButtonText}>{yard.yardName}</Text>
                <Image source={{ uri: yard.image }} style={styles.courtImage} />
                <Text style={styles.courtButtonDescription}>
                  {yard.description}
                </Text>
                <Text style={styles.courtButtonDescription}>
                  Giá: {yard.price}
                </Text>
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
          <View style={styles.bookingContainer}>
            <TouchableOpacity
              onPress={() => setShowBookingModal(false)}
              style={styles.closeModalButton}
            >
              <Text style={styles.closeModalButtonText}>Đóng</Text>
            </TouchableOpacity>
            <Text style={styles.bookingTitle}>Chọn giờ đặt sân</Text>
            <Text style={styles.selectedYard}>{selectedYard?.yardName}</Text>
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedSlot === "8:00 - 12:00" && styles.selectedTimeSlot,
              ]}
              onPress={() => handleSlotSelection("8:00 - 12:00")}
            >
              <Text>8:00 - 12:00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedSlot === "13:00 - 17:00" && styles.selectedTimeSlot,
              ]}
              onPress={() => handleSlotSelection("13:00 - 17:00")}
            >
              <Text>13:00 - 17:00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timeSlot,
                selectedSlot === "18:00 - 23:00" && styles.selectedTimeSlot,
              ]}
              onPress={() => handleSlotSelection("18:00 - 23:00")}
            >
              <Text>18:00 - 23:00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setIsManualTimeSelection(true)}
            >
              <View style={styles.radioCircle}>
                {isManualTimeSelection && <View style={styles.selectedRb} />}
              </View>
              <Text style={styles.radioText}>Chọn giờ thủ công</Text>
            </TouchableOpacity>
            {isManualTimeSelection && (
              <View style={styles.timeInputContainer}>
                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => {
                    setIsSelectingStartTime(true);
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.timeInputLabel}>Bắt đầu:</Text>
                  <Text style={styles.timeInputValue}>{startTime}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timeInput}
                  onPress={() => {
                    setIsSelectingStartTime(false);
                    setShowTimePicker(true);
                  }}
                >
                  <Text style={styles.timeInputLabel}>Kết thúc:</Text>
                  <Text style={styles.timeInputValue}>{endTime}</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              style={styles.bookButton}
              onPress={handleConfirmTime}
            >
              <Text style={styles.bookButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          minuteInterval={30}
          onChange={handleTimePickerChange}
        />
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  courtButton: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  courtButtonText: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  courtButtonDescription: {
    fontSize: 14,
    color: "gray",
    padding: 2,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: "blue",
  },
  bookingContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    position: "relative",
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedYard: {
    fontSize: 16,
    marginBottom: 10,
  },
  timeSlot: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedTimeSlot: {
    backgroundColor: "#d0d0d0",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedRb: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 16,
    color: "#000",
  },
  timeInputContainer: {
    marginTop: 10,
    width: "80%",
    alignItems: "flex-start",
  },
  timeInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  timeInputLabel: {
    marginRight: 10,
  },
  timeInputValue: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    width: 100,
  },
  bookButton: {
    marginTop: 15,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookButtonText: {
    color: "white",
    fontSize: 18,
  },
  courtImage: {
    marginVertical: 5,
    width: 322,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  closeModalButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeModalButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default CourtSelectionModal;
