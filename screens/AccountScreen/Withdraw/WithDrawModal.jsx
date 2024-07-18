import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Menu,
  Snackbar,
} from "react-native-paper";
import axios from "axios"; // Import Axios library
import { Image } from "react-native";
import { useDispatch } from "react-redux";
import {
  getListTransactionByUser,
  paymentWithDraw,
} from "../../../redux/slices/paymentSlice";

const WithDrawModal = ({ modalVisible, setModalVisible }) => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankNumber, setBankNumber] = useState("");
  const [bankUsername, setBankUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [visible, setVisible] = useState(false);
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [submitting, setSubmitting] = useState(false); // State to track submission status

  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await fetch("https://api.vietqr.io/v2/banks");
      const json = await response.json();
      if (json.code === "00") {
        setBanks(json.data);
      } else {
        console.error("Error fetching bank list:", json.desc);
      }
    } catch (error) {
      console.error("Error fetching bank list:", error.message);
    }
  };

  const hideModal = () => setModalVisible(false);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setVisible(false);
  };

  const getUsername = async (bin, accountNumber) => {
    try {
      const data = JSON.stringify({
        bin: bin,
        accountNumber: accountNumber,
      });

      const config = {
        method: "post",
        url: "https://api.vietqr.io/v2/lookup",
        headers: {
          "x-client-id": "6d47487e-8a87-4a52-aec6-97d8533afa6f",
          "x-api-key": "809c4f37-c06e-4ad2-bd8f-481fd0ba4bda",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);
      console.log(response.data);
      if (response.data.data) {
        setInvalidNumber(false);
        return response.data.data.accountName;
      } else {
        setInvalidNumber(true);
        return "Số Tài Khoản Không Hợp Lệ";
      }
      return response.data.data.accountName; // Assuming API returns JSON with 'username' field
    } catch (error) {
      console.error("Error fetching username:", error.message);
      throw error;
    }
  };

  // Function to handle bank number change on blur (unfocus)
  const handleBankNumberChange = async () => {
    setInvalidNumber(false);
    // Call getUsername function if bank number is not empty
    if (bankNumber.trim() !== "" && selectedBank) {
      try {
        const fetchedUsername = await getUsername(selectedBank.bin, bankNumber);
        console.log(fetchedUsername);
        setBankUsername(fetchedUsername); // Update bank username state
      } catch (error) {
        console.error("Error fetching username:", error);
        // Handle error case if needed
      }
    } else {
      setBankUsername(""); // Clear bank username state if bank number is empty or no bank selected
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    // Prevent multiple submissions
    if (submitting) return;
    setSubmitting(true);

    if (amount < 5000) {
      setSubmitting(false);
      setSuccessMessage("Số tiền rút tối thiểu phải hơn 5000 vnd !!!");
      return;
    }
    // Perform submission logic here
    // For example, you can send data to an API or perform local validation
    const dataSendApi = {
      bank_account: bankNumber,
      bank_name: selectedBank.name,
      bank_short_name: selectedBank.short_name,
      bank_logo: selectedBank.logo,
      money: amount,
    };
    dispatch(paymentWithDraw(dataSendApi)).then((res) => {
      if (res.payload.message == "Số dư không đủ") {
        setSuccessMessage("Số dư của bạn không đủ để rút !!!");
        setSubmitting(false);
      }

      if (res.payload.code == 201) {
        dispatch(getListTransactionByUser());
        setSuccessMessage("Đã gửi đơn thành công !!!");
        setTimeout(() => {
          setSubmitting(false);
          hideModal(); // Close the modal after submission
        }, 3000);
      }
    });

    // dispatch(getListTransactionByUser());
    // setSuccessMessage("Đã gửi đơn thành công !!!");
    // // After submission is complete (success or failure), reset the submitting state
    setTimeout(() => {
      setSubmitting(false);
      // hideModal(); // Close the modal after submission
    }, 3000);
  };

  return (
    <Portal>
      <Dialog visible={modalVisible} onDismiss={hideModal}>
        <Dialog.Title style={styles.dialogTitle}>Rút Tiền</Dialog.Title>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Dialog.Content>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <Button
                  onPress={() => setVisible(true)}
                  style={styles.selectBankButton}
                  labelStyle={styles.selectBankButtonText}
                >
                  {selectedBank ? selectedBank.name : "Chọn Ngân Hàng"}
                </Button>
              }
            >
              {banks.map((bank) => (
                <Menu.Item
                  key={bank.id}
                  onPress={() => handleBankSelect(bank)}
                  title={
                    <View style={styles.menuItem}>
                      <Image
                        source={{ uri: bank.logo }}
                        style={{
                          width: 100,
                          height: 50,
                          marginRight: 20,
                        }}
                      />
                      <Text>{bank.short_name}</Text>
                    </View>
                  }
                />
              ))}
            </Menu>
            <TextInput
              label="Số Tài Khoản"
              value={bankNumber}
              onBlur={handleBankNumberChange} // Call handleBankNumberChange on blur
              onChangeText={setBankNumber} // Update bankNumber state on change
              keyboardType="numeric"
              style={styles.input}
              theme={{ colors: { primary: "#1646A9" } }}
            />
            <TextInput
              label="Tên Tài Khoản Ngân Hàng"
              disabled
              value={bankUsername}
              onChangeText={setBankUsername} // Allow editing bank username manually if needed
              style={[
                styles.input,
                { borderColor: invalidNumber ? "red" : "#1646A9" },
              ]}
              theme={{ colors: { primary: "#1646A9" } }}
            />
            <TextInput
              label="Số Tiền"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              theme={{ colors: { primary: "#1646A9" } }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={handleSubmit} // Call handleSubmit function on button press
              disabled={
                !selectedBank ||
                bankNumber.trim() === "" ||
                invalidNumber ||
                submitting
              }
              style={styles.submitButton} // Apply styles to the submit button
              labelStyle={styles.submitButtonText} // Apply styles to the submit button text
            >
              Gửi Đơn
            </Button>
            <Button
              onPress={hideModal}
              style={styles.closeButton}
              labelStyle={styles.closeButtonText}
            >
              Đóng
            </Button>
          </Dialog.Actions>
        </ScrollView>
      </Dialog>
      <Snackbar
        visible={successMessage !== ""}
        onDismiss={() => setSuccessMessage("")}
        duration={2000}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
    </Portal>
  );
};

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

const styles = StyleSheet.create({
  dialogTitle: {
    color: "#1646A9",
  },
  selectBankButton: {
    backgroundColor: "#1646A9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectBankButtonText: {
    color: "white",
    fontSize: 16,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1646A9",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: "#1646A9",
    borderRadius: 5,
    marginRight: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#1646A9",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  snackbarContainer: {
    borderRadius: 10,
    // position: "absolute",
    // bottom: "50%",
    // left: "50%",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: 0 * screenHeight },
    ],
    backgroundColor: "#1646A9",
  },
});

export default WithDrawModal;
