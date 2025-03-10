import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../../../../../component/style";
import {
  deleteYard,
  getAllYardByOwner,
} from "../../../../../redux/slices/yardSlice";
import { DeleteModal } from "../../../StadiumScreen/InfoStadium/Section/DeleteStadiumModal";

export const ActionButtons = ({ yardDetail, yardId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = async () => {
    const res = await dispatch(deleteYard({ yard_id: yardId }));
    const { code, message } = res.payload;

    dispatch(getAllYardByOwner());
    navigation.goBack();
    if (code === 200 || code === 201) {
      Alert.alert("Xác nhận", "Bạn đã xóa sân nhỏ thành công!");
    } else if (code === 400) {
      Alert.alert("Thông báo", message);
    } else if (code === 500) {
      Alert.alert("Thông báo", "Chức năng đang được bảo trì!");
    }
    setModalVisible(false);
  };

  return (
    <View
      style={[
        styles.actionButtonsContainer,
        Platform.OS === "ios" ? styles.iosShadow : styles.androidShadow,
        { marginTop: 50 },
      ]}
    >
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() =>
          navigation.navigate("ScheduleYard", { yardDetail: yardDetail })
        }
      >
        <FontAwesome name="calendar" size={30} color="black" />
        <Text>Lịch đặt sân</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() =>
          navigation.navigate("CreateYard", {
            yardId: yardDetail.yard_id,
            yardDetail: yardDetail,
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
