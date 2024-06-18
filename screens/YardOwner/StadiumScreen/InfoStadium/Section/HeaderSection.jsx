import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../../../component/style";
import defaultImage from "../../../../../assets/default_img.png";
import { FontAwesome } from "@expo/vector-icons";

export default function HeaderSection({ userAvatar, stadiumDetail }) {
  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesome key={i} name="star" size={20} color="#F9A825" />
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <FontAwesome
            key={i}
            name="star-half-empty"
            size={20}
            color="#F9A825"
          />
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={20} color="#F9A825" />
        );
      }
    }
    return stars;
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <View style={styles.containerDetailYard}>
        <View style={styles.innerDetailYard}>
          {stadiumDetail.stadium_thumnail ? (
            <Image
              source={{
                uri: stadiumDetail.stadium_thumnail,
              }}
              style={styles.imageDetailYard}
            />
          ) : (
            <Image source={defaultImage} style={styles.imageDetailYard} />
          )}
          <Avatar.Image
            size={90}
            source={{ uri: userAvatar }}
            style={[styles.avatar, styles.avatarShadow]}
          />
        </View>
      </View>
      <View style={styles.detailSection}>
        <View style={styles.avatarSpacer} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{stadiumDetail.stadium_name}</Text>
          <View style={styles.starsContainer}>
            {renderStars(stadiumDetail.stadium_rating)}
            <Text style={styles.rating}>{stadiumDetail.stadium_rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
