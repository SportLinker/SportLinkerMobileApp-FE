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
import { Avatar, Menu } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CommentModal from "./CommentModal"; // Import CommentModal
import { Ionicons } from "@expo/vector-icons";
import LoadVideo from "./LoadVideo";
import LoadImage from "./LoadImage";
import Autolink from "react-native-autolink";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { convertHttpToHttps, getDistanceTime } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  dislikeBlog,
  likeBlog,
} from "../../redux/slices/blogSlice";
import { Alert } from "react-native";
import PremiumIcon from "../../component/PremiumIcon";

export default function PostItem({
  navigation,
  caption,
  blog,
  refreshBlog,
  handleShowMessage,
}) {
  const [liked, setLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState(null);
  const [images, setImages] = useState([]);
  const [totalLike, setTotalLike] = useState(0);
  const [visibleMenu, setVisibleMenu] = React.useState(false);

  const { userInfo } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (blog) {
      setLiked(blog.is_react);
    }
    if (blog && blog.blog_link.length > 0) {
      const urlArr = blog.blog_link.map((item) => item.url);
      setImages(urlArr);
    }
    if (blog && blog.total_like) {
      setTotalLike(blog.total_like);
    }
  }, [blog]);

  const dispatch = useDispatch();

  const listVideo = [];

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const openMenu = () => setVisibleMenu(true);

  const closeMenu = () => setVisibleMenu(false);

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
      setTotalLike((prevState) => prevState + 1);
      dispatch(likeBlog(blog?.id));
    } else {
      setTotalLike((prevState) => prevState - 1);
      dispatch(dislikeBlog(blog?.id));
    }
  };

  const confirmDeleteBlog = () => {
    Alert.alert(
      "Xác nhận",
      `Bạn có chắc chắn là muốn xoá bài đăng này không?`,
      [
        {
          text: "Huỷ",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: () => handleDeleteBlog(),
        },
      ]
    );
  };

  const handleDeleteBlog = () => {
    try {
      dispatch(deleteBlog(blog?.id)).then((response) => {
        console.log("response delete blog: " + JSON.stringify(response));
        if (response.payload == "Remove blog success") {
          console.log("delete blog success");
          handleShowMessage("Xoá bài đăng thành công!", "success");
        } else {
          handleShowMessage("Xoá bài đăng thất bại!", "error");
        }
        closeMenu();
      });
    } catch (error) {
      console.log("Error deleting blog", error);
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
      <View style={styles.headerWrapper}>
        <View style={styles.avatarWrapper}>
          <Avatar.Image
            size={40}
            source={{
              uri: blog && convertHttpToHttps(blog.owner?.avatar_url),
            }}
            style={styles.mr5}
          />
          <View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={
                  (styles.mr5,
                  { flexDirection: "row", alignItems: "center", gap: 10 })
                }
              >
                <Text>{blog && blog.owner?.name}</Text>
                {blog && blog.owner?.is_premium && <PremiumIcon />}
              </Text>

              {blog && blog?.blog_address && (
                <Text>
                  {" "}
                  đang ở{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {blog.blog_address}
                  </Text>
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.postTime}>
                {blog && getDistanceTime(blog?.created_at)}
              </Text>
              {blog.status == "deleted" && (
                <Text
                  style={{
                    backgroundColor: "#c72523",
                    color: "white",
                    height: 18,
                    borderRadius: 7,
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    marginLeft: 10,
                  }}
                >
                  Đã xoá
                </Text>
              )}
            </View>
          </View>
        </View>
        {blog.blog_owner == userInfo.id && (
          <View>
            <Menu
              statusBarHeight={30}
              visible={visibleMenu}
              onDismiss={closeMenu}
              anchor={
                <Ionicons
                  name="ellipsis-vertical"
                  size={24}
                  color="black"
                  onPress={() => openMenu()}
                />
              }
            >
              <Menu.Item
                onPress={() => confirmDeleteBlog()}
                title="Delete"
                leadingIcon="delete"
              />
            </Menu>
          </View>
        )}
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
        <View style={{ height: 400 }}>
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
            onPress={() => {
              Alert.alert("Tính năng đang phát triển!", "");
              // navigation.navigate("BlogDetailScreen", {
              //   blogId: blog.id,
              // });
            }}
            style={styles.mr5}
          >
            <Icon name="share-outline" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ListLikeScreen", { blogId: blog.id })
          }
        >
          <Text>{totalLike} lượt thích</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <CommentModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          blogId={blog.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postWrapper: {
    flex: 1,
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
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  avatarWrapper: {
    width: "90%",
    flexDirection: "row",
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
