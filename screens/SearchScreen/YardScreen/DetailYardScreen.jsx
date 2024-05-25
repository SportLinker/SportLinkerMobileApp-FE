import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "../../../component/style";
import { Avatar } from "react-native-paper";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DetailYardScreen() {
  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );
  const [liked, setLiked] = useState("");

  const navigation = useNavigation();

  const rating = 3.5;
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <FontAwesome key={i} name="star" size={20} color="#F9A825" />
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <FontAwesome
            key={i}
            name="star-half-empty"
            size={20}
            color="#F9A825"
          />
        );
      } else {
        stars.push(
          <FontAwesome key={i} name="star-o" size={20} color="#F9A825" />
        );
      }
    }
    return stars;
  };

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <View style={styles.containerDetailYard}>
          <View style={styles.innerDetailYard}>
            <Image
              source={{
                uri: "https://may.edu.vn/public/upload/news/clb-bong-ro-1695784008.jpg",
              }}
              style={styles.imageDetailYard}
            />
            <Avatar.Image
              size={90}
              source={{ uri: image }}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.detailSection}>
          <View style={styles.avatarSpacer} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Sân Bóng Rổ Công Viên Gia Định</Text>
            <View style={styles.starsContainer}>
              {renderStars(rating)}
              <Text style={styles.rating}>{rating}</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          marginTop: 26,
          padding: 5,
        }}
      >
        <View>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="post" size={30} color="black" />
            <Text>Bài Đăng</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChatListScreen"), handleCloseModal();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color="black"
            />
            <Text>Chat</Text>
          </TouchableOpacity>
        </View>
        <View>
          {liked === "liked" ? (
            <TouchableOpacity
              onPress={() => setLiked("unliked")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AntDesign name="star" size={30} color="#F9A825" />
              <Text>Đã Thích</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setLiked("liked")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AntDesign name="staro" size={30} color="black" />
              <Text>Thích</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginLeft: 30 }}>
          Giới thiệu
        </Text>
        <Text
          style={{
            color: "#707070",
            textAlign: "center",
            marginVertical: 20,
            fontSize: 16,
          }}
        >
          Sân bóng chuyền số 0 VN
        </Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#C4C4C4" }} />
      <View style={{ marginVertical: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Entypo
            name="location-pin"
            size={30}
            color="black"
            style={{ marginHorizontal: 30 }}
          />

          <View
            style={{
              marginVertical: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 16, width: 300 }}>
              343/26 Nơ Trang Long, P13, Q Bình Thạnh, Ho Chi Minh City,
              Vietnam.
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <FontAwesome
            name="phone"
            size={30}
            color="black"
            style={{ marginHorizontal: 33 }}
          />

          <View
            style={{
              marginVertical: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 16 }}>Điện thoại</Text>
            <Text style={{ marginHorizontal: 6 }}>●</Text>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>0123456789</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Feather
            name="clock"
            size={30}
            color="black"
            style={{ marginHorizontal: 29 }}
          />

          <View
            style={{
              marginVertical: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 16 }}>Thứ 2 - Thứ 7 | Mở cả ngày</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <FontAwesome5
            name="coins"
            size={30}
            color="black"
            style={{ marginHorizontal: 30 }}
          />

          <View
            style={{
              marginVertical: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 16 }}>Mức giá</Text>
            <Text style={{ marginHorizontal: 6 }}>●</Text>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>30000 vnđ</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <AntDesign
            name="star"
            size={30}
            color="#F9A825"
            style={{ marginHorizontal: 30 }}
          />

          <View
            style={{
              marginVertical: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 16 }}>Lượt thích</Text>
            <Text style={{ marginHorizontal: 6 }}>●</Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: 700 }}>{rating}</Text> (130 lượt thích)
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
