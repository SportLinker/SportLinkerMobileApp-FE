import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";

export default function AccountScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
      <View style={{ alignItems: "center" }}>
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
          <Text style={{ color: "#707070" }}>{"Thể thao".toUpperCase()}</Text>
          <Text style={{ color: "#4878D9" }}>Thêm</Text>
        </View>
        <View>
          <View style={styles.innerInfoSport}>
            <View>
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <FontAwesome name="soccer-ball-o" size={24} color="black" />
                  <Text>Bóng đá</Text>
                </View>
                <View>
                  <AntDesign name="right" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
    // borderRadius: "15px",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  topInfoSport: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 10,
  },
});
