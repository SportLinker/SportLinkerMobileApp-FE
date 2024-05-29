import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-swiper";
import CommentModal from "./CommentModal"; // Import CommentModal
import LoadVideo from "./LoadVideo";
import LoadImage from "./LoadImage";

export default function PostItem({ navigation, index }) {
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

  const listVideo = [
    "https://res.cloudinary.com/dcbsbl9zg/video/upload/v1716902043/Test/8b665e16-8e46-4fab-91da-8bacd2b2f7b3_mykxqt.mp4",
    "https://res.cloudinary.com/dcbsbl9zg/video/upload/v1716902043/Test/8b665e16-8e46-4fab-91da-8bacd2b2f7b3_mykxqt.mp4",
    "https://res.cloudinary.com/dcbsbl9zg/video/upload/v1716902043/Test/8b665e16-8e46-4fab-91da-8bacd2b2f7b3_mykxqt.mp4",
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
      <View>
        {index % 2 == 0 ? (
          <LoadVideo listVideo={listVideo} />
        ) : (
          <LoadImage listImages={images} />
        )}
      </View>

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
  mr5: {
    marginRight: 5,
  },
  bottomWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
});
