import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogListSelector } from "../../../redux/selectors";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import PostItem from "../../HomeScreen/PostItem";
import { getMyBlogList } from "../../../redux/slices/blogSlice";

export default function MyPost({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [myBlog, setMyBlog] = useState(null);

  const myBlogListSelector = useSelector(getMyBlogListSelector);
  const { userInfo } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBlogList());
  }, []);

  useEffect(() => {
    //format myblogList to render
    if (myBlogListSelector) {
      console.log("format myblogList to render");
      const newMyBlog = myBlogListSelector.map((blog) => ({
        ...blog,
        owner: userInfo,
      }));
      console.log("new my blog", newMyBlog);
      setMyBlog(newMyBlog);
    }
  }, [myBlogListSelector]);

  const onRefresh = () => {
    try {
      setRefreshing(true);
      dispatch(getMyBlogList()).then((response) => {
        setRefreshing(false);
      });
    } catch (error) {
      console.log("Error refresh blog list", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ScrollView
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
          {myBlog &&
            myBlog.map((item, index) => (
              <PostItem
                caption={item.blog_content}
                blog={item}
                key={index + item?.id}
                navigation={navigation}
              />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
