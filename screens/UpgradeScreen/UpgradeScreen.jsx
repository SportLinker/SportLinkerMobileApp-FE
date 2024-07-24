import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Image, View } from "react-native";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import CurrentPlan from "./CurrentPlan";
import PlanSelection from "./PlanSelection";
import backgroundImage from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getPremiumByUser,
  registerPremium,
} from "../../redux/slices/userSlice";
import { getUserSelector } from "../../redux/selectors";
import { formatDate, formatISODate } from "../../utils";

export default function UpgradeScreen({ navigation }) {
  const [checked, setChecked] = useState("first");
  const [visible, setVisible] = useState(false); // Modal for insufficient funds
  const [successVisible, setSuccessVisible] = useState(false); // Modal for success
  const [qrVisible, setQrVisible] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [currentPlan, setCurrentPlan] = useState(
    "Gói Cơ Bản - 39.000đ / tháng"
  );
  const [expiryDate, setExpiryDate] = useState(null);
  const [hasEnoughFunds, setHasEnoughFunds] = useState(false); // Check if user has enough funds

  const dispatch = useDispatch();

  const userSelector = useSelector(getUserSelector);
  const fetchCurrentPlan = () => {
    dispatch(getPremiumByUser()).then((res) => {
      console.log("res: " + JSON.stringify(res));
      if (res.payload.metadata.status == "active") {
        if (res.payload.metadata.type == "month") {
          setCurrentPlan("Gói Cơ Bản - 39.000đ / tháng");
        } else if (res.payload.metadata.type == "year") {
          setCurrentPlan("Gói 1 Năm - 390.000đ / năm");
        }
        setExpiryDate(formatISODate(res.payload.metadata.expired_at));
      }
    });
  };

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  useEffect(() => {
    let interval;
    if (qrVisible && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0) {
      hideQrDialog();
    }
    return () => clearInterval(interval);
  }, [qrVisible, timer]);

  const handleSubmit = () => {
    const type = checked === "first" ? "month" : "year";
    dispatch(
      registerPremium({
        type,
      })
    ).then((res) => {
      console.log("res: " + JSON.stringify(res));
      setQrVisible(false);
      if (res.payload.message === "Create premium successfully") {
        setSuccessVisible(true);
        fetchCurrentPlan();
      }

      if (res.payload.message === "Ví của bạn không đủ để thanh toán") {
        setVisible(true);
      }
    });

    // setQrVisible(false);
    // if (hasEnoughFunds) {
    //   setSuccessVisible(true); // Show success modal
    // } else {
    //   setVisible(true); // Show insufficient funds modal
    // }
  };

  const hideDialog = () => {
    navigation.navigate("WalletHomeScreen");
    setVisible(false);
  };

  const hideSuccessDialog = () => {
    setSuccessVisible(false);
    // Optional: Add any additional logic for when the success dialog is closed
  };

  const handleConfirm = () => {
    setQrVisible(true);
  };

  const hideQrDialog = () => {
    setQrVisible(false);
  };

  const getSelectedPlan = () => {
    return checked === "first"
      ? "Gói Cơ Bản - 39.000đ / tháng"
      : "Gói 1 Năm - 390.000đ / năm";
  };

  return (
    <SafeAreaView style={styles.container}>
      {userSelector.is_premium ? (
        <CurrentPlan currentPlan={currentPlan} expiryDate={expiryDate} />
      ) : (
        <PlanSelection
          handleSubmit={handleConfirm}
          checked={checked}
          setChecked={setChecked}
        />
      )}

      <Portal>
        {/* Insufficient Funds Modal */}
        <Dialog
          style={{ backgroundColor: "white" }}
          visible={visible}
          onDismiss={hideDialog}
        >
          <Dialog.Title style={{ color: "#1646A9" }}>Thông Báo</Dialog.Title>
          <Dialog.Content>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/7269/7269138.png",
                }}
                style={styles.modalImage}
              />
            </View>
            <Paragraph style={{ textAlign: "center", fontSize: 17 }}>
              Bạn không đủ tiền để thực hiện giao dịch.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Nạp Tiền</Button>
          </Dialog.Actions>
        </Dialog>

        {/* Success Modal */}
        <Dialog
          style={{ backgroundColor: "white" }}
          visible={successVisible}
          onDismiss={hideSuccessDialog}
        >
          <Dialog.Title style={{ color: "#1646A9", textAlign: "center" }}>
            Thành Công
          </Dialog.Title>
          <Dialog.Content>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: "https://westphysics.com/wp-content/uploads/2022/10/green-tick-icon.png",
                }}
                style={styles.modalImage}
              />
            </View>
            <Paragraph style={{ textAlign: "center", fontSize: 17 }}>
              Chúc mừng bạn đã trở thành thành viên Premium !!!
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideSuccessDialog}>Đóng</Button>
          </Dialog.Actions>
        </Dialog>

        {/* QR Code Modal */}
        <Dialog
          style={{ backgroundColor: "white" }}
          visible={qrVisible}
          onDismiss={hideQrDialog}
        >
          <Dialog.Title style={{ color: "#1646A9" }}>Xác Nhận</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ textAlign: "center", fontSize: 17 }}>
              Bạn đã chọn gói{" "}
            </Paragraph>
            <Paragraph
              style={{ textAlign: "center", fontWeight: "600", fontSize: 17 }}
            >
              {getSelectedPlan()}
            </Paragraph>
            <View style={styles.qrCodeContainer}>
              <Image source={backgroundImage} style={styles.qrCode} />
            </View>
            <Paragraph style={{ textAlign: "center", fontSize: 17 }}>
              Hãy đảm bảo ví của bạn đủ tiền nhé
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSubmit}>Chấp nhận</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  qrCode: {
    width: 240,
    height: 100,
    marginVertical: 20,
  },
});
