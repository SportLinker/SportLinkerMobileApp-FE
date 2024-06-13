import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const LocationItem = ({ item, onSelect }) => (
  <TouchableOpacity onPress={() => onSelect(item)}>
    <View style={styles.locationItem}>
      <Text style={styles.locationTitle}>{item.title}</Text>
      <Text>{item.address}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  locationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  locationTitle: {
    fontWeight: "bold",
  },
});

export default LocationItem;
