import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CoursesListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      title: "Bài tập toàn thân",
      description:
        "Kế hoạch tập luyện toàn thân toàn diện để tăng cường sức mạnh và sức bền.",
      duration: "4 tuần",
      benefits: "Tăng cường sức mạnh, đốt cháy mỡ, cải thiện sức khỏe tim mạch",
      price: "$49.99",
    },
    {
      id: 2,
      title: "Bùng nổ Cardio",
      description:
        "Bài tập cardio cường độ cao để cải thiện sức khỏe tim mạch.",
      duration: "3 tuần",
      benefits: "Đốt cháy mỡ, tăng cường sức khỏe tim mạch, tăng cường sức bền",
      price: "$39.99",
    },
    {
      id: 3,
      title: "Yoga cho người mới bắt đầu",
      description: "Khóa học giới thiệu các cơ bản của yoga.",
      duration: "2 tuần",
      benefits: "Giảm căng thẳng, cải thiện linh hoạt, tăng sự tập trung",
      price: "$29.99",
    },
    {
      id: 4,
      title: "Pilates nâng cao",
      description:
        "Các bài tập pilates thách thức để cải thiện sức mạnh và sự linh hoạt của cơ lõi.",
      duration: "5 tuần",
      benefits:
        "Tăng cường sức mạnh cơ lõi, cải thiện sự linh hoạt, cải thiện kiểm soát cơ thể",
      price: "$54.99",
    },
    {
      id: 5,
      title: "Đào tạo HIIT",
      description:
        "Bài tập cường độ cao ngắt quãng để đốt cháy mỡ và tăng sức bền.",
      duration: "6 tuần",
      benefits:
        "Đốt cháy mỡ nhanh chóng, tăng sức mạnh, cải thiện sức bền tim mạch",
      price: "$59.99",
    },
    {
      id: 6,
      title: "Đào tạo sức mạnh",
      description:
        "Đào tạo sức đề kháng tiến bộ để tăng trưởng cơ bắp và sức bền.",
      duration: "8 tuần",
      benefits: "Tăng cường sức mạnh, tăng sự bền, cải thiện hình dáng cơ thể",
      price: "$69.99",
    },
    {
      id: 7,
      title: "Thể hình chức năng",
      description:
        "Các bài tập để nâng cao các hoạt động hàng ngày và tổng thể.",
      duration: "4 tuần",
      benefits:
        "Tăng cường sức mạnh, cải thiện linh hoạt, tăng hiệu suất hàng ngày",
      price: "$49.99",
    },
    {
      id: 8,
      title: "Thiền 101",
      description:
        "Các buổi thiền dẫn dắt để giảm căng thẳng và cải thiện sự rõ ràng về tinh thần.",
      duration: "3 tuần",
      benefits: "Giảm căng thẳng, cải thiện tập trung, tăng cường sự yên bình",
      price: "$39.99",
    },
    {
      id: 9,
      title: "Cơ bản về Kickboxing",
      description:
        "Học những kiến thức cơ bản về kickboxing để tăng cường sức khỏe và tự vệ.",
      duration: "4 tuần",
      benefits: "Tăng cường sức mạnh, tăng sự tự tin, cải thiện linh hoạt",
      price: "$49.99",
    },
    {
      id: 10,
      title: "Cardio khiêu vũ",
      description:
        "Bài tập khiêu vũ vui nhộn và sôi động để cải thiện sức khỏe tim mạch.",
      duration: "3 tuần",
      benefits:
        "Giảm căng thẳng, tăng cường sức khỏe tim mạch, tăng sự linh hoạt",
      price: "$39.99",
    },
  ];

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
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedCourse && (
            <>
              <Title style={styles.modalTitle}>{selectedCourse.title}</Title>
              <View style={styles.detailItem}>
                <Icon
                  name="information"
                  size={20}
                  color="#1646a9"
                  style={styles.detailIcon}
                />
                <View style={styles.detailText}>
                  <Paragraph style={styles.modalLabel}>Mô tả:</Paragraph>
                  <Paragraph style={styles.modalDescription}>
                    {selectedCourse.description}
                  </Paragraph>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Icon
                  name="clock-outline"
                  size={20}
                  color="#1646a9"
                  style={styles.detailIcon}
                />
                <View style={styles.detailText}>
                  <Paragraph style={styles.modalLabel}>
                    Thời gian học:
                  </Paragraph>
                  <Paragraph style={styles.modalDescription}>
                    {selectedCourse.duration}
                  </Paragraph>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Icon
                  name="star-outline"
                  size={20}
                  color="#1646a9"
                  style={styles.detailIcon}
                />
                <View style={styles.detailText}>
                  <Paragraph style={styles.modalLabel}>
                    Lợi ích sau khi hoàn thành:
                  </Paragraph>
                  <Paragraph style={styles.modalDescription}>
                    {selectedCourse.benefits}
                  </Paragraph>
                </View>
              </View>
              <View style={styles.detailItem}>
                <Icon
                  name="currency-usd"
                  size={20}
                  color="#1646a9"
                  style={styles.detailIcon}
                />
                <View style={styles.detailText}>
                  <Paragraph style={styles.modalLabel}>Giá:</Paragraph>
                  <Paragraph style={styles.modalDescription}>
                    {selectedCourse.price}
                  </Paragraph>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="outlined"
                  onPress={() => setModalVisible(false)}
                  style={styles.button}
                >
                  Đóng
                </Button>
                <Button
                  mode="contained"
                  onPress={handleDelete}
                  style={styles.button}
                >
                  Xóa
                </Button>
              </View>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
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
  },
  description: {
    color: "#333333",
  },
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
    marginBottom: 10,
    textAlign: "center",
    color: "#1646a9",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start", // Để icon và label cùng hàng
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    justifyContent: "flex-start", // Để label căn đều bên trái
    alignItems: "flex-start", // Để label căn đều bên trái
  },
  modalLabel: {
    fontWeight: "bold",
    color: "#1646a9",
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
  },
  closeIcon: {
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    width: "40%",
    marginRight: 10,
  },
});

export default CoursesListScreen;
