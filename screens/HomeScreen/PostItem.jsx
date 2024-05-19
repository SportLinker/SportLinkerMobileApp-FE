import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PostItem() {
  const [liked, setLiked] = useState(false);

  const handleToggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.postWrapper}>
      <View style={styles.avatarWrapper}>
        <Avatar.Image
          size={40}
          source={{
            uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
          }}
          style={styles.mr5}
        />
        <Text style={styles.mr5}>Ninh PD</Text>
        <Text style={styles.postTime}>1h</Text>
      </View>
      <Text style={styles.postTitle}>
        Tìm bạn cùng chơi bi-a ở Thủ Đức, từ 18 - 30 tuổi, ưu tiên các bạn nam
      </Text>
      <Image
        source={{
          uri: "https://derehamstrikesbowl.co.uk/wp-content/uploads/2022/01/pool-table1.webp",
        }}
        style={styles.postImage} // Adjust width and height as needed
      />
      <View style={styles.bottomWrap}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleToggleLike} style={styles.mr5}>
            <Icon name={liked ? "heart" : "heart-outline"} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleLike} style={styles.mr5}>
            <Icon name="chat-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleLike} style={styles.mr5}>
            <Icon name="share-outline" size={30} />
          </TouchableOpacity>
        </View>

        <Text>500 lượt thích</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postWrapper: {
    marginTop: 30,
    marginBottom: 10,
    paddingBottom: 40,
    boder: 1,
    borderBottomWidth: 2, // Border width
    borderColor: "#C4C4C4",
  },

  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  postTitle: {
    marginBottom: 15,
    fontSize: 16,
  },

  postTime: {
    color: "#707070",
    fontSize: 12,
  },

  postImage: {
    width: "100%",
    height: 190,
    objectFit: "cover",
    borderRadius: 5,
  },
  mr5: {
    marginRight: 5,
  },

  bottomWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#fff",

    borderRadius: 5,
  },
  liked: {
    backgroundColor: "#4478ff",
  },
});
