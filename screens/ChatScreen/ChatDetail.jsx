import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageDetail,
  sendMessageByUser,
} from "../../redux/slices/messageSlice";

export default function ChatDetail({ navigation }) {
  const { chatDetail, group_message_id, loading, error } = useSelector(
    (state) => state.messageSlice
  );
  const dispatch = useDispatch();
  console.log("group_message_id: " + JSON.stringify(group_message_id));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { text: "hello", sender: "guest" },
    {
      text: "I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello!I'm doing well, thank you!  Hello!",
      sender: "me",
    },
    {
      text: "I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello!I'm doing well, thank you!  Hello!",
      sender: "me",
    },
    {
      text: "I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello!I'm doing well, thank you!  Hello!",
      sender: "me",
    },
    {
      text: "I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello!I'm doing well, thank you!  Hello!",
      sender: "me",
    },
    {
      text: "I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello! I'm doing well, thank you!  Hello!I'm doing well, thank you!  Hello!",
      sender: "guest",
    },
  ]);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [chatDetail]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      dispatch(
        sendMessageByUser({
          group_message_id: group_message_id,
          content: message,
        })
      ).then((res) => {
        setMessage("");
        dispatch(getMessageDetail(group_message_id));
        Keyboard.dismiss();
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.chatHeader}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatListScreen")}
          >
            <Text style={styles.btnBack}>Quay về</Text>
          </TouchableOpacity>
          <View style={styles.avatarWrap}>
            <Avatar.Image
              size={60}
              source={{
                uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
              }}
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={styles.userName}>Tài Võ</Text>
              <Text style={styles.userActive}>Đang hoạt động</Text>
            </View>
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatBody}
          contentContainerStyle={{ paddingTop: 20 }}
          onLayout={scrollToBottom} // Scroll to the end when ScrollView is rendered
        >
          {chatDetail
            .slice()
            .reverse()
            .map((msg, index) => (
              <View
                key={msg.message_id}
                style={
                  msg.is_me === true
                    ? [styles.message, styles.myMessage]
                    : [styles.message, styles.guestMessage]
                }
              >
                <Text
                  style={
                    msg.is_me === true ? { color: "white" } : { color: "black" }
                  }
                >
                  {msg.content}
                </Text>
              </View>
            ))}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.inputContainer}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Gõ tin nhắn ở đây..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />

          <FAB
            icon="send"
            size="small"
            style={styles.btnSend}
            onPress={sendMessage}
            color="white"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    backgroundColor: "#1646A9",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 60,
  },
  btnBack: {
    fontSize: 14,
    color: "#ffff",
    fontWeight: "600",
  },
  avatarWrap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 5,
  },
  userActive: {
    fontSize: 12,
    fontWeight: "400",
    color: "white",
  },
  chatBody: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 10,
    marginTop: -45,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    overflow: "hidden",
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#1646A9",
    alignSelf: "flex-end",
  },
  guestMessage: {
    backgroundColor: "#F6F6F6",
    alignSelf: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  btnSend: {
    backgroundColor: "#1646A9",
    borderRadius: 50,
  },
});
