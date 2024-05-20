import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditAccountScreen({ navigation }) {
  const [formData, setFormData] = useState({
    textName: "Ninh",
    textUsername: "Ninh-88",
    textEmail: "ninh2002@gmail.com",
    textBio: "Tôi là Ninh, quê Tây Ninh",
    isGenderSelected: "",
    isAgeSelected: "",
  });

  const handleChangeText = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handlePress = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleSubmitUpdate = () => {
    console.log(formData);
    navigation.navigate("AccountScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingTop: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Cập nhật hồ sơ
            </Text>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Tên</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeText("textName", text)}
              value={formData.textName}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Tên người dùng</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeText("textUsername", text)}
              value={formData.textUsername}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChangeText("textEmail", text)}
              value={formData.textEmail}
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Tiểu sử</Text>
            <TextInput
              style={styles.inputBio}
              onChangeText={(text) => handleChangeText("textBio", text)}
              value={formData.textBio}
              multiline={true}
              numberOfLines={4}
              returnKeyType="done"
            />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Giới tính</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("isGenderSelected", "male")}
              >
                <View
                  style={[
                    styles.iconGender,
                    formData.isGenderSelected === "male" && styles.iconSelected,
                  ]}
                >
                  <Ionicons
                    name="male"
                    size={24}
                    color={
                      formData.isGenderSelected === "male" ? "white" : "black"
                    }
                  />
                  <Text
                    style={{
                      color:
                        formData.isGenderSelected === "male"
                          ? "white"
                          : "black",
                    }}
                  >
                    Nam
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("isGenderSelected", "female")}
              >
                <View
                  style={[
                    styles.iconGender,
                    formData.isGenderSelected === "female" &&
                      styles.iconSelected,
                  ]}
                >
                  <Ionicons
                    name="female"
                    size={24}
                    color={
                      formData.isGenderSelected === "female" ? "white" : "black"
                    }
                  />
                  <Text
                    style={{
                      color:
                        formData.isGenderSelected === "female"
                          ? "white"
                          : "black",
                    }}
                  >
                    Nữ
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("isGenderSelected", "secret")}
              >
                <View
                  style={[
                    styles.iconGender,
                    formData.isGenderSelected === "secret" &&
                      styles.iconSelected,
                  ]}
                >
                  <Ionicons
                    name="male-female"
                    size={24}
                    color={
                      formData.isGenderSelected === "secret" ? "white" : "black"
                    }
                  />
                  <Text
                    style={{
                      color:
                        formData.isGenderSelected === "secret"
                          ? "white"
                          : "black",
                    }}
                  >
                    Bí mật
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.textTitle}>Nhóm tuổi</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handlePress("isAgeSelected", "young")}
              >
                <View
                  style={[
                    styles.iconGender,
                    formData.isAgeSelected === "young" && styles.iconSelected,
                  ]}
                >
                  <Text
                    style={{
                      color:
                        formData.isAgeSelected === "young" ? "white" : "black",
                    }}
                  >
                    Thiếu niên
                  </Text>
                  <Text
                    style={{
                      color:
                        formData.isAgeSelected === "young" ? "white" : "black",
                    }}
                  >
                    (dưới 18)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("isAgeSelected", "adult")}
              >
                <View
                  style={[
                    styles.iconGender,
                    formData.isAgeSelected === "adult" && styles.iconSelected,
                  ]}
                >
                  <Text
                    style={{
                      color:
                        formData.isAgeSelected === "adult" ? "white" : "black",
                    }}
                  >
                    Người lớn
                  </Text>
                  <Text
                    style={{
                      color:
                        formData.isAgeSelected === "adult" ? "white" : "black",
                    }}
                  >
                    (18 - 50)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePress("isAgeSelected", "senior")}
              >
                <View
                  style={[
                    styles.iconGender,
                    formData.isAgeSelected === "senior" && styles.iconSelected,
                  ]}
                >
                  <Text
                    style={{
                      color:
                        formData.isAgeSelected === "senior" ? "white" : "black",
                    }}
                  >
                    Cao tuổi
                  </Text>
                  <Text
                    style={{
                      color:
                        formData.isAgeSelected === "senior" ? "white" : "black",
                    }}
                  >
                    (trên 50)
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 50,
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
              onPress={handleSubmitUpdate}
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
  inputBio: {
    height: 80, // Điều chỉnh độ cao của TextInput để hiển thị nhiều dòng văn bản
    marginHorizontal: 25,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
    borderColor: "#4878D9",
    borderWidth: 2,
  },
  iconGender: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5, // Chỉ áp dụng cho Android
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4878D9",
    alignItems: "center",
    justifyContent: "center",
  },
  age: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5, // Chỉ áp dụng cho Android
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4878D9",
    alignItems: "center",
  },
  iconSelected: {
    backgroundColor: "blue", // Màu nền khi được chọn
    borderColor: "white",
  },
});
