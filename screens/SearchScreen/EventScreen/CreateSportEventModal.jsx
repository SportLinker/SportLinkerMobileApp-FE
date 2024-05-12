import React, { useState } from "react";
import { View, Modal, Text, Button, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { Snackbar, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, formatTime } from "../../../utils";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SportSelectionPopup from "./SportSelectionPopup";

const CreateSportEventModal = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState("");
  const [clubName, setClubName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [sportType, setSportType] = useState("");
  const [eventTime, setEventTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [showSportPicker, setShowSportPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventTime;
    setShowTimePicker(false);
    setEventTime(currentTime);
  };

  const [participants, setParticipants] = useState("");

  const [visibleSnackBar, setVisibleSnackBar] = useState(false);

  const onToggleSnackBar = () => setVisibleSnackBar(!visibleSnackBar);

  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const handleNextStep = () => {
    // Perform validation or other logic based on the current step
    if (step === 1) {
      if (
        eventName == "" ||
        clubName == "" ||
        eventDate == "" ||
        eventTime == ""
      ) {
        return;
      }

      setStep(2);
    } else if (step === 2) {
      // Proceed to Step 3
      // Perform Step 2 validation, save data, etc.
      setStep(3);
    } else if (step === 3) {
      // Perform final validation and submit the form
      // Close the modal or navigate to another screen
      onClose();
    }
  };

  const handlePreviousStep = () => {
    // Move to the previous step
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={onClose}
        >
          <Text style={styles.btnBack}>Quay Về</Text>
        </TouchableOpacity>
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.textTitle}>Chi Tiết</Text>
            <TextInput
              mode="flat"
              activeUnderlineColor="#1646A9"
              textColor="#1646A9"
              label="Tên sự kiện"
              value={eventName}
              onChangeText={(text) => setEventName(text)}
              placeholder="Điền tên sự kiện..."
              style={styles.textInput}
            />
            <TextInput
              mode="flat"
              activeUnderlineColor="#1646A9"
              textColor="#1646A9"
              label="Tên CLB"
              value={clubName}
              onChangeText={(text) => setClubName(text)}
              placeholder="Điền tên clb..."
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.inputDate}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateLabel}>Ngày diễn ra sự kiện:</Text>
              <Text style={styles.dateValue}>{formatDate(eventDate)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={eventDate}
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={handleDateChange}
              />
            )}
            <TouchableOpacity
              style={styles.inputDate}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateLabel}>Giờ diễn ra sự kiện:</Text>
              <Text style={styles.dateValue}>{formatTime(eventTime)}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={eventTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={handleTimeChange}
              />
            )}
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowSportPicker(true)}
            >
              <Text style={styles.dropdownLabel}>Môn thể thao:</Text>
              <View style={styles.selectedSportContainer}>
                {selectedSport ? (
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Icon
                      name={selectedSport.icon}
                      size={30}
                      style={{
                        marginTop: 10,
                        textAlign: "center",
                        color: "white",
                      }} // Adjust the marginTop to center the icon
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 14,
                        marginTop: 10,
                        textAlign: "center",
                      }}
                    >
                      {selectedSport.label}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text style={styles.placeholderText}>
                      Chọn môn thể thao
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <SportSelectionPopup
              visible={showSportPicker}
              onClose={() => setShowSportPicker(false)}
              onSelectSport={(sport) => setSelectedSport(sport)}
            />
          </View>
        )}
        {step === 2 && (
          <View>
            <Text>Step 2: Choose number of participants</Text>
            <TextInput
              placeholder="Number of Participants"
              keyboardType="numeric"
              value={participants}
              onChangeText={(text) => setParticipants(text)}
            />
          </View>
        )}
        {step === 3 && (
          <View>
            <Text>Step 3: Additional details</Text>
            {/* Additional fields for Step 3 */}
          </View>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Button
            title="Back"
            onPress={handlePreviousStep}
            disabled={step === 1}
          />
          <Button
            title={step === 3 ? "Submit" : "Next"}
            onPress={handleNextStep}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateSportEventModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    paddingTop: 30,
  },
  stepContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  btnBack: {
    fontSize: 14,
    color: "#1646A9",
    fontWeight: "600",
  },
  textTitle: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
  },
  textInput: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  inputDate: {
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#707070",
    textAlign: "center",
  },
  dateValue: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  dropdown: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 15,
  },
  dropdownLabel: {
    fontSize: 16,
    marginRight: 10,
    color: "#707070",
  },
  selectedSportContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#1646A9",
    borderRadius: 10,
    width: "60%",
    flexDirection: "row",
    justifyContent: "center",
  },
  placeholderText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});
