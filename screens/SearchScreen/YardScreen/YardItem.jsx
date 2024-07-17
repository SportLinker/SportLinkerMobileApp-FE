import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DefaultImage from "../../../assets/default_img.png";
import Loading from "../../../component/Loading";

export default function YardItem({ data, loading, latitude, longitude }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginTop: 20, marginHorizontal: "auto", minHeight: 400 }}>
      {loading ? (
        <Loading message={"Loading..."} visible={loading} />
      ) : (
        <>
          {data &&
            data.map((yard) => (
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
                      source={{ uri: yard.stadium_thumnail }}
                      style={styles.imageYard}
                    />
                  ) : (
                    <Image source={DefaultImage} style={styles.imageYard} />
                  )}
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={24} color="#f9a827" />
                    <Text style={styles.ratingText}>{yard.total_rating}</Text>
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View>
                    <Text style={styles.stadiumName}>
                      {yard.stadium_name} -{" "}
                      <Text style={styles.distanceText}>
                        {yard.distance.text}
                      </Text>
                    </Text>
                    <Text>
                      Địa điểm:{" "}
                      <Text style={styles.boldText}>{yard.location}</Text>
                    </Text>
                    <Text>
                      Thời gian:{" "}
                      <Text style={styles.boldText}>{yard.stadium_time}</Text>
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <AntDesign name="right" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerYardUser: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
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
    marginVertical: "auto",
    marginLeft: 5,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 5,
  },
  stadiumName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4878d9",
  },
  distanceText: {
    color: "#000",
  },
  boldText: {
    fontWeight: "bold",
  },
  iconContainer: {
    marginVertical: "auto",
  },
});
