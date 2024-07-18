import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function PasswordScreen({ navigation }) {
  const [oldPassword, onChangeOldPassword] = useState("");
  const [newPassword, onChangeNewPassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");

  const validatePasswords = () => {
    if (!oldPassword) {
      Alert.alert("Lỗi", "Mật khẩu cũ không được để trống");
      return false;
    }
    if (!newPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới không được để trống");
      return false;
    }
    if (!confirmPassword) {
      Alert.alert("Lỗi", "Xác nhận mật khẩu mới không được để trống");
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và xác nhận mật khẩu mới không khớp");
      return false;
    }
    return true;
  };

  const handleUpdatePassword = () => {
    if (validatePasswords()) {
      const data = { oldPassword, newPassword, confirmPassword };
      console.log(data);
      navigation.navigate("AccountScreen");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Thay đổi mật khẩu
            </Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Mật khẩu cũ</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeOldPassword}
              value={oldPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNewPassword}
              value={newPassword}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Xác nhận mật khẩu mới</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeConfirmPassword}
              value={confirmPassword}
              secureTextEntry={true}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 25,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#1646A9",
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={handleUpdatePassword}
            >
              <Text style={{ color: "#FFF" }}>Cập nhật</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoTextContainer: { marginTop: 10 },
  textTitle: { marginLeft: 25, fontWeight: "bold" },
  input: {
    height: 40,
    marginHorizontal: 25,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#4878D9",
    borderWidth: 2,
  },
});
