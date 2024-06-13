import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../../../component/style";
import defaultImage from "../../../../../assets/default_img.png";

export default function HeaderSection({ yardName, yardImage }) {
  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );

  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <View style={styles.containerDetailYard}>
        <View style={styles.innerDetailYard}>
          {yardImage ? (
            <Image
              source={{
                uri: yardImage,
              }}
              style={styles.imageDetailYard}
            />
          ) : (
            <Image source={defaultImage} style={styles.imageDetailYard} />
          )}
          <Avatar.Image
            size={90}
            source={{ uri: image }}
            style={[styles.avatar, styles.avatarShadow]}
          />
        </View>
      </View>
      <View style={styles.detailSection}>
        <View style={styles.avatarSpacer} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{yardName}</Text>
        </View>
      </View>
    </View>
  );
}
