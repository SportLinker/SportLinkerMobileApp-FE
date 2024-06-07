import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CreateCourseModal from "./CreateCourseModal";
import CourseDetailModal from "./CourseDetailModal";
import { courses } from "../../../utils/constant";

const CoursesListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handlePress = (course) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa khóa học "${selectedCourse.title}" không?`,
      [
        {
          text: "Hủy",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            // Xử lý xóa khóa học ở đây
            console.log("Deleted course: ", selectedCourse.title);
            setModalVisible(false);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        mode="contained"
        onPress={() => setCreateModalVisible(true)}
        style={styles.createButton}
      >
        Tạo khóa học mới
      </Button>
      {courses.map((course, index) => (
        <TouchableOpacity key={index} onPress={() => handlePress(course)}>
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.titleContainer}>
                <Title style={styles.title}>{course.title}</Title>
                <Icon name="chevron-right" size={24} color="#1646a9" />
              </View>
              <Paragraph style={styles.description}>
                {course.description}
              </Paragraph>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      ))}
      <CourseDetailModal
        visible={modalVisible}
        course={selectedCourse}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
      />
      <CreateCourseModal
        visible={createModalVisible}
        onClose={() => setCreateModalVisible(false)}
        onCreate={(newCourse) => {
          // Thêm logic để thêm khóa học mới vào danh sách
          console.log("Created course: ", newCourse);
          setCreateModalVisible(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  createButton: {
    marginBottom: 10,
    backgroundColor: "#1646a9",
    width: "50%",
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    color: "#1646a9",
    fontWeight: "600",
  },
  description: {
    color: "#333333",
  },
});

export default CoursesListScreen;
