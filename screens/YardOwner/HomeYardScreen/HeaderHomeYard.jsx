import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HeaderHomeYard() {
  const navigation = useNavigation();
  const [image, setImage] = useState(
    "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY"
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Avatar.Image
            size={60}
            source={{ uri: image }}
            style={styles.avatar}
          />
          <Text style={styles.profileName}>Tài Võ</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("ListAllYard")}
          >
            <FontAwesome name="list-ul" size={24} color="black" />
            <Text>DS Sân Nhỏ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("WalletHomeScreen")}
          >
            <AntDesign name="wallet" size={24} color="black" />
            <Text>Ví</Text>
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
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 10,
    width: "90%",
    borderRadius: 15,
  },
  avatar: {
    marginVertical: "auto",
    marginRight: 30,
    marginLeft: 20,
  },
  profileName: {
    marginVertical: "auto",
    fontSize: 20,
    fontWeight: "700",
  },
  actionContainer: {
    display: "flex",
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
});
