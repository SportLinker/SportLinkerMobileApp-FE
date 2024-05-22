import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Avatar } from "react-native-paper";

export default function CommentModal({ modalVisible, setModalVisible }) {
  const [commentText, setCommentText] = useState("");
  const comments = [
    {
      id: "1",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
      comment: "Great post!",
    },
    {
      id: "2",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      comment: "Nice one!",
    },
    {
      id: "3",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Michael Johnson",
      comment: "Thanks for sharing.",
    },
    {
      id: "4",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Davis",
      comment: "Really insightful!",
    },
    {
      id: "5",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "William Brown",
      comment: "Loved the content!",
    },
    {
      id: "6",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Sophia Wilson",
      comment: "Very informative.",
    },
    {
      id: "7",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "James Taylor",
      comment: "Well written!",
    },
    {
      id: "8",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Olivia Martinez",
      comment: "Great insights.",
    },
    {
      id: "9",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Benjamin Anderson",
      comment: "Excellent post!",
    },
    {
      id: "10",
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      name: "Isabella Thomas",
      comment: "Really enjoyed this!",
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <MaterialIcons
                name={"arrow-back-ios-new"}
                size={24}
                color="#000"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Bình luận</Text>
          </View>
          <FlatList
            style={{ width: "100%" }}
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <View style={styles.commentContent}>
                  <Avatar.Image
                    size={40}
                    source={{
                      uri: item.avatar,
                    }}
                    style={styles.avatar}
                  />
                  <View style={styles.commentText}>
                    <Text style={styles.commentName}>{item.name}</Text>
                    <Text>{item.comment}</Text>
                  </View>
                </View>
              </View>
            )}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity style={styles.sendButton}>
              <MaterialIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    marginRight: 20,
  },

  commentItem: {
    paddingVertical: 10,
    width: "100%",
    paddingHorizontal: 20,
  },
  commentContent: {
    flexDirection: "row",
  },
  commentText: {
    marginLeft: 10,
  },
  commentName: {
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    backgroundColor: "#1646A9",
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
