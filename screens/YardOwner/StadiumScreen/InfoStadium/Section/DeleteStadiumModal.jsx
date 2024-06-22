import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const DeleteModal = ({ visible, onClose, onDelete }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.title}>Xóa sân này?</Text>
          <Text style={modalStyles.message}>
            Bạn có chắc chắn muốn xóa sân này không?
          </Text>
          <View style={modalStyles.buttonContainer}>
            <TouchableOpacity style={modalStyles.button} onPress={onClose}>
              <Text style={modalStyles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.deleteButton]}
              onPress={onDelete}
            >
              <Text
                style={[modalStyles.buttonText, modalStyles.deleteButtonText]}
              >
                Xóa
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  deleteButtonText: {
    color: "white",
  },
});
