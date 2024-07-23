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
import { useDispatch, useSelector } from "react-redux";
import socket from "../../services/socket";
import NotificationComponent from "../../component/NotificationComponent";
import { getBlogList } from "../../redux/slices/blogSlice";
import { getBlogListSelector, getUserSelector } from "../../redux/selectors";

const PAGE_SIZE = 10;

const HomeScreen = ({ navigation }) => {
  const { triggerNotification } = NotificationComponent();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const blogListSelector = useSelector(getBlogListSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const formData = {
        pageNumber: 1,
        pageSize: PAGE_SIZE,
      };
      dispatch(getBlogList(formData));
    } catch (error) {
      console.log("Error getting blog list", error);
    }
  }, []);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 10;
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      !loadingMore
    ) {
      //don't load more if the page number is equal to the total page
      if (
        blogListSelector.total_page &&
        pageNumber == blogListSelector.total_page
      ) {
        return;
      }
      loadMorePosts();
    }
  };

  const loadMorePosts = () => {
    try {
      setLoadingMore(true);
      setPageNumber((prevState) => prevState + 1);
      console.log("Load more posts...");
      const formData = {
        pageNumber: pageNumber + 1,
        pageSize: PAGE_SIZE,
      };
      dispatch(getBlogList(formData)).then((response) => {
        setLoadingMore(false);
      });
    } catch (error) {
      console.log("Error load more blog list", error);
    }
  };

  const onRefresh = () => {
    try {
      setRefreshing(true);
      const formData = {
        pageNumber: 1,
        pageSize: PAGE_SIZE,
      };
      dispatch(getBlogList(formData)).then((response) => {
        setRefreshing(false);
      });
    } catch (error) {
      console.log("Error refresh blog list", error);
    }
  };

  const { userInfo } = useSelector((state) => state.userSlice);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = socket;

    socketRef.current.emit("online-user", userInfo.id);
    socketRef.current.on("receive-notification", async (data) => {
      await triggerNotification(data.content);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receive-notification");
      }
    };
  }, [userInfo.id]);

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
          {blogListSelector &&
            blogListSelector.list_blog.map((item, index) => (
              <PostItem
                caption={item.blog.blog_content}
                blog={item.blog}
                key={index + item?.id}
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
