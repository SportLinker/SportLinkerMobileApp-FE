import React from "react";
import { Image, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../../../component/style";
import defaultImage from "../../../../../assets/default_img.png";
import defaultAvatar from "../../../../../assets/avatar_default.png";

export default function HeaderSection({ image, yardDetail }) {
  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <View style={styles.containerDetailYard}>
        <View style={styles.innerDetailYard}>
          <Image source={defaultImage} style={styles.imageDetailYard} />
          {image ? (
            <Avatar.Image
              size={90}
              source={{ uri: image }}
              style={[styles.avatar, styles.avatarShadow]}
            />
          ) : (
            <Avatar.Image
              size={90}
              source={defaultAvatar}
              style={[styles.avatar, styles.avatarShadow]}
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
