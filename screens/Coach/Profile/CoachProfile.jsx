import { Ionicons } from "@expo/vector-icons";
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
import { styles } from "../../../component/style";
import Courses from "./Courses";
import { InfoProfile } from "./InfoProfile";

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

const fakeCourses = [
  {
    id: 1,
    name: "Advanced Soccer Techniques",
    description: "Learn advanced skills and techniques in soccer.",
  },
  {
    id: 2,
    name: "Basketball Fundamentals",
    description: "Basics of basketball for beginners.",
  },
];

export default function CoachProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [image, setImage] = useState(
    "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY"
  );
  const [showImagePickerOptions, setShowImagePickerOptions] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSelectCourses = (selectedCourses) => {
    setSelectedCourses(selectedCourses);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
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

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setShowImagePickerOptions(false);
      setSuccessMessage("Chụp ảnh thành công!");
    }
  };

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
              activeTab == "courses" && styles.activeTextWrapper,
            ]}
            onPress={() => {
              setActiveTab("courses");
            }}
          >
            <Text
              style={[
                styles.boldText,
                activeTab == "courses" && styles.activeText,
              ]}
            >
              Khóa học
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "profile" && <InfoProfile fakeData={fakeData} />}
        {activeTab === "courses" && (
          <Courses
            fakeCourses={fakeCourses}
            selectedCourses={selectedCourses}
            onSelectCourses={handleSelectCourses}
          />
        )}

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
