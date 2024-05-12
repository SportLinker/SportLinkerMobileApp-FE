import React, { useRef, useState } from "react";
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
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("./../../assets/logo.png")}
            style={styles.logo}
          />
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
              onPress={() => navigation.navigate("PostLinkerScreen")}
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
        >
          {posts.map((item, index) => (
            <PostItem key={index} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 120,
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#C4C4C4",
  },
  logo: {
    height: 35,
    width: 82,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonHeader: {
    backgroundColor: "#F7F7F7",
  },
  mr5: {
    marginRight: 5,
  },
});

export default HomeScreen;
