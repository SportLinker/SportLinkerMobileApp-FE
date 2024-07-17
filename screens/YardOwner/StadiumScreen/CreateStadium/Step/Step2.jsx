import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LocationItem from "../LocationItem";

const Step2 = ({
  stadiumData,
  setStadiumData,
  locations,
  setLocations,
  isLoading,
  setIsLoading,
  nextStep,
  previousStep,
  fetchLocationData,
  stadiumId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFlatList, setShowFlatList] = useState(true); // State to toggle FlatList visibility

  useEffect(() => {
    if (searchQuery) {
      const delayDebounceFn = setTimeout(() => {
        fetchLocationData(searchQuery, setIsLoading, setLocations);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery]);

  const validateStep2 = () => {
    if (stadiumData.stadium_address) {
      nextStep();
    } else {
      alert("Please select a location.");
    }
  };

  const handleSelectLocation = (item) => {
    setStadiumData({
      ...stadiumData,
      stadium_address: item.address,
      stadium_lat: item.latitude,
      stadium_long: item.longitude,
    });
    setSearchQuery("");
    setShowFlatList(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowFlatList(false);
  };

  return (
    <View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={previousStep} style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Quay lại</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={validateStep2}
          style={styles.buttonContainer}
        >
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Tiếp theo</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>
        Lưu ý: Không thể thay đổi được địa chỉ sau khi đã tạo!!!
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginVertical: 5 }}>
        Địa điểm đã chọn: {stadiumData.stadium_address}
      </Text>
      <Searchbar
        placeholder="Địa chỉ Sân Vận Động"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          setShowFlatList(true);
        }}
        clearIcon={() => (
          <Icon
            name="close-circle"
            size={20}
            color="gray"
            onPress={handleClearSearch}
          />
        )}
        style={styles.searchbar}
      />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {showFlatList && (
        <FlatList
          scrollEnabled
          data={locations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <LocationItem item={item} onSelect={handleSelectLocation} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginBottom: 12,
    backgroundColor: "#1646a9",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "bold",
    color: "red",
    textTransform: "uppercase",
    // textDecorationLine: "underline",
  },
});

export default Step2;
