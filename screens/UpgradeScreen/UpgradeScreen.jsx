import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import {
  RadioButton,
  Button,
  Title,
  Paragraph,
  Divider,
  Dialog,
  Portal,
} from "react-native-paper";

export default function UpgradeScreen() {
  const [checked, setChecked] = useState("first");
  const [visible, setVisible] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds

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
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const handleAccept = () => {
    setVisible(false);
    setTimer(120); // Reset timer to 2 minutes
    setQrVisible(true);
  };

  const hideQrDialog = () => {
    setQrVisible(false);
  };

  const getBorderColor = (value) => {
    return checked === value ? "#1646A9" : "#ccc";
  };

  const getSelectedPlan = () => {
    return checked === "first"
      ? "Gói Cơ Bản - 39.000đ / tháng"
      : "Gói 1 Năm - 390.000đ / năm";
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Title style={styles.title}>Nâng Cấp Gói Của Bạn</Title>
        <Paragraph style={styles.description}>
          Chọn gói tốt nhất phù hợp với nhu cầu của bạn.
        </Paragraph>

        <View style={styles.radioContainer}>
          <RadioButton.Group
            onValueChange={(newValue) => setChecked(newValue)}
            value={checked}
          >
            <View
              style={[
                styles.radioItem,
                {
                  borderColor: getBorderColor("first"),
                  backgroundColor: checked === "first" ? "#E3F2FD" : "#fff",
                },
              ]}
            >
              <RadioButton value="first" />
              <Text style={styles.radioText}>Gói Cơ Bản - 39.000đ / tháng</Text>
            </View>
            <View
              style={[
                styles.radioItem,
                {
                  borderColor: getBorderColor("second"),
                  backgroundColor: checked === "second" ? "#E3F2FD" : "#fff",
                },
              ]}
            >
              <RadioButton value="second" />
              <Text style={styles.radioText}>Gói 1 Năm - 390.000đ / năm</Text>
            </View>
          </RadioButton.Group>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.ownedItemsContainer}>
          <Title style={styles.subTitle}>Những gì bạn sở hữu</Title>
          <Paragraph style={styles.ownedItem}>
            - Gói nâng cấp: <Text style={styles.boldText}>Không quảng cáo</Text>
            , <Text style={styles.boldText}>Đăng bài không giới hạn</Text>,{" "}
            <Text style={styles.boldText}>Xem được lịch sử thi đấu</Text>.
          </Paragraph>
        </View>

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Xác Nhận
        </Button>
      </View>

      <Portal>
        <Dialog
          style={{ backgroundColor: "white" }}
          visible={visible}
          onDismiss={hideDialog}
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleAccept}>Chấp nhận</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          style={{ backgroundColor: "white" }}
          visible={qrVisible}
          dismissable={false}
          onDismiss={hideQrDialog}
        >
          <Dialog.Title style={{ color: "#1646A9", textAlign: "center" }}>
            Thông Tin Thanh Toán
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ textAlign: "center", fontSize: 17 }}>
              Đây là mã QR để thanh toán. Bạn có {formatTime(timer)} để hoàn
              thành thanh toán.
            </Paragraph>
            <View style={styles.qrCodeContainer}>
              <Image
                source={{
                  uri: "https://th.bing.com/th/id/R.4b3690db393943912c9ce450ff3a6f18?rik=13kfS%2fgyFrzeSg&pid=ImgRaw&r=0",
                }} // Replace with your QR code image URL
                style={styles.qrCode}
              />
            </View>
            <Paragraph
              style={{ textAlign: "center", fontSize: 17, marginTop: 16 }}
            >
              Thông tin ngân hàng: ABC Bank, Số tài khoản: 123456789
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideQrDialog}>Đóng</Button>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1646A9",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1646A9",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  radioContainer: {
    marginBottom: 24,
    width: "100%",
    paddingHorizontal: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#1646A9",
  },
  button: {
    marginTop: 24,
    width: "90%",
    backgroundColor: "#1646A9",
  },
  divider: {
    marginVertical: 24,
    height: 1,
    width: "100%",
  },
  ownedItemsContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  ownedItem: {
    fontSize: 16,
    marginBottom: 8,
    color: "#1646A9",
  },
  boldText: {
    fontWeight: "bold",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  qrCode: {
    width: 250,
    height: 250,
  },
});
