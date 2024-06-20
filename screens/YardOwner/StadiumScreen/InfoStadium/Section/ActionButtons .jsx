import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../../component/style";

export const ActionButtons = ({ stadiumId }) => {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.actionButtonsContainer,
        Platform.OS === "ios" ? styles.iosShadow : styles.androidShadow,
      ]}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate("")}
      >
        <FontAwesome name="list-ul" size={30} color="black" />
        <Text>Danh sách sân nhỏ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() =>
          navigation.navigate("CreateYard", { stadiumId: stadiumId })
        }
      >
        <Ionicons
          name="create-outline"
          size={30}
          color="black"
          style={{ paddingBottom: 3 }}
        />
        <Text>Tạo sân nhỏ</Text>
      </TouchableOpacity>
    </View>
  );
};
