import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
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

  const handleSubmit = () => {
    // Hiển thị popup khi nhấn "Xác Nhận"
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const getBorderColor = (value) => {
    return checked === value ? "#1646A9" : "#ccc"; // Sử dụng "#1646A9" cho màu viền đã chọn
  };

  const getSelectedPlan = () => {
    return checked === "first"
      ? "Gói Cơ Bản - 39.000đ / tháng"
      : "Gói 1 Năm - 390.000đ / tháng";
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
              <Text style={styles.radioText}>Gói 1 Năm - 390.000đ / tháng</Text>
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
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Xác Nhận</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Bạn đã chọn gói: {getSelectedPlan()}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>OK</Button>
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
    width: "80%",
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
});
