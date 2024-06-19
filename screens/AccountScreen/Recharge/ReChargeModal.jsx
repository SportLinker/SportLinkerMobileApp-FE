import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFormik } from "formik";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(50000, "Số tiền tối thiểu là 50.000")
    .required("Số tiền là bắt buộc"),
});

export default function ReChargeModal({ modalVisible, setModalVisible }) {
  const [amountModalVisible, setAmountModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [timer, setTimer] = useState(120);

  // Initialize Formik for form handling
  const formik = useFormik({
    initialValues: { amount: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      openQrModal(values.amount);
    },
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openAmountModal = (method) => {
    setSelectedMethod(method);
    setModalVisible(false);
    setAmountModalVisible(true);
  };

  const openQrModal = (amount) => {
    formik.setFieldValue("amount", amount);
    setAmountModalVisible(false);
    setQrModalVisible(true);
    setTimer(120); // reset the timer
  };

  const closeQrModal = () => {
    setQrModalVisible(false);
  };

  const copyToClipboard = async () => {
    Alert.alert("Thông tin đã được sao chép!");
  };

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (qrModalVisible) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            closeQrModal();
            Alert.alert("Thời gian đã hết", "Hãy thử lại.");
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [qrModalVisible]);

  return (
    <View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chọn phương thức nạp tiền</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => openAmountModal("Momo")}
                style={styles.modalOption}
              >
                <Image
                  source={require("./../../../assets/momo.png")}
                  style={styles.imageStyle}
                />
                <Text style={styles.modalOptionText}>Momo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openAmountModal("Ngân hàng")}
                style={styles.modalOption}
              >
                <Icon name="bank-outline" size={40} color="white" />
                <Text style={styles.modalOptionText}>Ngân hàng</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={amountModalVisible}
        animationType="slide"
        onRequestClose={() => setAmountModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Nhập số tiền bạn muốn nạp qua {selectedMethod}
            </Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Số tiền"
              keyboardType="numeric"
              value={formik.values.amount}
              onChangeText={formik.handleChange("amount")}
              onBlur={formik.handleBlur("amount")}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <Text style={{ color: "red" }}>{formik.errors.amount}</Text>
            ) : null}
            <TouchableOpacity
              onPress={formik.handleSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAmountModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={qrModalVisible}
        animationType="slide"
        onRequestClose={closeQrModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Chuyển khoản qua {selectedMethod}
            </Text>
            <QRCode
              value={`Chuyển khoản ${formik.values.amount} qua ${selectedMethod}`}
              size={150}
            />
            <Text style={styles.qrText}>
              Chuyển khoản {formik.values.amount} qua {selectedMethod}
            </Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              style={styles.copyButton}
            >
              <Text style={styles.copyButtonText}>Copy</Text>
            </TouchableOpacity>
            <Text style={styles.timerText}>{`Thời gian còn lại: ${Math.floor(
              timer / 60
            )}:${("0" + (timer % 60)).slice(-2)}`}</Text>

            <TouchableOpacity onPress={closeQrModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#1646A9",
    width: 100,
    alignItems: "center",
    marginLeft: 10,
  },
  modalOptionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
  },
  amountInput: {
    width: "100%",
    padding: 10,
    borderColor: "#236457",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#236457",
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  qrText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
  copyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#236457",
    marginTop: 10,
  },
  copyButtonText: {
    color: "white",
    fontSize: 16,
  },
  timerText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
    color: "red",
  },
  imageStyle: {
    resizeMode: "cover",
    height: 40,
    width: 45,
  },
});
