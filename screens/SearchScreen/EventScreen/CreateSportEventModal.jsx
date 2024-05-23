import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import StepOne from "./Step/StepOne";
import StepTwo from "./Step/StepTwo";
import StepThree from "./Step/StepThree";

const CreateSportEventModal = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  // STEP 1
  const [eventName, setEventName] = useState("");
  const [clubName, setClubName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventTime, setEventTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  // STEP 2
  const [participants, setParticipants] = useState(0);
  const [budget, setBudget] = useState(0);
  const [note, setNote] = useState("");
  // STEP 3
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

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

  const checkStepEmpty = (step) => {
    if (step === 1) {
      if (!eventName.trim() || !selectedSport) {
        return "Please fill in all fields for Step 1";
      }
    } else if (step === 2) {
      if (participants <= 0 || budget <= 0 || !note.trim()) {
        return "Please fill in all fields for Step 2";
      }
    } else if (step === 3) {
      if (!selectedLocation) {
        return "Please fill in all fields for Step 3";
      }
    }

    return null; // No error, all fields are filled
  };

  const handleNextStep = () => {
    const stepEmptyError = checkStepEmpty(step);
    if (stepEmptyError) {
      Alert.alert("Error", stepEmptyError);
      return;
    }

    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      onClose();
    }
  };

  const handlePreviousStep = () => {
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
          <StepOne
            eventName={eventName}
            setEventName={setEventName}
            clubName={clubName}
            setClubName={setClubName}
            eventDate={eventDate}
            setShowDatePicker={setShowDatePicker}
            showDatePicker={showDatePicker}
            handleDateChange={handleDateChange}
            eventTime={eventTime}
            setShowTimePicker={setShowTimePicker}
            showTimePicker={showTimePicker}
            handleTimeChange={handleTimeChange}
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
          />
        )}
        {step === 2 && (
          <StepTwo
            budget={budget}
            setBudget={setBudget}
            participants={participants}
            setParticipants={setParticipants}
            note={note}
            setNote={setNote}
          />
        )}
        {step === 3 && (
          <StepThree
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        )}
        <View style={styles.buttonContainer}>
          <Button
            mode="elevated"
            onPress={handlePreviousStep}
            disabled={step === 1}
            style={styles.buttonPre}
            textColor="#1646A9"
          >
            Trước
          </Button>
          <Button
            mode="elevated"
            onPress={handleNextStep}
            style={styles.button}
            textColor="#fff"
          >
            {step === 3 ? "Hoàn thành" : "Tiếp tục"}
          </Button>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // position: "absolute",
    // bottom: 20,
    // left: 0,
    // right: 0,
  },
  btnBack: {
    fontSize: 14,
    color: "#1646A9",
    fontWeight: "600",
  },
  button: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#1646A9",
    backgroundColor: "#1646A9",
  },
  buttonPre: {
    marginHorizontal: 10,
    borderWidth: 1,
    textColor: "#1646A9",
    backgroundColor: "#fff",
  },
});
