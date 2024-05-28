import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const StepThree = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocations = async (searchQuery) => {
    setIsLoading(true);
    let data = JSON.stringify({
      q: searchQuery,
      hl: "vi",
      gl: "vn",
    });

    let config = {
      method: "post",
      url: "https://google.serper.dev/places",
      headers: {
        "X-API-KEY": "4e83171b4dc9d9534814e34e56a5f449bcb27998",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios(config);
      setLocations(response.data.places); // Giả sử response.data.locations chứa danh sách các địa điểm
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchLocations(searchQuery);
    } else {
      fetchLocations("Sân Bóng Gần Đây");
    }
  }, [searchQuery]);

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.textTitle}>Hãy chọn địa điểm</Text>
      {selectedLocation && (
        <View style={styles.selectedLocationContainer}>
          <Text style={styles.selectedLocationText}>Địa điểm đã chọn:</Text>
          <Text style={styles.selectedLocation}>
            {selectedLocation.title} - {selectedLocation.address}
          </Text>
        </View>
      )}
      <Searchbar
        placeholder="Tìm kiếm..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        onClearIconPress={() => setSearchQuery("")}
        clearIcon={() => (
          <Icon
            name="close-circle"
            size={20}
            color="gray"
            onPress={() => setSearchQuery("")}
          />
        )}
        style={styles.searchbar}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#1646A9" />
      ) : (
        <ScrollView
          style={styles.locationList}
          contentContainerStyle={styles.scrollViewContent}
        >
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={styles.locationItem}
              onPress={() => setSelectedLocation(location)}
            >
              <Icon
                name="map-marker-radius-outline"
                size={30}
                color="#3300FF"
              />
              <View style={styles.locationText}>
                <Text style={styles.locationTitle}>{location.title}</Text>
                <Text style={styles.locationDesc}>{location.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  stepContainer: {
    paddingTop: 20,
    flex: 1,
    width: "100%",
  },
  textTitle: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  searchbar: {
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
    marginBottom: 20,
  },
  selectedLocationContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#1646A9",
    borderRadius: 10,
  },
  selectedLocationText: {
    fontSize: 16,
    color: "white",
  },
  selectedLocation: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  locationList: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    paddingBottom: 10, // Add padding to the bottom to ensure all items are visible when scrolled
  },
  locationItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  locationText: {
    flexDirection: "column",
    marginLeft: 10,
    width: "90%",
    paddingRight: 10,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationDesc: {
    fontSize: 14,
    color: "#222222",
  },
});
