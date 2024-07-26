import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import defaultAvatar from "../../../assets/avatar_default.png";
import { convertHttpToHttps } from "../../../utils";

export default function HeaderHomeYard({ user }) {
  const navigation = useNavigation();
  const [image, setImage] = useState(user.avatar_url);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          {user && user.avatar_url ? (
            <Avatar.Image
              size={100}
              source={{ uri: convertHttpToHttps(image) }}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Image
              size={100}
              source={defaultAvatar}
              style={styles.avatar}
            />
          )}
          <Text style={styles.profileName}>{user.name}</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("ListAllYard")}
          >
            <FontAwesome name="list-ul" size={24} color="black" />
            <Text style={styles.actionText}>Tất Cả Sân Nhỏ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("WalletHomeScreen")}
          >
            <AntDesign name="wallet" size={24} color="black" />
            <Text style={styles.actionText}>Ví</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerContainer: {
    backgroundColor: "#1646a9",
    alignItems: "center",
    width: "90%",
    borderRadius: 15,
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 10,
    width: "90%",
    borderRadius: 15,
    alignItems: "center",
  },
  avatar: {
    marginRight: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
  },
  actionContainer: {
    flexDirection: "row",
  },
  actionButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    padding: 10,
    width: "40%",
    borderRadius: 15,
  },
  actionText: {
    textAlign: "center",
  },
});
