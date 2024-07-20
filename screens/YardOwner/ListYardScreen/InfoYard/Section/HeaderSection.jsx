import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import defaultAvatar from "../../../../../assets/avatar_default.png";
import { convertHttpToHttps } from "../../../../../utils";

export default function HeaderSection({ image, yardDetail }) {
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        },
      ]}
    >
      <View style={styles.containerDetailYard}>
        <View style={styles.innerDetailYard}>
          {image ? (
            <Avatar.Image
              size={90}
              source={{ uri: convertHttpToHttps(image) }}
              style={[styles.avatarYard, styles.avatarShadow]}
            />
          ) : (
            <Avatar.Image
              size={90}
              source={defaultAvatar}
              style={[styles.avatarYard, styles.avatarShadow]}
            />
          )}
        </View>
      </View>
      <View style={styles.detailSection}>
        <View style={styles.avatarSpacer} />
        <View style={styles.textContainer}>
          {yardDetail ? (
            <Text style={styles.title}>{yardDetail.yard_name}</Text>
          ) : (
            <Text style={styles.title}>Loading...</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  containerDetailYard: {
    marginBottom: 10,
  },
  innerDetailYard: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarYard: {
    borderRadius: 45,
  },
  avatarShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailSection: {
    alignItems: "center",
  },
  avatarSpacer: {
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
