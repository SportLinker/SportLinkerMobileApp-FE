import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../../component/style";
import { logout } from "../../redux/slices/userSlice";

export default function MenuAccount({ showMenu, setShowMenu }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showLogOut, setShowLogOut] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false); // Add state for withdraw modal

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleWithdrawModal = () => {
    // Add toggle function for withdraw modal
    setWithdrawModalVisible(!withdrawModalVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowLogOut(false);
    navigation.navigate("Login");
  };

  return (
    <>
      <Modal
        visible={showMenu}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setShowMenu(false)}
        >
          <TouchableOpacity
            style={styles.menuAccount}
            activeOpacity={1}
            onPress={() => {}}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("WalletHomeScreen");
              }}
              style={styles.menuItem}
            >
              <Text style={styles.textMenuItem}>Ví của tôi</Text>
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
                navigation.navigate("PasswordScreen");
              }}
              style={styles.menuItem}
            >
              <Text style={styles.textMenuItem}>Đổi Mật Khẩu</Text>
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
                setShowLogOut(true);
              }}
              style={styles.menuItem}
            >
              <Text style={[styles.textMenuItem, styles.cancelText]}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: 5,
                borderColor: "#C4C4C4",
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={showLogOut}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowLogOut(false)}
      >
        <TouchableOpacity style={styles.modalLogout} activeOpacity={1}>
          <TouchableOpacity
            style={styles.confirmLogout}
            activeOpacity={1}
            onPress={() => {}}
          >
            <Text
              style={{ textAlign: "center", fontWeight: 700, fontSize: 16 }}
            >
              Bạn có muốn đăng xuất?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                <Text style={[styles.textMenuLogout, styles.blueText]}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowLogOut(false);
                }}
                style={styles.menuItem}
              >
                <Text style={[styles.textMenuLogout, styles.cancelText]}>
                  Hủy bỏ
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
