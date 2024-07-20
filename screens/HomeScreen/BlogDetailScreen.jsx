import { useEffect } from "react";
import { Text, View } from "react-native";

const BlogDetailScreen = ({ route, navigation }) => {
  const { blogId } = route.params;
  useEffect(() => {
    if (blogId) {
      //call api get blog
      console.log("BLogid" + blogId);
    }
  }, [blogId]);

  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default BlogDetailScreen;
