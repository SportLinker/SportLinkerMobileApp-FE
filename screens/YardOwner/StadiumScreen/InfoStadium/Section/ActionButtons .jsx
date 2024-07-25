import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../../../component/style";
import { DeleteModal } from "./DeleteStadiumModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStadium,
  getAllYardByYardOwner,
  getStadiumByOwner,
} from "../../../../../redux/slices/yardSlice";
import { getAllYardByOwnerSelector } from "../../../../../redux/selectors";

export const ActionButtons = ({ stadiumId, stadiumDetail }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    const res = await dispatch(deleteStadium({ stadium_id: stadiumId }));
    const { code, message } = res.payload;
    if (code === 200 || code === 201) {
      Alert.alert("Thành công", "Sân đã được xóa thành công!");
    } else if (code === 400) {
      Alert.alert("Thất bại", message);
    } else if (code === 500) {
      Alert.alert("Thất bại", "Hệ thống đang bảo trì!");
    }
    dispatch(getStadiumByOwner());
    navigation.goBack();

    setModalVisible(false);
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
        onPress={() =>
          navigation.navigate("ListYard", { stadiumId: stadiumId })
        }
      >
        <FontAwesome name="list-ul" size={30} color="black" />
        <Text>Ds sân nhỏ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() =>
          navigation.navigate("CreateYard", {
            stadiumId: stadiumId,
          })
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
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() =>
          navigation.navigate("CreateStadium", {
            stadiumId: stadiumId,
            stadiumDetail: stadiumDetail,
          })
        }
      >
        <AntDesign name="edit" size={30} color="black" />
        <Text>Cập nhật sân</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="delete" size={30} color="black" />
        <Text>Xóa sân</Text>
      </TouchableOpacity>
      <DeleteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDelete}
      />
    </View>
  );
};
