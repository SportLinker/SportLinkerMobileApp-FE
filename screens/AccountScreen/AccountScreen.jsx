import { AntDesign, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

export default function AccountScreen() {
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.editBtn}>
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.horizontalIconsContainer}>
              <TouchableOpacity style={styles.icon}>
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
                      marginVertical: 10,
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editBtn: {
    marginRight: 20,
  },
  editBtnInfo: {
    color: "black",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
  },
  horizontalIconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoText: {
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 400,
  },
  innerInfoSport: {
    borderRadius: 20,
    backgroundColor: "#fff", // Màu nền của phần tử
    width: 337,
    height: 101,
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
  topInfoSport: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 38,
    marginTop: 30,
    marginBottom: 10,
  },
  bottomInfoSport: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  innerInfoCommunity: {
    borderRadius: 20,
    backgroundColor: "#fff", // Màu nền của phần tử
    width: 337,
    height: 60,
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
});
