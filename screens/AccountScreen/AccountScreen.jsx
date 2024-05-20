import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Snackbar } from "react-native-paper";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../component/style";

export default function AccountScreen({ navigation }) {
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

  const fakeDataCommunity = [
    { id: 1, city: "Ho Chi Minh City", code: "EXE201" },
    { id: 2, city: "Hanoi", code: "EXE202" },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const [image, setImage] = useState(
    "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY"
  );
  const [showImagePickerOptions, setShowImagePickerOptions] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate("EditAccountScreen")}
            >
              <MaterialIcons name="edit" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.horizontalIconsContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => navigation.navigate("ChatListScreen")}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
                <Ionicons name="ellipsis-vertical" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.centerStyle}>
          <View style={{ position: "relative" }}>
            <TouchableOpacity onPress={() => setShowImagePickerOptions(true)}>
              <Avatar.Image
                size={60}
                source={{ uri: image }}
                style={{ marginTop: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowImagePickerOptions(true)}
              style={{
                position: "absolute",
                bottom: -5,
                right: -5,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 3,
              }}
            >
              <Ionicons name="pencil" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.nameContainer}>
            <Text style={{ marginTop: 5 }}>Ninh</Text>
            <Text style={{ marginTop: 5 }}>Nam - Người lớn</Text>
            <Text style={{ marginTop: 5, color: "#707070" }}>
              Nói đôi điều về bạn
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.topInfoSport}>
            <Text style={{ color: "#707070", fontWeight: "bold" }}>
              {"Thể thao".toUpperCase()}
            </Text>
            <Text style={{ color: "#4878D9", fontWeight: "bold" }}>Thêm</Text>
          </View>
          <View style={styles.centerStyle}>
            {fakeData.map((item) => (
              <View key={item.id} style={styles.innerInfoSport}>
                <View>
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 20,
                      marginTop: 10,
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <FontAwesome6
                        name={item.icon}
                        size={24}
                        color="#000"
                        style={{ marginRight: 10 }}
                      />
                      <Text>{item.title}</Text>
                    </View>
                    <View>
                      <AntDesign name="right" size={24} color="#000" />
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      marginVertical: 5,
                      borderColor: "#C4C4C4",
                    }}
                  />
                  <View style={styles.bottomInfoSport}>
                    <View style={styles.centerStyle}>
                      <Text style={{ color: "#707070" }}>
                        Trình độ (Tự đánh giá)
                      </Text>
                      <Text style={{ fontWeight: "bold" }}>{item.level}</Text>
                    </View>
                    <View style={styles.centerStyle}>
                      <Text style={{ color: "#707070" }}>Vị trí</Text>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.position}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View>
          <View style={styles.topInfoSport}>
            <Text style={{ color: "#707070", fontWeight: "bold" }}>
              {"Cộng đồng".toUpperCase()}
            </Text>
            <Text style={{ color: "#4878D9", fontWeight: "bold" }}>Thêm</Text>
          </View>
          <View style={styles.centerStyle}>
            {fakeDataCommunity.map((item) => (
              <View key={item.id} style={styles.innerInfoCommunity}>
                <View>
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 20,
                      marginTop: 10,
                    }}
                  >
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <FontAwesome6
                        name="house"
                        size={24}
                        color="#000"
                        style={{ marginRight: 10, marginTop: 8 }}
                      />
                      <View style={{ alignItems: "flex-start" }}>
                        <Text style={{ color: "#1646A9" }}>{item.city}</Text>
                        <Text style={{ color: "#1646A9" }}>{item.code}</Text>
                      </View>
                    </View>
                    <View>
                      <AntDesign
                        name="right"
                        size={24}
                        color="#000"
                        style={{ marginTop: 8 }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
        <Modal visible={showMenu} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.menuAccount}>
              <TouchableOpacity
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate("PasswordScreen");
                }}
                style={styles.menuItem}
              >
                <Text style={styles.textMenuItem}>Đổi mật khẩu</Text>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  borderColor: "#C4C4C4",
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate("AccountScreen");
                }}
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

        <Modal
          visible={showImagePickerOptions}
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
        <Snackbar
          visible={successMessage !== ""}
          onDismiss={() => setSuccessMessage("")}
          duration={2000}
          style={styles.snackbarContainer}
        >
          {successMessage}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
}
