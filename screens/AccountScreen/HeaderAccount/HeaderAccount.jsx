import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Recharge from "../Recharge/Recharge";
import { styles } from "../../../component/style";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const HeaderAccount = ({ image, setShowImagePickerOptions }) => {
  return (
    <View style={[styles.centerStyle]}>
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "90%",
            backgroundColor: "#fff",
            padding: 5,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          styles.shadow,
        ]}
      >
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={() => setShowImagePickerOptions(true)}>
            <Avatar.Image
              size={100}
              source={{ uri: image }}
              style={[{ marginTop: 10 }, styles.shadow]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowImagePickerOptions(true)}
            style={[
              {
                position: "absolute",
                bottom: -3,
                right: -3,
                backgroundColor: "white",
                borderRadius: 15,
                padding: 3,
              },
              styles.shadow,
            ]}
          >
            <Ionicons name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={[styles.nameAccountContainer, styles.shadow]}>
          <Text style={{ marginTop: 5, fontSize: 20, fontWeight: "bold" }}>
            Ninh
          </Text>
          <Text style={{ marginTop: 5, fontWeight: "bold" }}>
            Nam ● Người lớn
          </Text>
        </View>
      </View>
      <Recharge />
    </View>
  );
};

export default HeaderAccount;
