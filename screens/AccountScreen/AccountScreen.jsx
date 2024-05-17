import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../component/style";

export default function AccountScreen({ navigation }) {
  const fakeData = [
    {
      title: "Bóng đá",
      level: "Chuyên nghiệp",
      position: "Trung vệ",
      icon: "soccer-ball",
    },
    {
      title: "Bóng rổ",
      level: "Amateur",
      position: "Point guard",
      icon: "basketball",
    },
  ];

  const fakeDataCommunity = [
    { city: "Ho Chi Minh City", code: "EXE201" },
    { city: "Hanoi", code: "EXE202" },
  ];

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
          <Avatar.Image
            size={60}
            source={{
              uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
            }}
            style={{ marginTop: 50 }}
          />
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
            {fakeData.map((item, index) => (
              <View style={styles.innerInfoSport}>
                <View key={item.id}>
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
            {fakeDataCommunity.map((item, index) => (
              <View style={styles.innerInfoCommunity}>
                <View key={index}>
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
        <Modal visible={showMenu} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.menu}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
