import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../../assets/default_img.png";
import {
  getByOwnerSelector,
  getLoadingSelector,
} from "../../../redux/selectors";
import { getStadiumByOwner } from "../../../redux/slices/yardSlice";
import { convertHttpToHttps } from "../../../utils";
import Loading from "../../../component/Loading";

const RatingYardList = ({ navigation }) => {
  const dispatch = useDispatch();
  const stadium = useSelector(getByOwnerSelector);
  const loading = useSelector(getLoadingSelector);

  const [stadiumList, setStadiumList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    dispatch(getStadiumByOwner());
  }, [dispatch]);

  useEffect(() => {
    if (stadium) {
      setStadiumList(stadium);
      calculateAverageRating(stadium);
    }
  }, [stadium]);

  const calculateAverageRating = (stadiums) => {
    if (stadiums.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = stadiums.reduce(
      (acc, item) => acc + (item.stadium_rating || 0),
      0
    );
    const average = totalRating / stadiums.length;
    setAverageRating(average.toFixed(1)); // làm tròn đến 1 chữ số thập phân
  };

  const YardItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RatingYardItemScreen", {
            stadiumId: item.id,
          })
        }
        style={styles.yardItemContainer}
      >
        {item.stadium_thumnail ? (
          <Image
            style={styles.yardItemImage}
            source={{
              uri: convertHttpToHttps(item.stadium_thumnail),
            }}
          />
        ) : (
          <Image style={styles.yardItemImage} source={defaultImage} />
        )}

        <View style={styles.yardItemInfo}>
          <Text style={[styles.whiteText, styles.yardTitle]}>
            {item.stadium_name}
          </Text>
          <View style={styles.yardItemRatingWrapper}>
            <Text style={styles.whiteText}>{item.stadium_rating}/5</Text>
            <AntDesign name="star" size={24} color="#F9A825" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.ratingContainer}>
      {loading ? (
        <Loading visible={loading} />
      ) : (
        <>
          <View style={styles.averageRating}>
            <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
              Đánh giá trung bình: {averageRating} / 5
            </Text>
            <AntDesign name="star" size={24} color="#F9A825" />
          </View>
          <FlatList
            data={stadiumList}
            renderItem={YardItem}
            keyExtractor={(item) => item.id}
            style={styles.ratingListContainer}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flex: 1,
  },
  whiteText: {
    fontSize: 16,
    color: "white",
  },
  yardTitle: {
    width: "70%",
    fontWeight: "bold",
  },
  averageRating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1646A9",
    marginTop: 20,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    gap: 10,
  },
  ratingListContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  yardItemContainer: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "#4878D9",
  },
  yardItemImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    objectPosition: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  yardItemInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  yardItemRatingWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
});

export default RatingYardList;
