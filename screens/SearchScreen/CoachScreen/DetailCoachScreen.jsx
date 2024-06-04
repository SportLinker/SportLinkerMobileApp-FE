import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../component/style";
import CoachMatch from "./CoachMatch";
import CoachProfile from "./CoachProfile";
import CoachTrain from "./CoachTrain";

export default function DetailCoachScreen() {
  const [image, setImage] = useState(
    "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png"
  );
  const [liked, setLiked] = useState("");
  const [addUser, setAddUser] = useState("");
  const [activeTab, setActiveTab] = useState("train");
  const [rating, setRating] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("rating coach", rating);

  const navigation = useNavigation();

  const renderStars = (currentRating) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <AntDesign
              name={star <= currentRating ? "star" : "staro"}
              size={30}
              color="#F9A825"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.modalCoachContainer}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ alignItems: "center", marginLeft: 15 }}>
            <Avatar.Image size={100} source={{ uri: image }} />
          </View>
          <View style={styles.nameContainer}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Kim Anh
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ paddingTop: 3, fontWeight: 700, fontSize: 16 }}>
                Nữ
              </Text>
              <Text style={{ paddingHorizontal: 5, paddingTop: 5 }}>●</Text>
              <FontAwesome6
                name="volleyball"
                size={15}
                color="black"
                style={{ paddingRight: 5, paddingTop: 8 }}
              />
              <Text
                style={{ fontWeight: 700, color: "#707070", paddingTop: 5 }}
              >
                Bóng chuyền
              </Text>
            </View>
            <View
              style={{ display: "flex", flexDirection: "row", marginTop: 10 }}
            >
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
              <TouchableOpacity>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={30}
                  color="black"
                  style={{ marginRight: 20 }}
                  onPress={() => navigation.navigate("ChatListScreen")}
                />
              </TouchableOpacity>
              {liked === "liked" ? (
                <TouchableOpacity onPress={() => setLiked("unliked")}>
                  <AntDesign
                    name="star"
                    size={30}
                    color="#F9A825"
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setLiked("liked")}>
                  <AntDesign
                    name="staro"
                    size={30}
                    color="black"
                    style={{ marginRight: 20 }}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity>
                <Ionicons name="flag" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ fontWeight: 700 }}>Đánh giá</Text>
          </TouchableOpacity>
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
      </View>
      <View
        style={{
          borderWidth: 1,
          marginTop: 20,
          borderColor: "#c4c4c4",
        }}
      />
      <View style={styles.tabViewCoach}>
        <TouchableOpacity
          style={[
            styles.textCoachWrapper,
            activeTab == "profile" && styles.activeTextWrapper,
          ]}
          onPress={() => {
            setActiveTab("profile");
          }}
        >
          <Text
            style={[
              styles.boldTextCoach,
              activeTab == "profile" && styles.activeText,
            ]}
          >
            Giới thiệu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.textCoachWrapper,
            activeTab == "match" && styles.activeTextWrapper,
          ]}
          onPress={() => {
            setActiveTab("match");
          }}
        >
          <Text
            style={[
              styles.boldTextCoach,
              activeTab == "match" && styles.activeText,
            ]}
          >
            Trận đấu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.textCoachWrapper,
            activeTab == "train" && styles.activeTextWrapper,
          ]}
          onPress={() => {
            setActiveTab("train");
          }}
        >
          <Text
            style={[
              styles.boldTextCoach,
              activeTab == "train" && styles.activeText,
            ]}
          >
            Huấn luyện
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ backgroundColor: "#fff" }}>
        {activeTab === "profile" && <CoachProfile />}
        {activeTab === "match" && <CoachMatch />}
        {activeTab === "train" && <CoachTrain />}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalView}
            activeOpacity={1}
            onPress={() => {}}
          >
            <Text style={{ fontSize: 20, marginBottom: 15 }}>Đánh giá</Text>
            {renderStars(rating)}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Xong</Text>
            </Pressable>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
