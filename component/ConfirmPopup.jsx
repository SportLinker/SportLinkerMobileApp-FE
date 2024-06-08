// components/ConfirmPopup.js
import React from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Button, Paragraph } from "react-native-paper";

const ConfirmPopup = ({
  visible,
  title,
  description,
  type,
  onConfirm,
  onCancel,
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        style={{ backgroundColor: "#e9e9e9", borderRadius: 10 }}
        onDismiss={onCancel}
      >
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={styles.description}>{description}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button
            buttonColor="#f5f5f5"
            onPress={onCancel}
            style={styles.button}
            textColor={"black"}
          >
            Hủy
          </Button>
          <Button
            buttonColor={type === "danger" ? "#EE0000" : "#1646A9"}
            onPress={onConfirm}
            style={styles.button}
            textColor={"white"}
          >
            Đồng ý
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  actions: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: "50%",
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default ConfirmPopup;
