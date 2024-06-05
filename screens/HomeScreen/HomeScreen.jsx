import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FAB } from "react-native-paper";
import PostItem from "./PostItem";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../redux/selectors";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState([1, 2, 3]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      !loadingMore // Kiểm tra xem dữ liệu có đang được tải không
    ) {
      loadMorePosts();
    }
  };

  const loadMorePosts = () => {
    setLoadingMore(true); // Đánh dấu rằng dữ liệu đang được tải
    console.log("Load more posts...");
    const newPosts = [4, 5, 6];
    setPosts((prevPosts) => prevPosts.concat(newPosts));
    // Thêm logic tải thêm bài viết ở đây
    setTimeout(() => {
      setLoadingMore(false); // Đánh dấu rằng dữ liệu đã được tải xong
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true); // Hiển thị chỉ báo là đang làm mới
    setTimeout(() => {
      setRefreshing(false); // Ẩn chỉ báo là đang làm mới
    }, 1000);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.logoHeader, styles.pr5]}>
            <Image
              source={require("./../../assets/sportlinker_logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <FAB
              icon="plus-circle-outline"
              color="black"
              size="small"
              style={[styles.buttonHeader, styles.mr5]}
              onPress={() => navigation.navigate("PostLinkerScreen")}
            />
            <FAB
              icon="bell-outline"
              color="black"
              size="small"
              style={styles.buttonHeader}
              onPress={() => navigation.navigate("NotificationScreen")}
            />
          </View>
        </View>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4478ff"]}
              tintColor={"#4478ff"}
              title="Tải thêm bài viết"
              titleColor="#4478ff"
            />
          }
          style={{ paddingHorizontal: 10 }}
        >
          {posts.map((item, index) => (
            <PostItem
              caption="Tìm bạn cùng chơi bi-a ở Thủ Đức, từ 18 - 30 tuổi, ưu tiên các bạn nam github.com google.com"
              key={index}
              index={index}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
  },
  header: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#C4C4C4",
    paddingHorizontal: 10,
    backgroundColor: "#1646a9",
  },
  logo: {
    height: 35,
    width: 82,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  logoHeader: {
    borderRadius: 10,
  },
  pr5: {
    padding: 5,
  },
  buttonHeader: {
    backgroundColor: "#F7F7F7",
  },
  mr5: {
    marginRight: 5,
  },
});

export default HomeScreen;
