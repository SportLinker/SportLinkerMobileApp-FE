import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../component/style";
import CoachProfile from "./CoachProfile";
import CoachTrain from "./CoachTrain";

export default function DetailCoachScreen({ navigation }) {
  const [image, setImage] = useState(
    "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png"
  );
  const [liked, setLiked] = useState("");
  const [addUser, setAddUser] = useState("");

  return (
    <View style={styles.modalMainContainer}>
      <ScrollView>
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
          {/* <CoachTabView /> */}
        </View>
      </ScrollView>
    </View>
  );
}
