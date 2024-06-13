import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../component/style";
import { CourtSelectionModal } from "../CourtSelectionModal";

export const ActionButtons = ({ setModalVisible, liked, setLiked }) => {
  const navigation = useNavigation();
  const [modalCourtVisible, setModalCourtVisible] = useState(false);

  const openModal = () => {
    setModalCourtVisible(true);
  };

  const closeModal = () => {
    setModalCourtVisible(false);
  };

  return (
    <View
      style={[
        styles.actionButtonsContainer,
        Platform.OS === "ios" ? styles.iosShadow : styles.androidShadow,
      ]}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons
          name="reader-outline"
          size={30}
          color="black"
          style={{ paddingBottom: 3 }}
        />
        <Text>Đánh giá</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("ChatListScreen")}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={30}
          color="black"
          style={{ paddingBottom: 3 }}
        />
        <Text>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={openModal}>
        <Ionicons
          name="bookmark-outline"
          size={30}
          color="black"
          style={{ paddingBottom: 3 }}
        />
        <Text>Book</Text>
      </TouchableOpacity>
      <CourtSelectionModal visible={modalCourtVisible} onClose={closeModal} />
    </View>
  );
};
