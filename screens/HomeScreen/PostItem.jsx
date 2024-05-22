import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-swiper";
import CommentModal from "./CommentModal"; // Import CommentModal

export default function PostItem({ navigation }) {
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([
    "https://derehamstrikesbowl.co.uk/wp-content/uploads/2022/01/pool-table1.webp",
    "https://th.bing.com/th/id/OIP.0dBKywMs9F5N7ykZfI3VKAAAAA?rs=1&pid=ImgDetMain",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
  ]);

  const handleToggleLike = () => {
    setLiked(!liked);
  };

  const comments = [
    { id: "1", text: "Great post!" },
    { id: "2", text: "Nice one!" },
    { id: "3", text: "Thanks for sharing." },
  ];

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
        style={styles.swiper}
        autoplayTimeout={3}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        loop={false} // Disable looping
        index={activeIndex} // Set the current active index
        onIndexChanged={(index) => setActiveIndex(index)}
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
            onPress={() => setModalVisible(true)}
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
        <TouchableOpacity onPress={() => navigation.navigate("ListLikeScreen")}>
          <Text>500 lượt thích</Text>
        </TouchableOpacity>
      </View>
      <CommentModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        comments={comments}
      />
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
    flex: 1,
    width: "100%",
    minHeight: 190,
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
    height: 200,
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
