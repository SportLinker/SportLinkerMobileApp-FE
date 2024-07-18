import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyBlogList } from "../../../redux/slices/blogSlice";

export default function MyPost() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBlogList());
  }, []);
  return (
    <View>
      <Text>MyPost</Text>
    </View>
  );
}
