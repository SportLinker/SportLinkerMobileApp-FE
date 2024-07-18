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
import { getDistanceTime } from "../../utils";
import { useDispatch } from "react-redux";
import { dislikeBlog, likeBlog } from "../../redux/slices/blogSlice";

export default function PostItem({ navigation, caption, blog }) {
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (blog && blog.blog) {
      setLiked(blog.blog.is_react);
    }
    if (blog && blog.blog.blog_link.length > 0) {
      const urlArr = blog.blog.blog_link.map((item) => item.url);
      setImages(urlArr);
    }
  }, [blog]);

  const dispatch = useDispatch();

  const listVideo = [];

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleToggleLike = () => {
    console.log("Is react", liked);
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

    //handle whether like or unlike blog
    if (!liked) {
      dispatch(likeBlog(blog.blog?.id));
    } else {
      dispatch(dislikeBlog(blog.blog?.id));
    }
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
            uri: blog && blog.blog.owner?.avatar_url,
          }}
          style={styles.mr5}
        />
        <View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.mr5}> {blog && blog.blog.owner?.name}</Text>
            {blog && blog.blog?.blog_address && (
              <Text>
                đang ở{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {blog.blog.blog_address}
                </Text>
              </Text>
            )}
          </View>
          <Text style={styles.postTime}>
            {blog && getDistanceTime(blog.blog?.created_at)}
          </Text>
        </View>
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

      {(images.length > 0 || listVideo.length > 0) && (
        <View>
          {images.length == 0 && listVideo.length > 0 ? (
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
    marginLeft: 2,
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
