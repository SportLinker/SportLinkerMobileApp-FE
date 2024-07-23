import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetail } from "../../redux/slices/blogSlice";
import { getBlogDetailSelector } from "../../redux/selectors";
import PostItem from "./PostItem";

const BlogDetailScreen = ({ route, navigation }) => {
  const { blogId } = route.params;

  const blogSelector = useSelector(getBlogDetailSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (blogId) {
      //call api get blog
      console.log("BLogid: " + blogId);
      try {
        dispatch(getBlogDetail(blogId));
      } catch (error) {
        console.log("Error getting blog details: " + error);
      }
    }
  }, [blogId]);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flex: 1,
      }}
    >
      {blogSelector && (
        <PostItem
          caption={blogSelector.blog_content}
          blog={blogSelector}
          navigation={navigation}
        />
      )}
      {!blogSelector && (
        <Text style={{ fontSize: 16, color: "#707070" }}>
          Không tìm thấy bài viết
        </Text>
      )}
    </View>
  );
};

export default BlogDetailScreen;
