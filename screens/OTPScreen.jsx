import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

const OTPInputScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60); // Thiết lập thời gian đếm ngược (giây)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Vô hiệu hóa nút ban đầu

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsButtonDisabled(false); // Kích hoạt nút khi bộ đếm đạt 0
    }
  }, [timer]);

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo
    if (text && index < otp.length - 1) {
      const nextInput = `otpInput${index + 1}`;
      refs[nextInput].focus();
    }
  };

  const refs = [];

  const handleSubmit = () => {
    // Xử lý logic xác nhận OTP tại đây
    const otpCode = otp.join("");
    console.log("Mã OTP đã nhập:", otpCode);
  };

  const handleGetNewCode = () => {
    // Thực hiện logic yêu cầu mã OTP mới tại đây
    console.log("Yêu cầu mã OTP mới...");

    // Thiết lập lại bộ đếm và vô hiệu hóa nút
    setTimer(60);
    setIsButtonDisabled(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inner}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <Text style={styles.title}>Nhập OTP</Text>
            <Text style={styles.description}>
              Vui lòng nhập mã OTP đã được gửi đến điện thoại của bạn
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((_, index) => (
                <TextInput
                  key={index}
                  mode="outlined"
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={otp[index]}
                  onChangeText={(text) => handleChangeText(text, index)}
                  ref={(ref) => (refs[`otpInput${index}`] = ref)}
                  activeOutlineColor="#1646A9"
                />
              ))}
            </View>
            <Text style={styles.timer}>
              {timer > 0
                ? `Thời gian còn lại: ${timer} giây`
                : "Hết thời gian! Vui lòng yêu cầu mã mới."}
            </Text>
            <Button
              mode="contained"
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={timer === 0} // Vô hiệu hóa nút khi bộ đếm là 0
            >
              Xác nhận
            </Button>
            <TouchableOpacity
              onPress={handleGetNewCode}
              disabled={isButtonDisabled}
            >
              <Text
                style={
                  isButtonDisabled
                    ? [styles.newCodeText, styles.newCodeTextDisabled]
                    : styles.newCodeText
                }
              >
                Gửi lại mã mới
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  inner: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#797979",
    textAlign: "center",
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    fontSize: 24,
    marginRight: 10,
    backgroundColor: "white",
  },
  timer: {
    fontSize: 16,
    color: "red",
    marginBottom: 20,
  },
  submitButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#1646A9",
    marginBottom: 10,
  },
  newCodeText: {
    color: "#1646A9",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  newCodeTextDisabled: {
    color: "#aaa",
  },
});

export default OTPInputScreen;
