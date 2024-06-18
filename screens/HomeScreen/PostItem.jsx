import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-swiper";
import CommentModal from "./CommentModal"; // Import CommentModal
import LoadVideo from "./LoadVideo";
import LoadImage from "./LoadImage";
import Autolink from "react-native-autolink";
import { LinkPreview } from "@flyerhq/react-native-link-preview";

export default function PostItem({ navigation, index, caption }) {
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState(null);
  const [images, setImages] = useState([
    "https://derehamstrikesbowl.co.uk/wp-content/uploads/2022/01/pool-table1.webp",
    "https://th.bing.com/th/id/OIP.0dBKywMs9F5N7ykZfI3VKAAAAA?rs=1&pid=ImgDetMain",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
  ]);

  const listVideo = [
    "https://res.cloudinary.com/dcbsbl9zg/video/upload/v1716902043/Test/8b665e16-8e46-4fab-91da-8bacd2b2f7b3_mykxqt.mp4",
    "https://res.cloudinary.com/dcbsbl9zg/video/upload/v1716902043/Test/8b665e16-8e46-4fab-91da-8bacd2b2f7b3_mykxqt.mp4",
    "https://res.cloudinary.com/dcbsbl9zg/video/upload/v1716902043/Test/8b665e16-8e46-4fab-91da-8bacd2b2f7b3_mykxqt.mp4",
  ];

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggleLike = () => {
    setLiked(!liked);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    // Extract URL using a regex pattern
    const urlRegex =
      /(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*|(?:\b(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,}|xn--[a-z0-9]{2,})\b)(?![^<]*>|[^<>]*<\/a>))/gi;
    const matchedUrl = caption.match(urlRegex);
    if (matchedUrl && matchedUrl.length > 0) {
      setUrl(matchedUrl[0]);
    } else {
      setUrl("");
    }
  }, [caption]);

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
      <Autolink
        style={styles.postTitle}
        // Required: the text to parse for links
        text={caption}
        // Optional: enable email linking
        email
        // Optional: enable phone linking
        phone="sms"
        // Optional: enable URL linking
        url
        renderLink={(text, match) => (
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL(match.getAnchorHref()).catch((err) =>
                console.error("Failed to open URL:", err)
              )
            }
          >
            {text}
          </Text>
        )}
      />
      {url && !images && !listVideo && (
        <LinkPreview
          renderImage={(data) => (
            <Image style={styles.previewImage} source={{ uri: data.url }} />
          )}
          containerStyle={styles.previewContainer}
          text={url}
        />
      )}

      {(images || listVideo) && (
        <View>
          {index % 2 === 0 ? (
            <LoadVideo listVideo={listVideo} />
          ) : (
            <LoadImage listImages={images} />
          )}
        </View>
      )}

      <View style={styles.bottomWrap}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleToggleLike} style={styles.mr5}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Icon
                name={liked ? "heart" : "heart-outline"}
                color={liked ? "#ff3300" : "black"}
                size={30}
              />
            </Animated.View>
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
  previewContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#d6d9dc",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    display: "flex",
    flexDirection: "column-reverse",
    marginTop: 10,
  },
  previewImage: {
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
