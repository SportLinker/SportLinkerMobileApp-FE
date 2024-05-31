import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Snackbar } from "react-native-paper";
import { styles } from "../../component/style";
import Profile from "./Profile";
import MyPost from "./MyPost";

const fakeData = [
  {
    id: 1,
    title: "Bóng đá",
    level: "Chuyên nghiệp",
    position: "Trung vệ",
    icon: "soccer-ball",
  },
  {
    id: 2,
    title: "Bóng rổ",
    level: "Amateur",
    position: "Point guard",
    icon: "basketball",
  },
];

export default function AccountScreen() {
  const [activeTab, setActiveTab] = useState("profile");

  const fakeDataCommunity = [
    { id: 1, city: "Ho Chi Minh City", code: "EXE201" },
    { id: 2, city: "Hanoi", code: "EXE202" },
  ];

  const [image, setImage] = useState(
    "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY"
  );
  const [showImagePickerOptions, setShowImagePickerOptions] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowImagePickerOptions(false);
      setSuccessMessage("Chọn ảnh thành công!");
    }
  };

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowImagePickerOptions(false);
      setSuccessMessage("Chụp ảnh thành công!");
    }
  };

  //  const captureImage = async () => {
  //    const { status } = await ImagePicker.requestCameraPermissionsAsync();
  //    if (status !== "granted") {
  //      // Hiển thị thông báo tùy chỉnh nếu quyền bị từ chối
  //      Alert.alert(
  //        "Yêu cầu quyền truy cập camera",
  //        "Ứng dụng cần quyền truy cập camera để chụp ảnh.",
  //        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
  //      );
  //      return;
  //    }

  //    const result = await ImagePicker.launchCameraAsync({
  //      allowsEditing: true,
  //      aspect: [1, 1],
  //      quality: 1,
  //    });

  //    if (!result.canceled) {
  //      setImage(result.assets[0].uri);
  //      setShowImagePickerOptions(false);
  //      setSuccessMessage("Chụp ảnh thành công!");
  //    }
  //  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: "#fff" }}>
      <ScrollView>
        <View style={styles.centerStyle}>
          <View style={{ position: "relative" }}>
            <TouchableOpacity onPress={() => setShowImagePickerOptions(true)}>
              <Avatar.Image
                size={100}
                source={{ uri: image }}
                style={{ marginTop: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowImagePickerOptions(true)}
              style={{
                position: "absolute",
                bottom: -3,
                right: -3,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 3,
              }}
            >
              <Ionicons name="pencil" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.nameAccountContainer}>
            <Text style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}>
              Ninh
            </Text>
            <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Nam ● Người lớn
            </Text>
            <Text style={{ marginTop: 5, color: "#707070" }}>
              Nói đôi điều về bạn
            </Text>
          </View>
        </View>

        <View style={styles.tabView}>
          <TouchableOpacity
            style={[
              styles.textWrapper,
              activeTab == "profile" && styles.activeTextWrapper,
            ]}
            onPress={() => {
              setActiveTab("profile");
            }}
          >
            <Text
              style={[
                styles.boldText,
                activeTab == "profile" && styles.activeText,
              ]}
            >
              Giới thiệu
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.textWrapper,
              activeTab == "post" && styles.activeTextWrapper,
            ]}
            onPress={() => {
              setActiveTab("post");
            }}
          >
            <Text
              style={[
                styles.boldText,
                activeTab == "post" && styles.activeText,
              ]}
            >
              Bài đăng
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "profile" && <Profile fakeData={fakeData} />}
        {activeTab === "post" && <MyPost />}

        <Modal
          visible={!!showImagePickerOptions}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.menuAccount}>
              <TouchableOpacity onPress={pickImage} style={styles.menuItem}>
                <Text style={styles.textMenuItem}>Chọn ảnh từ thư viện</Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  borderColor: "#C4C4C4",
                }}
              />
              <TouchableOpacity onPress={captureImage} style={styles.menuItem}>
                <Text style={styles.textMenuItem}>Chụp ảnh mới</Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  borderColor: "#C4C4C4",
                }}
              />
              <TouchableOpacity
                onPress={() => setShowImagePickerOptions(false)}
                style={styles.menuItem}
              >
                <Text style={[styles.textMenuItem, styles.cancelText]}>
                  Hủy bỏ
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  borderColor: "#C4C4C4",
                }}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
      <Snackbar
        visible={successMessage !== ""}
        onDismiss={() => setSuccessMessage("")}
        duration={2000}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
    </SafeAreaView>
  );
}
