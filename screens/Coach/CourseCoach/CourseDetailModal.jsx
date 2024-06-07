import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Title, Paragraph, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CourseDetailModal = ({ visible, course, onClose, onDelete }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        {course && (
          <View style={{ alignItems: "flex-start" }}>
            <Title style={styles.modalTitle}>{course.title}</Title>
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
                  {course.description}
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
                <Paragraph style={styles.modalLabel}>Thời gian học:</Paragraph>
                <Paragraph style={styles.modalDescription}>
                  {course.duration}
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
                  {course.benefits}
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
                  {course.price}
                </Paragraph>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={onClose}
                style={[styles.button, styles.buttonClose]}
              >
                Đóng
              </Button>
              <Button
                mode="outlined"
                onPress={onDelete}
                style={styles.button}
                textColor="#1646a9"
              >
                Xóa
              </Button>
            </View>
          </View>
        )}
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
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  detailIcon: {
    marginRight: 10,
  },
  detailText: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  button: {
    width: "45%",
    marginLeft: 10,
  },
  buttonClose: {
    backgroundColor: "#1646a9",
  },
});

export default CourseDetailModal;
