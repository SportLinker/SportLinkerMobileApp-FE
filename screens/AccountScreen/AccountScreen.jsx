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

import { uploadImageToCloudinary } from "../../services/cloudinary";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { updateUserProfile } from "../../redux/slices/userSlice";
import { getUserLoadingSelector, getUserSelector } from "../../redux/selectors";
import Loading from "../../component/Loading";
import { useEffect } from "react";
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
  const userSelector = useSelector(getUserSelector);
  const loading = useSelector(getUserLoadingSelector);

  const dispatch = useDispatch();

  const fakeDataCommunity = [
    { id: 1, city: "Ho Chi Minh City", code: "EXE201" },
    { id: 2, city: "Hanoi", code: "EXE202" },
  ];

  const [image, setImage] = useState(
    userSelector.avatar_url
      ? userSelector.avatar_url
      : "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY"
  );
  const [showImagePickerOptions, setShowImagePickerOptions] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUpdateUserAvatar = (avatarURL) => {
    try {
      const formData = {
        id: userSelector.id,
        data: {
          avatar_url: avatarURL,
        },
      };
      console.log("formData", formData);
      dispatch(updateUserProfile(formData)).then((response) => {
        console.log("update avatar done", response?.payload?.message);
        if (response?.payload?.message == "Update user successfully") {
          setImage(avatarURL);
          setSuccessMessage("User successfully");
        } else {
          setErrorMessage("Update fail");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, type, fileName } = result.assets[0];
      console.log("result", result.assets[0]);
      setShowImagePickerOptions(false);
      dispatch(userSlice.actions.setUserLoading(true));

      uploadImageToCloudinary(uri, type, fileName).then((response) => {
        // after get a link from cloudinary then update url link for server
        dispatch(userSlice.actions.setUserLoading(false));
        console.log("response image ", response);
        handleUpdateUserAvatar(response.url);
      });
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
      const { uri, type, fileName } = result.assets[0];
      console.log("result", result.assets[0]);
      setShowImagePickerOptions(false);
      dispatch(userSlice.actions.setUserLoading(true));

      uploadImageToCloudinary(uri, type, fileName).then((response) => {
        // after get a link from cloudinary then update url link for server
        dispatch(userSlice.actions.setUserLoading(false));
        console.log("response image ", response);
        handleUpdateUserAvatar(response.url);
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      {loading && <Loading visible={loading} />}
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
              {userSelector.name}
            </Text>
            {/* <Text style={{ marginTop: 5, fontWeight: "bold" }}>
              Nam ● Người lớn
            </Text> */}
            <Text style={{ marginTop: 5, color: "#707070" }}>
              {userSelector.bio ? userSelector.bio : "Nói đôi điều về bạn"}
            </Text>
          </View>
        </View>
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
      <Snackbar
        visible={!!errorMessage}
        duration={2000}
        onDismiss={() => setErrorMessage(null)}
        style={{ ...styles.snackbarContainer, backgroundColor: "red" }}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
}
