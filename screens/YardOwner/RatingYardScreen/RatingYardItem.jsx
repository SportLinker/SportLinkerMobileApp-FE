import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../../assets/avatar_default.png";
import defaultImage from "../../../assets/default_img.png";
import {
  getLoadingSelector,
  getStadiumDetailByUserSelector,
} from "../../../redux/selectors";
import { getDetailStadiumByUser } from "../../../redux/slices/yardSlice";
import { convertHttpToHttps } from "../../../utils";
import Loading from "../../../component/Loading";

const RatingYardItem = ({ route }) => {
  const { stadiumId } = route.params;
  const dispatch = useDispatch();
  const stadiumDetail = useSelector(getStadiumDetailByUserSelector);
  const loading = useSelector(getLoadingSelector);

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    dispatch(getDetailStadiumByUser(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    if (stadiumDetail) {
      setDetail(stadiumDetail);
    }
  }, [stadiumDetail]);

  const CommentItem = ({ item }) => {
    return (
      <View style={styles.ratingContainer}>
        {item.user.avatar_url ? (
          <Avatar.Image
            size={50}
            source={{
              uri: convertHttpToHttps(item.user.avatar_url),
            }}
            style={styles.avatar}
          ></Avatar.Image>
        ) : (
          <Avatar.Image
            size={50}
            source={defaultAvatar}
            style={styles.avatar}
          ></Avatar.Image>
        )}

        <View style={styles.ratingInfo}>
          <Text style={styles.name}>{item.user.name}</Text>
          <Text style={styles.comment}>{item.comment}</Text>
        </View>
        <View style={styles.ratingWrapper}>
          <Text style={styles.ratingCount}>{item.rating}</Text>
          <AntDesign name="star" size={24} color="#F9A825" />
        </View>
      </View>
    );
  };

  if (!detail) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading visible={loading} />
      ) : (
        <>
          {detail && detail.stadium_thumnail ? (
            <Image
              style={styles.yardItemImage}
              source={{
                uri: convertHttpToHttps(detail.stadium_thumnail),
              }}
            />
          ) : (
            <Image style={styles.yardItemImage} source={defaultImage} />
          )}

          <View style={styles.averageRating}>
            <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
              Đánh giá trung bình: {detail.stadium_rating} / 5
            </Text>
            <AntDesign name="star" size={24} color="#F9A825" />
          </View>
          <Text style={[styles.blackText, styles.ratingCountText]}>
            Đang có {detail.total_rating || 0} lượt đánh giá
          </Text>
          <View style={{ flex: 1, marginHorizontal: 20 }}>
            <FlatList
              data={detail.ratings}
              keyExtractor={(item) => item.id}
              renderItem={CommentItem}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Không có đánh giá nào!</Text>
              }
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  yardItemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  whiteText: {
    fontSize: 16,
    color: "white",
  },
  blackText: {
    fontSize: 16,
    color: "black",
  },
  averageRating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1646A9",
    marginVertical: 20,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  ratingContainer: {
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#C4C4C4",
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
  },
  ratingInfo: {
    width: "60%",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  comment: {
    color: "#707070",
    fontSize: 14,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingCountText: {
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 24,
    color: "#1446a9",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default RatingYardItem;
