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
    setSelectedDate(currentDate); // Cập nhật giá trị đã chọn
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
        />
        <TextInput
          label="Mô tả"
          value={newCourse.description}
          onChangeText={(text) =>
            setNewCourse({ ...newCourse, description: text })
          }
          style={styles.input}
        />
        <View style={styles.dateTimeContainer}>
          <Button onPress={() => setShowDatePicker(true)}>
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
          {/* Hiển thị giá trị đã chọn từ date picker */}
          <Text style={styles.selectedDate}>{formatDate(selectedDate)}</Text>
        </View>
        <TextInput
          label="Lợi ích"
          value={newCourse.benefits}
          onChangeText={(text) =>
            setNewCourse({ ...newCourse, benefits: text })
          }
          style={styles.input}
        />
        <TextInput
          label="Giá"
          value={newCourse.price}
          onChangeText={(text) => setNewCourse({ ...newCourse, price: text })}
          style={styles.input}
          keyboardType="number-pad"
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleCreate}
            style={styles.buttonCreate}
          >
            Tạo
          </Button>
          <Button mode="outlined" onPress={onClose} style={styles.buttonClose}>
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
    backgroundColor: "#ffffff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1646a9",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  dateTimeContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  buttonCreate: {
    backgroundColor: "#28a745",
    width: "45%",
  },
  buttonClose: {
    backgroundColor: "#1646a9",
    width: "45%",
  },
  dateTimePicker: {
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333333",
  },
});

export default CreateCourseModal;
