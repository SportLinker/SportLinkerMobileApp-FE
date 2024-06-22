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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Recharge from "./Recharge/Recharge";
import Profile from "./ActionButton/Profile";
import MyPost from "./ActionButton/MyPost";
import HeaderAccount from "./HeaderAccount/HeaderAccount";
import TabViewProfile from "./ActionButton/TabViewProfile";
import MyMatch from "./ActionButton/MyMatch";
import MyTransaction from "./ActionButton/MyTransaction";

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

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: "#fff" }}>
      <ScrollView>
        <HeaderAccount
          image={image}
          setShowImagePickerOptions={setShowImagePickerOptions}
        />

        <TabViewProfile activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "profile" && <Profile fakeData={fakeData} />}
        {activeTab === "post" && <MyPost />}
        {activeTab === "match" && <MyMatch />}
        {activeTab === "transaction" && <MyTransaction />}

        <Modal
          visible={!!showImagePickerOptions}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowImagePickerOptions(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPressOut={() => setShowImagePickerOptions(false)}
          >
            <TouchableOpacity
              style={styles.menuAccount}
              activeOpacity={1}
              onPress={() => {}}
            >
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
            </TouchableOpacity>
          </TouchableOpacity>
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
