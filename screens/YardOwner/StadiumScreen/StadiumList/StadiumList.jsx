import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import DefaultImage from "../../../../assets/default_img.png";
import { convertHttpToHttps } from "../../../../utils";

export default function StadiumList({ stadiumList }) {
  const navigation = useNavigation();

  const handleAddStadium = () => {
    navigation.navigate("CreateStadium");
  };

  const filteredStadium = stadiumList.filter(
    (stadium) => stadium.stadium_status === "approved"
  );

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {filteredStadium.map((stadium) => (
          <TouchableOpacity
            key={stadium.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("InfoStadium", { stadiumId: stadium.id })
            }
          >
            {stadium.stadium_thumnail && stadium.stadium_thumnail ? (
              <Image
                source={{
                  uri: convertHttpToHttps(stadium.stadium_thumnail),
                }}
                style={styles.image}
              />
            ) : (
              <Image source={DefaultImage} style={styles.image} />
            )}

            <View style={styles.infoContainer}>
              <Text style={styles.name}>{stadium.stadium_name}</Text>
              <Text style={styles.time}>{stadium.stadium_time}</Text>
              <Text style={styles.rating}>
                Rating: {stadium.stadium_rating}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        color="white"
        onPress={handleAddStadium}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    marginBottom: 15,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: "#777",
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    color: "#999",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#1646a9",
  },
});
