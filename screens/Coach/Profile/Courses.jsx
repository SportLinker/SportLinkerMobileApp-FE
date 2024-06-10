import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Courses = ({ fakeCourses, selectedCourses, onSelectCourses }) => {
  const navigation = useNavigation();
  const handleAddPress = () => {
    navigation.navigate("CourseSelection");
  };

  return (
    <>
      <View style={styles.topInfo}>
        <Text style={styles.topInfoText}>KHÓA HỌC</Text>
        <TouchableOpacity style={styles.addText} onPress={handleAddPress}>
          <Text>Thêm</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        {fakeCourses.map((course) => (
          <View key={course.id} style={styles.courseContainer}>
            <View>
              <TouchableOpacity style={styles.courseHeader}>
                <View style={styles.courseHeaderText}>
                  <Text style={styles.courseName}>{course.name}</Text>
                </View>
                <View>
                  <AntDesign name="right" size={24} color="#000" />
                </View>
              </TouchableOpacity>
              <View style={styles.separator} />
              <View style={styles.courseDetails}>
                <View style={styles.center}>
                  <Text style={styles.label}>Mô tả</Text>
                  <Text style={styles.description}>{course.description}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 30,
  },
  topInfoText: {
    color: "#707070",
    fontWeight: "bold",
  },
  addText: {
    color: "#4878D9",
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
    marginVertical: 10,
  },
  courseContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  courseHeaderText: {
    flexDirection: "row",
  },
  courseName: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: "#C4C4C4",
    marginHorizontal: 20,
  },
  courseDetails: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    color: "#707070",
  },
  description: {
    fontWeight: "bold",
  },
});

export default Courses;
