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
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Avatar, Button } from "react-native-paper";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import DraggableBottomSheet from "../../component/DraggableBottomSheet";
import VideoPlayer from "react-native-video-controls";

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
  const [isHorizontal, setIsHorizontal] = useState(true); // whether flatlist layout should horizontal or not
  const [images, setImages] = useState([
    "https://derehamstrikesbowl.co.uk/wp-content/uploads/2022/01/pool-table1.webp",
    "https://th.bing.com/th/id/OIP.0dBKywMs9F5N7ykZfI3VKAAAAA?rs=1&pid=ImgDetMain",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
    "https://blog.dktcdn.net/files/bida-la-gi-2.jpg",
  ]); // save images picked from library
  const [activeIndex, setActiveIndex] = useState(0); // index of image being shown

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
                numberOfLines={3}
                maxLength={70}
                value={caption}
                onChangeText={(text) => setCaption(text)}
                placeholder="Bạn đang nghĩ gì?"
                placeholderTextColor="#707070"
                style={styles.txtCatption}
              />
            </View>
            {images && (
              <View style={styles.imageContainer}>
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
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={styles.postImage}
                    />
                  ))}
                </Swiper>
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
    height: 100,
    marginVertical: 20,
  },
  txtCatption: {
    fontSize: 24,
    height: 100,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    display: "flex",
    justifyContent: "flex-start",
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
  postImage: {
    flex: 1,
    width: "100%",
    minHeight: 190,
    borderRadius: 5,
  },
});
