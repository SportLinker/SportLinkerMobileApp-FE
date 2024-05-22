import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-swiper";

export default function PostItem() {
  const [liked, setLiked] = useState(false);
  const [images, setImages] = useState([
    "https://derehamstrikesbowl.co.uk/wp-content/uploads/2022/01/pool-table1.webp",
    "https://th.bing.com/th/id/OIP.0dBKywMs9F5N7ykZfI3VKAAAAA?rs=1&pid=ImgDetMain",
  ]);

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
      <Swiper
        style={styles.swiper} // Updated style
        autoplayTimeout={3} // Adjusted timeout
        showsPagination={true}
        dotStyle={styles.dotStyle} // Added dotStyle
        activeDotStyle={styles.activeDotStyle} // Added activeDotStyle
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.postImage} />
        ))}
      </Swiper>
      <View style={styles.bottomWrap}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleToggleLike} style={styles.mr5}>
            <Icon name={liked ? "heart" : "heart-outline"} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Comment pressed")}
            style={styles.mr5}
          >
            <Icon name="chat-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Share pressed")}
            style={styles.mr5}
          >
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
    borderBottomWidth: 2,
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
  swiper: {
    height: 200, // Ensuring Swiper has a set height
  },
  dotStyle: {
    backgroundColor: "rgba(255,255,255,.3)",
    width: 6,
    height: 6,
    borderRadius: 4,
    margin: 3,
  },
  activeDotStyle: {
    backgroundColor: "#FFFFFF",
    width: 6,
    height: 6,
    borderRadius: 4,
    margin: 3,
  },
});
