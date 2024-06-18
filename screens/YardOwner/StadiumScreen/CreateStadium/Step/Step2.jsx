import React, { useEffect } from "react";
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
}) => {
  useEffect(() => {
    if (stadiumData.stadium_address) {
      const delayDebounceFn = setTimeout(() => {
        fetchLocationData(
          stadiumData.stadium_address,
          setIsLoading,
          setLocations
        );
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [stadiumData.stadium_address]);

  const validateStep2 = () => {
    if (
      stadiumData.stadium_address &&
      stadiumData.stadium_lat &&
      stadiumData.stadium_long
    ) {
      nextStep();
    } else {
      alert("Please select a location.");
    }
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
      <Searchbar
        placeholder="Địa chỉ Sân Vận Động"
        value={stadiumData.stadium_address}
        onChangeText={(text) =>
          setStadiumData({ ...stadiumData, stadium_address: text })
        }
        clearIcon={() => (
          <Icon
            name="close-circle"
            size={20}
            color="gray"
            onPress={() =>
              setStadiumData({ ...stadiumData, stadium_address: "" })
            }
          />
        )}
        style={styles.searchbar}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        scrollEnabled
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LocationItem
            item={item}
            onSelect={(item) => {
              setStadiumData({
                ...stadiumData,
                stadium_address: item.address,
                stadium_lat: item.latitude,
                stadium_long: item.longitude,
              });
            }}
          />
        )}
      />
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
});

export default Step2;
