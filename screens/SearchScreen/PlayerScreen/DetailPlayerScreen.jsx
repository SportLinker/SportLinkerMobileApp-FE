import {
  AntDesign,
  Entypo,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import DetailCoachScreen from "../CoachScreen/DetailCoachScreen";
import { useDispatch } from "react-redux";
import {
  createIndividualChat,
  getMessageDetail,
} from "../../../redux/slices/messageSlice";
import { convertHttpToHttps } from "../../../utils";

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

export default function DetailPlayerScreen({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [liked, setLiked] = useState("");
  const [addUser, setAddUser] = useState("");

  const dispatch = useDispatch();

  const { item } = route.params;
  console.log(item);

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
                  uri: convertHttpToHttps(item.avatar_url),
                }}
              />
              <View style={styles.header}>
                <View
                  style={{
                    marginRight: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text style={{ marginBottom: 10 }}>{item.username}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    try {
                      setModalVisible(false);
                      dispatch(createIndividualChat(item.id)).then(
                        (response) => {
                          if (response) {
                            console.log("Response create chat: ", response);
                            if (
                              response?.payload &&
                              response.payload?.group_message_id
                            ) {
                              dispatch(
                                getMessageDetail(
                                  response.payload?.group_message_id
                                )
                              ).then((response) => {
                                console.log(
                                  "Response get message detail",
                                  response
                                );
                                if (
                                  response.payload?.group_message_detail &&
                                  response.payload.group_message_detail
                                    .group_message_id
                                ) {
                                  navigation.navigate("ChatDetailScreen");
                                }
                              });
                            }
                            // navigation.navigate("PlayerScreen");
                            // navigation.navigate("ChatListScreen");
                          }
                        }
                      );
                    } catch (error) {
                      console.log("Error create individual chat", error);
                    }
                  }}
                >
                  <Ionicons
                    name="chatbubble-ellipses-outline"
                    size={30}
                    color="black"
                    style={{ marginRight: 30 }}
                  />
                </TouchableOpacity>
                {/* <View style={{ display: "flex", flexDirection: "row" }}>
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

                  {liked === "liked" ? (
                    <TouchableOpacity onPress={() => setLiked("unliked")}>
                      <AntDesign name="star" size={30} color="#F9A825" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setLiked("liked")}>
                      <AntDesign name="staro" size={30} color="black" />
                    </TouchableOpacity>
                  )}
                </View> */}
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
                          paddingVertical: 20,
                        }}
                        onPress={() => setModalVisible(true)}
                      >
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "600",
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                        <View>
                          <AntDesign name="right" size={24} color="#000" />
                        </View>
                      </TouchableOpacity>
                      {/* <View
                        style={{
                          borderBottomWidth: 1,
                          marginVertical: 5,
                          borderColor: "#C4C4C4",
                        }}
                      /> */}
                      {/* <View style={styles.bottomInfoSport}>
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
                      </View> */}
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <DetailCoachScreen
        modalVisible={modalVisible}
        modalClose={handleCloseModal}
      />
      <Modal visible={showMenu} animationType="fade" transparent={true}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => {
            setShowMenu(false);
          }}
          style={styles.modalContainer}
        >
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
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(72, 120, 217, 0.5)",
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
  header: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
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
