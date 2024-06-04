import { AntDesign } from "@expo/vector-icons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

const fakeData = {
  averageRating: 4,
  thumbnail:
    "https://i.pinimg.com/564x/fc/f8/9a/fcf89a7d9dc91c15b36545cd6d9ed712.jpg",
  comments: [
    {
      id: "c1",
      avatar:
        "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
      name: "Bé Ninh",
      comment: "Sân sạch sẽ, nhân viên thân thiện",
      rating: 5,
    },
    {
      id: "c2",
      avatar:
        "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
      name: "Bé Ninh",
      comment: "Sân sạch sẽ, nhân viên thân thiện",
      rating: 4,
    },
    {
      id: "c3",
      avatar:
        "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
      name: "Bé Ninh",
      comment: "Sân sạch sẽ, nhân viên thân thiện",
      rating: 4,
    },
    {
      id: "c4",
      avatar:
        "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
      name: "Bé Ninh",
      comment: "Sân sạch sẽ, nhân viên thân thiện",
      rating: 4,
    },
    {
      id: "c5",
      avatar:
        "https://i.pinimg.com/564x/0e/48/2e/0e482efba911b30ef9d6cbe70ad0c25a.jpg",
      name: "Bé Ninh",
      comment: "Sân sạch sẽ, nhân viên thân thiện",
      rating: 5,
    },
  ],
};

const RatingYardItem = () => {
  const CommentItem = ({ item }) => {
    return (
      <View style={styles.ratingContainer}>
        <Avatar.Image
          size={50}
          source={{
            uri: item.avatar,
          }}
          style={styles.avatar}
        ></Avatar.Image>
        <View style={styles.ratingInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.comment}>{item.comment}</Text>
        </View>
        <View style={styles.ratingWrapper}>
          <Text style={styles.ratingCount}>{item.rating}</Text>
          <AntDesign name="star" size={24} color="#F9A825" />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.yardItemImage}
        source={{
          uri: fakeData.thumbnail,
        }}
      />
      <View style={styles.averageRating}>
        <Text style={[styles.whiteText, { fontWeight: "bold" }]}>
          Đánh giá trung bình: {fakeData.averageRating} / 5
        </Text>
        <AntDesign name="star" size={24} color="#F9A825" />
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
        }}
      >
        <FlatList
          data={fakeData.comments}
          keyExtractor={(item) => item.id}
          renderItem={CommentItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  yardItemImage: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    objectPosition: "center",
  },
  whiteText: {
    fontSize: 16,
    color: "white",
  },
  averageRating: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1646A9",
    marginVertical: 20,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    gap: 10,
  },
  ratingContainer: {
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    gap: 10,
  },
  ratingInfo: {
    width: "60%",
    display: "flex",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  ratingCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RatingYardItem;
