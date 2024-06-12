import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const stadiumData = {
  stadium_name: "Amazing Stadium",
  stadium_address: "1234 Stadium Rd, City, Country",
  stadium_thumbnail: "https://example.com/stadium.jpg",
  description:
    "This is an amazing stadium known for hosting thrilling sports events and concerts. It has state-of-the-art facilities and provides an unforgettable experience for all visitors.",
};

export default function InfoStadium() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri:
            stadiumData.stadium_thumbnail ||
            "https://example.com/default-stadium.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.name}>Stadium Name: {stadiumData.stadium_name}</Text>
      <Text style={styles.location}>
        Location: {stadiumData.stadium_address}
      </Text>

      <Text style={styles.description}>{stadiumData.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
  },
  capacity: {
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
});
