import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../component/style";
import CoachProfile from "./CoachProfile";
import CoachTrain from "./CoachTrain";

export default function DetailCoachScreen({
  navigation,
  modalVisible,
  modalClose,
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleCloseModal = () => {
    setShowReportModal(false);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={modalClose}
      >
        <View style={styles.modalMainContainer}>
          <ScrollView>
            <View>
              <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.editBtn} onPress={modalClose}>
                  <AntDesign name="arrowleft" size={24} color="black" />
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
                    <Ionicons
                      name="ellipsis-vertical"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.centerStyle}>
                <FontAwesome6 name="soccer-ball" size={60} color="black" />
                <View style={styles.nameContainer}>
                  <Text
                    style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}
                  >
                    Bóng đá
                  </Text>
                  <Text style={{ marginTop: 2, color: "#707070" }}>Ninh</Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    borderRightWidth: 1,
                    paddingRight: 30,
                    borderRightColor: "#C4C4C4",
                    paddingVertical: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "#707070",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Trận đấu
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>0</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    borderRightWidth: 1,
                    borderRightColor: "#C4C4C4",
                    paddingRight: 30,
                    paddingVertical: 15,
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "#707070",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Hoạt động
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>1</Text>
                </View>
                <View style={{ alignItems: "center", paddingVertical: 15 }}>
                  <Text
                    style={{
                      color: "#707070",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Giải thưởng
                  </Text>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>0</Text>
                </View>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  marginVertical: 20,
                  borderColor: "#c4c4c4",
                }}
              />
              {/* <CoachTopTabNavigator /> */}
              <ScrollView>
                <CoachProfile />
                <CoachTrain />
              </ScrollView>

              <Modal
                visible={showMenu}
                animationType="slide"
                transparent={true}
              >
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
                    <TouchableOpacity
                      style={[styles.menuItem, styles.flexRowStyle]}
                    >
                      <FontAwesome
                        name="bookmark-o"
                        size={24}
                        color="blue"
                        style={{ paddingRight: 8 }}
                      />
                      <Text style={[styles.textMenuItem, styles.blueText]}>
                        Yêu thích
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
                      style={[styles.menuItem, styles.flexRowStyle]}
                    >
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
                    <TouchableOpacity
                      style={[styles.menuItem, styles.flexRowStyle]}
                      onPress={() => {
                        setShowReportModal(true);
                        setShowMenu(false);
                      }}
                    >
                      <Entypo
                        name="flag"
                        size={24}
                        color="black"
                        style={{ paddingRight: 8 }}
                      />
                      <Text style={styles.textMenuItem}>
                        Báo cáo người chơi
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
                      style={[styles.menuItem, styles.flexRowStyle]}
                    >
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
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
