import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CoachTopTabNavigator from "../../../tabs/CoachTopTabNavigator"; // Adjust the path as needed

export default function DetailCoachScreen({
  navigation,
  modalVisible,
  modalClose,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={modalClose}
    >
      <View style={styles.modalContainer}>
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
                <TouchableOpacity style={styles.icon}>
                  <Ionicons name="ellipsis-vertical" size={24} color="black" />
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
                  style={{ color: "#707070", fontSize: 16, fontWeight: "bold" }}
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
                }}
              >
                <Text
                  style={{ color: "#707070", fontSize: 16, fontWeight: "bold" }}
                >
                  Hoạt động
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>1</Text>
              </View>
              <View style={{ alignItems: "center", paddingVertical: 15 }}>
                <Text
                  style={{ color: "#707070", fontSize: 16, fontWeight: "bold" }}
                >
                  Giải thưởng
                </Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>0</Text>
              </View>
            </View>
            <View style={{ borderWidth: 1, marginTop: 20, color: "#c4c4c4" }} />
            <CoachTopTabNavigator />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    paddingTop: 30,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  editBtn: {
    padding: 10,
  },
  horizontalIconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  centerStyle: { alignItems: "center" },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
