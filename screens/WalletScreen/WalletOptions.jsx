import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, FAB } from "react-native-paper";
import { formatCurrency } from "../../utils";
import { useEffect, useState } from "react";
import WithDrawModal from "../AccountScreen/Withdraw/WithDrawModal";
import ReChargeModal from "../AccountScreen/Recharge/ReChargeModal";
import { useSelector } from "react-redux";

const WalletOptions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false); // Add state for withdraw modal
  const [isHideMoney, setIsHideMoney] = useState(true);
  const { listTransaction } = useSelector((state) => state.paymentSlice);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleWithdrawModal = () => {
    // Add toggle function for withdraw modal
    setWithdrawModalVisible(!withdrawModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Avatar.Image
            size={60}
            source={{
              uri: listTransaction.user.avatar_url,
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.profileName}>{listTransaction.user.name}</Text>
            <View style={styles.balanceWrapper}>
              <TouchableOpacity onPress={() => setIsHideMoney(!isHideMoney)}>
                {isHideMoney ? (
                  <MaterialCommunityIcons
                    name="eye-off"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons name="eye" size={24} color="black" />
                )}
              </TouchableOpacity>
              <Text style={styles.balance}>
                {isHideMoney
                  ? "*******"
                  : formatCurrency(
                      listTransaction.user.Wallet.balance,
                      "VND",
                      "vi-VN"
                    )}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              toggleWithdrawModal(); // Toggle withdraw modal on press
            }}
          >
            <MaterialCommunityIcons
              name="application-export"
              size={24}
              color="black"
            />
            <Text style={{ marginTop: 5 }}>Rút Tiền</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={toggleModal}>
            <MaterialCommunityIcons name="bank" size={24} color="black" />
            <Text style={{ marginTop: 5 }}>Nạp Tiền</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ReChargeModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <WithDrawModal // Include the new withdraw modal
        modalVisible={withdrawModalVisible}
        setModalVisible={setWithdrawModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  balanceWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
  },
  balance: {
    fontSize: 16,
    paddingRight: 10,
    color: "black",
    width: "70%",
  },
  headerContainer: {
    backgroundColor: "#1646a9",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 10,
    width: "90%",
    borderRadius: 15,
  },
  avatar: {
    marginVertical: "auto",
    marginRight: 30,
    marginLeft: 20,
  },
  profileName: {
    marginVertical: "auto",
    fontSize: 20,
    fontWeight: "700",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    padding: 10,
    width: "40%",
    borderRadius: 15,
  },
});

export default WalletOptions;
