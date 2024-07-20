import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../../component/style";
import { FontAwesome } from "@expo/vector-icons";
import DefaultImage from "../../../../assets/default_img.png";
import defaultAvatar from "../../../../assets/avatar_default.png";
import { convertHttpToHttps } from "../../../../utils";

export default function HeaderSection({ stadium, stadiumOwner }) {
  const [image, setImage] = useState(stadiumOwner.avatar_url);

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
          {stadium && stadium.stadium_thumnail ? (
            <Image
              source={{
                uri: convertHttpToHttps(stadium.stadium_thumnail),
              }}
              style={styles.imageDetailYard}
            />
          ) : (
            <Image source={DefaultImage} style={styles.imageDetailYard} />
          )}

          {stadiumOwner && stadiumOwner.avatar_url ? (
            <Avatar.Image
              size={100}
              source={{ uri: convertHttpToHttps(image) }}
              style={[styles.avatar, styles.avatarShadow]}
            />
          ) : (
            <Avatar.Image
              size={100}
              source={defaultAvatar}
              style={[styles.avatar, styles.avatarShadow]}
            />
          )}
        </View>
      </View>
      <View style={styles.detailSection}>
        <View style={styles.avatarSpacer} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{stadium.stadium_name}</Text>
          <View style={styles.starsContainer}>
            {renderStars(stadium.stadium_rating)}
            <Text style={styles.rating}>{stadium.stadium_rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
