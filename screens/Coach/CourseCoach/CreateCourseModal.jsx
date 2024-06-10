import React, { useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import { TextInput, Button, Title } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../../../utils";

const CreateCourseModal = ({ visible, onClose, onCreate }) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: new Date(),
    benefits: "",
    price: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreate = () => {
    onCreate(newCourse);
    setNewCourse({
      title: "",
      description: "",
      duration: selectedDate,
      benefits: "",
      price: "",
    });
  };

  const handleDurationChange = (event, selectedDate) => {
    setShowDatePicker(false);
    const currentDate = selectedDate || newCourse.duration;
    setNewCourse({ ...newCourse, duration: currentDate });
    setSelectedDate(currentDate); // Update selected date
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Title style={styles.modalTitle}>Tạo khóa học mới</Title>
        <TextInput
          label="Tên khóa học"
          value={newCourse.title}
          onChangeText={(text) => setNewCourse({ ...newCourse, title: text })}
          style={styles.input}
          underlineColor="#1646a9"
          theme={{ colors: { primary: "#1646a9" } }}
        />
        <TextInput
          label="Mô tả"
          value={newCourse.description}
          onChangeText={(text) =>
            setNewCourse({ ...newCourse, description: text })
          }
          style={styles.input}
          underlineColor="#1646a9"
          theme={{ colors: { primary: "#1646a9" } }}
        />
        <View style={styles.dateTimeContainer}>
          <Button onPress={() => setShowDatePicker(true)} color="#1646a9">
            Chọn thời gian (tuần)
          </Button>
          {showDatePicker && (
            <DateTimePicker
              value={newCourse.duration}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDurationChange}
              style={styles.dateTimePicker}
            />
          )}
          <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
        </View>
        <TextInput
          label="Lợi ích"
          value={newCourse.benefits}
          onChangeText={(text) =>
            setNewCourse({ ...newCourse, benefits: text })
          }
          style={styles.input}
          underlineColor="#1646a9"
          theme={{ colors: { primary: "#1646a9" } }}
        />
        <TextInput
          label="Giá"
          value={newCourse.price}
          onChangeText={(text) => setNewCourse({ ...newCourse, price: text })}
          style={styles.input}
          keyboardType="number-pad"
          underlineColor="#1646a9"
          theme={{ colors: { primary: "#1646a9" } }}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleCreate}
            style={styles.buttonCreate}
            color="#1646a9"
          >
            Tạo
          </Button>
          <Button
            mode="outlined"
            onPress={onClose}
            style={styles.buttonClose}
            color="#1646a9"
          >
            Hủy
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1646a9",
  },
  input: {
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  dateTimeContainer: {
    width: "100%",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  buttonCreate: {
    backgroundColor: "#1646a9",
    width: "45%",
    paddingVertical: 5,
  },
  buttonClose: {
    borderColor: "#1646a9",
    width: "45%",
    paddingVertical: 5,
  },
  dateTimePicker: {
    width: "100%",
  },
  selectedDate: {
    fontSize: 16,
    marginTop: 10,
    color: "#495057",
  },
});

export default CreateCourseModal;
