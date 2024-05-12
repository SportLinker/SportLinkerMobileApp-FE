import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function PasswordScreen({ navigation }) {
  const [oldPassword, onChangeOldPassword] = useState("");
  const [newPassword, onChangeNewPassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TouchableOpacity
            style={{ paddingTop: 30, paddingLeft: 20 }}
            onPress={() => navigation.navigate("AccountScreen")}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Cập nhật hồ sơ
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
