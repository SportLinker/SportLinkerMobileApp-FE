import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../component/style";
import { useNavigation } from "@react-navigation/native";

export default function MenuAccount({ showMenu, setShowMenu }) {
  const navigation = useNavigation();
  return (
    <Modal visible={showMenu} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.menuAccount}>
          <TouchableOpacity
            onPress={() => {
              setShowMenu(false);
              navigation.navigate("PasswordScreen");
            }}
            style={styles.menuItem}
          >
            <Text style={styles.textMenuItem}>Đổi mật khẩu</Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 5,
              borderColor: "#C4C4C4",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowMenu(false);
            }}
            style={styles.menuItem}
          >
            <Text style={[styles.textMenuItem, styles.cancelText]}>Hủy bỏ</Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: 1,
              marginVertical: 5,
              borderColor: "#C4C4C4",
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
