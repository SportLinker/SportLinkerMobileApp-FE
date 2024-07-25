import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultImage from "../../../assets/default_img.png";
import Loading from "../../../component/Loading";
import { convertHttpToHttps } from "../../../utils";

export default function YardItem({ data, loading, latitude, longitude }) {
  const navigation = useNavigation();

  const renderItem = ({ item: yard }) => (
    <TouchableOpacity
      key={yard.id}
      style={styles.containerYardUser}
      onPress={() =>
        navigation.navigate("DetailYardScreen", {
          stadium: yard,
          latitude: latitude,
          longitude: longitude,
        })
      }
    >
      <View style={styles.imageContainer}>
        {yard.stadium_thumnail ? (
          <Image
            source={{ uri: convertHttpToHttps(yard.stadium_thumnail) }}
            style={styles.imageYard}
          />
        ) : (
          <Image source={DefaultImage} style={styles.imageYard} />
        )}
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={24} color="#f9a827" />
          <Text style={styles.ratingText}>{yard.stadium_rating}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.stadiumName}>
            {yard.stadium_name} -{" "}
            <Text style={styles.distanceText}>{yard?.distance?.text}</Text>
          </Text>
          <Text style={{ marginVertical: 2 }}>
            Địa điểm: <Text style={styles.boldText}>{yard.location}</Text>
          </Text>
          <Text style={{ marginVertical: 2 }}>
            Thời gian: <Text style={styles.boldText}>{yard.stadium_time}</Text>
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name="right" size={20} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 20, marginHorizontal: 10, minHeight: 400 }}>
      {loading ? (
        <Loading message={"Loading..."} visible={loading} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(yard) => yard.id.toString()}
          ListEmptyComponent={
            <Text style={styles.noYardText}>Không có sân phù hợp</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerYardUser: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
  },
  imageYard: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  ratingContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: 5,
    padding: 5,
    display: "flex",
    flexDirection: "row",
  },
  ratingText: {
    color: "#f9a827",
    fontWeight: "bold",
    marginLeft: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 5,
  },
  stadiumName: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#4878d9",
    width: "100%",
  },
  distanceText: {
    color: "#000",
  },
  boldText: {
    fontWeight: "bold",
  },
  iconContainer: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  noYardText: {
    color: "#1646A9",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
});
