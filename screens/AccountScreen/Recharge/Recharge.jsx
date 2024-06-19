import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ReChargeModal from "./ReChargeModal";

export default function Recharge() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.walletContainer}>
        <View style={styles.walletInfo}>
          <Text style={styles.walletText}>Ví Của Bạn</Text>
          <Text style={styles.walletAmount}>VND 100.000</Text>
        </View>
        <View style={styles.rechargeButtonContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.rechargeButton}>
            <Icon
              name="wallet-plus-outline"
              size={30}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.rechargeText}>Nạp tiền</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ReChargeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  walletContainer: {
    backgroundColor: "#236457",
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  walletInfo: {
    width: "50%",
  },
  walletText: {
    color: "white",
    fontWeight: "600",
    marginBottom: 20,
  },
  walletAmount: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  rechargeButtonContainer: {
    alignItems: "center",
    width: "50%",
  },
  rechargeButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 5,
  },
  rechargeText: {
    color: "white",
    fontWeight: "600",
  },
});
