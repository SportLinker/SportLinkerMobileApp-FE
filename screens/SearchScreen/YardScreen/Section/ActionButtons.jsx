import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../component/style";
import CourtSelectionModal from "../CourtSelection/CourtSelectionModal";

export const ActionButtons = ({ stadium, handleRating }) => {
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
      <TouchableOpacity style={styles.iconContainer} onPress={handleRating}>
        <Ionicons
          name="reader-outline"
          size={30}
          color="black"
          style={{ paddingBottom: 3 }}
        />
        <Text>Đánh giá</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={openModal}>
        <Ionicons
          name="bookmark-outline"
          size={30}
          color="black"
          style={{ paddingBottom: 3 }}
        />
        <Text>Đặt sân</Text>
      </TouchableOpacity>
      <CourtSelectionModal
        visible={modalCourtVisible}
        onClose={closeModal}
        stadiumId={stadium.id}
      />
    </View>
  );
};
