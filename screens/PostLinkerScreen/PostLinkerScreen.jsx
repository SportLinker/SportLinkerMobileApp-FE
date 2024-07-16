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
  Alert,
} from "react-native";
import { screenHeight, screenWidth } from "../../component/style";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Avatar, Button, Snackbar } from "react-native-paper";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import DraggableBottomSheet from "../../component/DraggableBottomSheet";
import { LinkPreview, oneOf } from "@flyerhq/react-native-link-preview";
import LoadImage from "../HomeScreen/LoadImage";
import LoadVideo from "../HomeScreen/LoadVideo";
import Autolink from "react-native-autolink";
import * as ImagePicker from "expo-image-picker";
import SelectLocationModal from "../../component/SelectLocationModal";
import PublicStatusModal from "./PublicStatusModal";
import { uploadMultipleImages } from "../../services/cloudinary";
import { useDispatch, useSelector } from "react-redux";
import blogSlice, { postBlog } from "../../redux/slices/blogSlice";
import { getBlogLoadingSelector } from "../../redux/selectors";
import Loading from "../../component/Loading";

const cationOptions = [
  {
    id: 1,
    label: "Ảnh",
    icon: "file-image",
    color: "#5BD027",
  },
  // {
  //   id: 2,
  //   label: "Video",
  //   icon: "play-box-outline",
  //   color: "#1646A9",
  // },
  {
    id: 3,
    label: "Vị trí",
    icon: "map-marker-outline",
    color: "#F83434",
  },
  // {
  //   id: 4,
  //   label: "Liên kết",
  //   icon: "link-variant",
  //   color: "#AB741A",
  // },
];

export default function PostLinkerScreen({ navigation }) {
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [isHorizontal, setIsHorizontal] = useState(true); // whether flatlist layout should horizontal or not
  const [images, setImages] = useState(null); // save images picked from library
  const [videos, setVideos] = useState(null); // save videos picked from library
  const [inputHeight, setInputHeight] = useState(40); // initial height of the TextInput

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false); //open modal pick location
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false); //open modal public status
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [publicStatus, setPublicStatus] = useState("Công khai");

  const dispatch = useDispatch();
  const loading = useSelector(getBlogLoadingSelector);

  const onToggleStatusModal = () => {
    setIsOpenStatusModal(!isOpenStatusModal);
  };

  const onToggleModal = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSearchQuery(null);
    }
  };

  const handleSubmitPost = async () => {
    console.log("Address", selectedLocation);
    if (caption == "") {
      Alert.alert("Hãy điền cảm nghĩ cho bài viết của bạn");
    } else {
      let imageURLs = null;
      //handle upload image
      if (images) {
        dispatch(blogSlice.actions.setBlogLoading(true));
        const results = await uploadMultipleImages(images);
        console.log("Upload images ", results);
        imageURLs = results.map((image) => image.url);
        console.log("imageURLs ", imageURLs);
        dispatch(blogSlice.actions.setBlogLoading(false));
      }

      const formData = {
        blog_content: caption,
        blog_address: selectedLocation?.address || "",
        blog_sport: "",
        images: imageURLs || [],
        videos: [],
      };
      console.log("FormData", formData);
      dispatch(postBlog(formData)).then((response) => {
        console.log("Response", response);
        if (
          response?.payload &&
          response?.payload.message == "Blog created successfully"
        ) {
          setSuccessMessage("Tạo bài đăng thành công!");
          setTimeout(() => {
            navigation.navigate("BottomTabs");
          }, 800);
        } else {
          setErrorMessage("Tạo bài đăng thất bại!");
        }
      });
    }
  };

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
          onPress={() => handleSubmitPost()}
        >
          Đăng
        </Button>
      ),
    });
  }, [navigation, handleSubmitPost]);

  const pickImage = async () => {
    console.log("pickImage");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      let imageArr = [...result.assets];
      console.log("imageArr", imageArr);
      let imagesSelect = imageArr.map((image) => image.uri);
      if (imagesSelect.length > 3) {
        alert("Bạn chỉ có thể chọn tối đa 3 ảnh.");
        return;
      }
      console.log("images: " + imagesSelect);
      setImages([...imagesSelect]);
      setSuccessMessage("Chọn ảnh thành công!");
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideos([result.assets[0].uri]);
    }
  };

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
        {loading && <Loading visible={loading} />}
        <ScrollView>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginHorizontal: 10,
              gap: 10,
              marginTop: 20,
            }}
          >
            <Avatar.Image
              size={50}
              source={{
                uri: "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              }}
            />
            <View style={styles.headingWrapper}>
              <View style={styles.nameWrapper}>
                <Text multiline={true} numberOfLines={2}>
                  <Text style={styles.boldText}>Ninh Đăng Phạm</Text>
                  {selectedLocation && <Text> đang ở</Text>}
                  {selectedLocation && (
                    <Text style={styles.boldText}>
                      {" "}
                      {selectedLocation.title}
                    </Text>
                  )}
                </Text>
              </View>
              <Button
                contentStyle={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
                labelStyle={{
                  fontWeight: "bold",
                  marginVertical: 3,
                  marginHorizontal: 5,

                  color: "#1646A9",
                }}
                onPress={() => alert("Tính năng đang phát triển")}
                mode="outlined"
                icon="chevron-down"
                style={{
                  borderRadius: 5,
                  height: 30,
                  width: 120,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  marginVertical: 0,
                  marginHorizontal: 0,
                  borderColor: "#1646A9",
                }}
              >
                {publicStatus}
              </Button>
            </View>
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
              <View>
                {url && !images && !videos && (
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
            {images && !videos && (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => setImages(null)}
                >
                  <Icon name="close-thick" size={30} style={styles.btnRemove} />
                </TouchableOpacity>
                <LoadImage listImages={images} />
              </View>
            )}
            {!images && videos && (
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => setVideos(null)}
                >
                  <Icon name="close-thick" size={30} style={styles.btnRemove} />
                </TouchableOpacity>
                <LoadVideo listVideo={videos} />
              </View>
            )}
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
                if (item.label === "Ảnh") {
                  pickImage();
                }
                if (item.label === "Vị trí") {
                  onToggleModal();
                }
                if (item.label === "Video") {
                  pickVideo();
                }
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
      <SelectLocationModal
        isOpen={isOpen}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        onToggleModal={onToggleModal}
      ></SelectLocationModal>
      <PublicStatusModal
        isOpenStatusModal={isOpenStatusModal}
        setIsOpenStatusModal={setIsOpenStatusModal}
        onToggleStatusModal={onToggleStatusModal}
        setPublicStatus={setPublicStatus}
        publicStatus={publicStatus}
      ></PublicStatusModal>
      <Snackbar
        visible={!!errorMessage}
        duration={2000}
        onDismiss={() => setErrorMessage(null)}
        style={[styles.snackbarContainer, styles.snackbarContainerFail]}
      >
        {errorMessage}
      </Snackbar>
      <Snackbar
        visible={successMessage !== ""}
        onDismiss={() => setSuccessMessage("")}
        duration={1000}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
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
    height: "wrap-content",
    display: "flex",
    marginVertical: 20,
  },
  txtCatption: {
    fontSize: 16,
    textAlign: "left",
    textAlignVertical: "top",
  },
  btnRemove: {
    color: "white",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 5,
    zIndex: 0,
  },
  removeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
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
  headingWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 10,
  },
  previewDescription: {
    fontSize: 14,
    padding: 10,
    color: "#707070",
  },
  nameWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },

  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  snackbarContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#1646A9",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: -0.02 * screenHeight },
    ],
  },
  snackbarContainerFail: {
    backgroundColor: "red",
  },
});
