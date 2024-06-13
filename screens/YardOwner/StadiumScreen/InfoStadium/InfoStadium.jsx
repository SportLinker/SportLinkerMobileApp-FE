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
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  location: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "justify",
    lineHeight: 22,
  },
});
