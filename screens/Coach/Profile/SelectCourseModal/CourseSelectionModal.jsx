import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Checkbox, TextInput } from "react-native-paper";
import { courses } from "../../../../utils/constant";

const CourseSelectionScreen = ({ navigation, route }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const toggleCourseSelection = (course) => {
    setSelectedCourses((prevSelected) => {
      if (prevSelected.includes(course)) {
        return prevSelected.filter((item) => item !== course);
      } else {
        return [...prevSelected, course];
      }
    });
  };

  const handleConfirm = () => {
    console.log("Selected courses:", selectedCourses);
    console.log("Selected courseName:", courseName);
    console.log("Selected courseDescription:", courseDescription);
    navigation.navigate("CoachProfile", { selectedCourses });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.modalTitle}>Chọn khóa học</Text>
        <TextInput
          label="Tên khóa học"
          value={courseName}
          onChangeText={setCourseName}
          style={styles.input}
        />
        <TextInput
          label="Mô tả khóa học"
          value={courseDescription}
          onChangeText={setCourseDescription}
          multiline
          style={styles.input}
        />

        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleCourseSelection(course)}
          >
            <View style={styles.courseItem}>
              <Checkbox
                status={
                  selectedCourses.includes(course) ? "checked" : "unchecked"
                }
                onPress={() => toggleCourseSelection(course)}
              />
              <Text style={styles.courseTitle}>{course.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Button
          mode="contained"
          onPress={handleConfirm}
          style={styles.confirmButton}
        >
          Xác nhận
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  courseItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  courseTitle: {
    marginLeft: 10,
  },
  input: {
    marginVertical: 10,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#1646a9",
  },
});

export default CourseSelectionScreen;
