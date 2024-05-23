import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import DetailCoachScreen from "../CoachScreen/DetailCoachScreen";
import TruncatedText from "../../../component/TruncatedText";
import CoachTabView from "../CoachScreen/CoachTabView";

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

const fakeCLBData = [
  { id: "1", name: "Hoang Anh Gia Lai in HCM" },
  { id: "2", name: "Hoang Anh Gia Lai in HCM" },
  { id: "3", name: "Hoang Anh Gia Lai in HCM" },
  { id: "4", name: "Hoang Anh Gia Lai in HCM" },
  { id: "5", name: "Hoang Anh Gia Lai in HCM" },
  { id: "6", name: "Hoang Anh Gia Lai in HCM" },
];

export default function DetailPlayerScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState("");
  const [addUser, setAddUser] = useState("");

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <Modal
        visible={modalDetailVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalDetailVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("PlayerScreen");
                }}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.horizontalIconsContainer}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setShowMenu(true)}
                >
                  <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Avatar.Image
                size={100}
                source={{
                  uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
                }}
              />
              <View style={{ marginLeft: 20, marginBottom: 30 }}>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
                >
                  Tai Vo
                </Text>
                <Text style={{ marginBottom: 10 }}>Nam</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  {addUser === "checked" ? (
                    <TouchableOpacity onPress={() => setAddUser("unchecked")}>
                      <AntDesign
                        name="deleteuser"
                        size={30}
                        color="red"
                        style={{ marginRight: 30 }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setAddUser("checked")}>
                      <AntDesign
                        name="adduser"
                        size={30}
                        color="#1646a9"
                        style={{ marginRight: 30 }}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ChatListScreen"), handleCloseModal();
                    }}
                  >
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={30}
                      color="black"
                      style={{ marginRight: 30 }}
                    />
                  </TouchableOpacity>
                  {liked === "liked" ? (
                    <TouchableOpacity onPress={() => setLiked("unliked")}>
                      <AntDesign name="star" size={30} color="#F9A825" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setLiked("liked")}>
                      <AntDesign name="staro" size={30} color="black" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
            <ScrollView>
              <View style={{ alignItems: "center", marginTop: 30 }}>
                {fakeData.map((item, index) => (
                  <View style={styles.innerInfoSport} key={index}>
                    <View>
                      <TouchableOpacity
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginHorizontal: 20,
                          marginTop: 10,
                        }}
                        onPress={() => setModalVisible(true)}
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
                          <Text style={{ fontWeight: "bold" }}>
                            {item.level}
                          </Text>
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

              {/* <View>
                <Text
                  style={{ marginLeft: 15, fontWeight: "700", marginTop: 20 }}
                >
                  {"clb / Cộng đồng".toUpperCase()}
                </Text>
                <View style={styles.clubContainer}>
                  {fakeCLBData.map((item) => (
                    <View key={item.id} style={styles.clubItem}>
                      <TouchableOpacity
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginHorizontal: 20,
                          marginTop: 10,
                        }}
                      >
                        <View
                          style={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Avatar.Image
                            size={60}
                            source={{
                              uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
                            }}
                          />
                          <TruncatedText
                            text={item.name}
                            maxCharsPerLine={10}
                            maxLines={2}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View> */}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <DetailCoachScreen
        modalVisible={modalVisible}
        modalClose={handleCloseModal}
      />
      <Modal visible={showMenu} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.textTitleSport}>Bóng đá</Text>
            </TouchableOpacity>

            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: 5,
                borderColor: "#C4C4C4",
              }}
            />

            <TouchableOpacity style={[styles.menuItem, styles.flexRowStyle]}>
              <FontAwesome5
                name="calendar-check"
                size={24}
                color="black"
                style={{ paddingRight: 8 }}
              />
              <Text style={styles.textMenuItem}>Mời người chơi</Text>
            </TouchableOpacity>

            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: 5,
                borderColor: "#C4C4C4",
              }}
            />
            <TouchableOpacity style={[styles.menuItem, styles.flexRowStyle]}>
              <Entypo
                name="flag"
                size={24}
                color="black"
                style={{ paddingRight: 8 }}
              />
              <Text style={styles.textMenuItem}>Báo cáo người chơi</Text>
            </TouchableOpacity>

            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: 5,
                borderColor: "#C4C4C4",
              }}
            />
            <TouchableOpacity style={[styles.menuItem, styles.flexRowStyle]}>
              <MaterialIcons
                name="block-flipped"
                size={24}
                color="red"
                style={{ paddingRight: 8 }}
              />
              <Text style={[styles.textMenuItem, styles.cancelText]}>
                Chặn người chơi
              </Text>
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
              }}
              style={[styles.menuItem, styles.flexRowStyle]}
            >
              <AntDesign
                name="close"
                size={24}
                color="red"
                style={{ paddingRight: 8, paddingTop: 2 }}
              />
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
    </>
  );
}

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 211, 241, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "80%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editBtn: {
    padding: 10,
  },
  horizontalIconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
  innerInfoSport: {
    borderRadius: 20,
    backgroundColor: "#fff", // Màu nền của phần tử
    width: 337,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Chỉ áp dụng cho Android
    marginBottom: 20,
  },

  centerStyle: { alignItems: "center" },
  bottomInfoSport: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  clubContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  clubItem: {
    width: "30%",
    marginBottom: 20,
  },

  menu: {
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  menuItem: {
    padding: 10,
  },
  textMenuItem: { fontSize: 20, fontWeight: "bold" },
  textTitleSport: { fontSize: 13, fontWeight: "bold", color: "#707070" },
  cancelText: {
    color: "red",
  },
  blueText: {
    color: "blue",
  },
  flexRowStyle: {
    display: "flex",
    flexDirection: "row",
  },
};
