import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const fakeData = {
  averageRating: 4.7,
  yardList: [
    {
      id: "y1",
      thumbnail:
        "https://i.pinimg.com/564x/fc/f8/9a/fcf89a7d9dc91c15b36545cd6d9ed712.jpg",
      name: "Sân TSN",
      rating: 4.6,
    },
    {
      id: "y2",
      thumbnail:
        "https://i.pinimg.com/564x/fc/f8/9a/fcf89a7d9dc91c15b36545cd6d9ed712.jpg",
      name: "Sân Banh Quyền Bình Thạnh",
      rating: 4.6,
    },
    {
      id: "y3",
      thumbnail:
        "https://i.pinimg.com/564x/fc/f8/9a/fcf89a7d9dc91c15b36545cd6d9ed712.jpg",
      name: "Sân TSN",
      rating: 4.6,
    },
    {
      id: "y4",
      thumbnail:
        "https://i.pinimg.com/564x/fc/f8/9a/fcf89a7d9dc91c15b36545cd6d9ed712.jpg",
      name: "Sân TSN",
      rating: 4.6,
    },
    {
      id: "y5",
      thumbnail:
        "https://i.pinimg.com/564x/fc/f8/9a/fcf89a7d9dc91c15b36545cd6d9ed712.jpg",
      name: "Sân TSN",
      rating: 4.6,
    },
  ],
};

const RatingYardList = ({ navigation }) => {
  const YardItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("RatingYardItemScreen")}
        style={styles.yardItemContainer}
      >
        <Image
          style={styles.yardItemImage}
          source={{
            uri: item.thumbnail,
          }}
        />
        <View style={styles.yardItemInfo}>
          <Text style={[styles.whiteText, styles.yardTitle]}>{item.name}</Text>
          <View style={styles.yardItemRatingWrapper}>
            <Text style={styles.whiteText}>{item.rating}/5</Text>
            <AntDesign name="star" size={24} color="#F9A825" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.ratingContainer}>
      <View style={styles.averageRating}>
        <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
          Đánh giá trung bình: {fakeData.averageRating} / 5
        </Text>
        <AntDesign name="star" size={24} color="#F9A825" />
      </View>
      <FlatList
        data={fakeData.yardList}
        renderItem={YardItem}
        keyExtractor={(item) => item.id}
        style={styles.ratingListContainer}
      />
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
