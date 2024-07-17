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
  TouchableWithoutFeedback,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getListTransactionByUser,
  paymentRecharge,
  updateStatusPayement,
} from "../../../redux/slices/paymentSlice";
import { Button } from "react-native-paper";

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1000, "Số tiền tối thiểu là 50.000")
    .required("Số tiền là bắt buộc"),
});

export default function ReChargeModal({ modalVisible, setModalVisible }) {
  const [amountModalVisible, setAmountModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [timer, setTimer] = useState(120);
  const [qrLink, setQrLink] = useState(null);
  const [contentPayment, setContentPayment] = useState(null);
  const [visibleSuccess, setVisibleSuccess] = useState(false);

  const showModalSuccess = () => setVisibleSuccess(true);
  const hideModalSuccess = () => setVisibleSuccess(false);
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userSlice);

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

    dispatch(
      paymentRecharge({
        money: amount,
        userID: userInfo.id,
      })
    ).then((res) => {
      const transactionCode = res.payload.metadata.transaction_code;
      const qrlink = res.payload.metadata.qr_link;
      setQrLink(qrlink);
      setContentPayment(transactionCode);
      setAmountModalVisible(false);
      setQrModalVisible(true);
      setTimer(300); // reset the timer
    });
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
          if (prevTimer % 5 == 0) {
            dispatch(
              updateStatusPayement({
                transactionCode: contentPayment,
              })
            ).then((res) => {
              console.log(
                "status: " + JSON.stringify(res.payload.metadata.status)
              );
              const status = res.payload.metadata.status;
              if (status == "completed") {
                clearInterval(interval);
                closeQrModal();
                dispatch(getListTransactionByUser());
                showModalSuccess();
                return 0;
              }
            });
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
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Chọn phương thức nạp tiền</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Tính năng đang phát triển",
                      "Hãy sử dụng ngân hàng."
                    );
                    // openAmountModal("Momo");
                  }}
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
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={amountModalVisible}
        animationType="slide"
        onRequestClose={() => setAmountModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setAmountModalVisible(false)}>
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
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        transparent={true}
        visible={qrModalVisible}
        animationType="slide"
        onRequestClose={closeQrModal}
      >
        <TouchableWithoutFeedback onPress={closeQrModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                Chuyển khoản qua {selectedMethod}
              </Text>
              {/* <QRCode value={qrLink} size={150} /> */}
              <Image
                style={{ width: 250, height: 250 }}
                source={{
                  uri: qrLink,
                }}
              />
              <Text style={styles.qrText}>
                {/* Nội dung giao dịch: {formik.values.amount} qua {selectedMethod} */}
                Nội dung giao dịch: {contentPayment}
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

              <TouchableOpacity
                onPress={closeQrModal}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        transparent={true}
        visible={visibleSuccess}
        onDismiss={hideModalSuccess}
        animationType="slide"
        onRequestClose={hideModalSuccess}
      >
        <TouchableWithoutFeedback onPress={closeQrModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Thành Công</Text>
              <Image
                style={{ width: 150, height: 150 }}
                source={{
                  uri: "https://www.nhahangquangon.com/wp-content/uploads/2020/10/icon-thanh-cong-200x200.png",
                }}
              />
              <Text style={styles.qrText}>Bạn đã nạp tiền thành công</Text>

              <TouchableOpacity
                onPress={hideModalSuccess}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    borderColor: "#1646A9",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#1646A9",
    marginBottom: 10,
    marginTop: 10,
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
    backgroundColor: "#1646A9",
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
