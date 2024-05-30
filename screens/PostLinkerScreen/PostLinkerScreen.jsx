import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Avatar, Button } from "react-native-paper";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import DraggableBottomSheet from "../../component/DraggableBottomSheet";
import VideoPlayer from "react-native-video-controls";
import { LinkPreview, oneOf } from "@flyerhq/react-native-link-preview";
import LoadImage from "../HomeScreen/LoadImage";
import LoadVideo from "../HomeScreen/LoadVideo";
import Autolink from "react-native-autolink";

const cationOptions = [
  {
    id: 1,
    label: "Ảnh",
    icon: "file-image",
    color: "#5BD027",
  },
  {
    id: 2,
    label: "Video",
    icon: "play-box-outline",
    color: "#1646A9",
  },
  {
    id: 3,
    label: "Vị trí",
    icon: "map-marker-outline",
    color: "#F83434",
  },
  {
    id: 4,
    label: "Liên kết",
    icon: "link-variant",
    color: "#AB741A",
  },
];

export default function PostLinkerScreen({ navigation }) {
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [isHorizontal, setIsHorizontal] = useState(true); // whether flatlist layout should horizontal or not
  const [images, setImages] = useState([
    "https://derehamstrikesbowl.co.uk/wp-content/uploads/2022/01/pool-table1.webp",
    "https://th.bing.com/th/id/OIP.0dBKywMs9F5N7ykZfI3VKAAAAA?rs=1&pid=ImgDetMain",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
  ]); // save images picked from library
  const [videos, setVideos] = useState(null); // save videos picked from library
  const [inputHeight, setInputHeight] = useState(40); // initial height of the TextInput

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          style={{
            borderRadius: 5,
            backgroundColor: "white",
            marginRight: 20,
            paddingVertical: 0,
          }}
          labelStyle={{
            color: "#4878D9",
            marginVertical: 5,
            fontWeight: "bold",
          }}
          onPress={() => console.log("Đăng")}
        >
          Đăng
        </Button>
      ),
    });
  }, []);

  const handleTextChange = (inputText) => {
    setCaption(inputText);
    const urlRegex =
      /(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*|(?:\b(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,}|xn--[a-z0-9]{2,})\b)(?![^<]*>|[^<>]*<\/a>))/gi;
    const matchedUrl = inputText.match(urlRegex);
    if (matchedUrl && matchedUrl.length > 0) {
      console.log("set links");
      setUrl(matchedUrl[0]);
    } else {
      setUrl("");
      console.log("no links");
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 10,
              gap: 20,
              marginTop: 20,
            }}
          >
            <Avatar.Image
              size={40}
              source={{
                uri: "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              }}
            />
            <Button
              contentStyle={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
              labelStyle={{
                fontWeight: "bold",
                marginVertical: 10,
                marginRight: 10,
                color: "#707070",
              }}
              onPress={() => console.log("Pressed")}
              mode="outlined"
              icon="chevron-down"
              style={{
                borderRadius: 5,
                height: 40,
                width: 120,
                paddingVertical: 0,
                paddingHorizontal: 0,
              }}
            >
              Công khai
            </Button>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.captionWrapper}>
              <TextInput
                multiline={true}
                numberOfLines={10}
                maxLength={500}
                value={caption}
                onChangeText={(text) => handleTextChange(text)}
                placeholder="Bạn đang nghĩ gì?"
                placeholderTextColor="#707070"
                onContentSizeChange={
                  (e) => setInputHeight(e.nativeEvent.contentSize.height) //update the height of input
                }
                style={[
                  styles.txtCatption,
                  { height: Math.max(40, inputHeight) },
                ]}
              />
              {/* <TextInput
                style={styles.txtCatption}
                placeholder="Type something with a URL..."
                value={caption}
                onChangeText={(text) => setCaption(text)}
                multiline
              /> */}
              <View>
                {url && (
                  <LinkPreview
                    renderImage={(data) => (
                      <Image
                        style={styles.previewImage}
                        source={{ uri: data.url }}
                      />
                    )}
                    containerStyle={styles.previewContainer}
                    text={url}
                  />
                )}
              </View>
            </View>
            {/* {images && !videos && (
              <View style={styles.imageContainer}>
                <LoadImage listImages={images} />
              </View>
            )}
            {!images && videos && (
              <View style={styles.imageContainer}>
                <LoadVideo listVideo={videos} />
              </View>
            )} */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DraggableBottomSheet setIsHorizontal={setIsHorizontal}>
        <FlatList
          data={cationOptions}
          horizontal={isHorizontal}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log("Press");
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isHorizontal ? "space-around" : "flex-start",
                  flexDirection: "row",
                  gap: 10,
                  marginBottom: 20,
                  marginRight: isHorizontal ? 10 : 0,
                }}
              >
                <Icon name={item.icon} size={30} color={item.color} />
                {!isHorizontal && (
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.label}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </DraggableBottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    width: "100%",
    paddingBottom: 200,
  },
  captionWrapper: {
    width: "100%",
    height: 400,
    display: "flex",
    marginVertical: 20,
  },
  txtCatption: {
    fontSize: 16,
    textAlign: "left",
    textAlignVertical: "top",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    display: "flex",
    justifyContent: "flex-start",
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
  postImage: {
    flex: 1,
    width: "100%",
    minHeight: 190,
    borderRadius: 5,
  },
  previewContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#d6d9dc",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
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
  previewTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
  previewDescription: {
    fontSize: 14,
    padding: 10,
    color: "#707070",
  },
});
