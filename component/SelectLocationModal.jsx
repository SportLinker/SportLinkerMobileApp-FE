import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Modal,
  Portal,
  Searchbar,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SelectLocationModal = ({
  isOpen,
  onToggleModal,
  setSelectedLocation,
  selectedLocation,
  searchQuery,
  setSearchQuery,
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
        "X-API-KEY": "775483d107560624b1292bfb388a5101fcd13e8b",
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
    <Portal>
      <Modal
        visible={isOpen}
        onDismiss={onToggleModal}
        contentContainerStyle={styles.modalContainer}
      >
        <TouchableWithoutFeedback onPress={onToggleModal}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={onToggleModal}
                >
                  <Icon name="close-thick" size={30} style={styles.btnBack} />
                </TouchableOpacity>
                <View style={styles.stepContainer}>
                  <Text style={styles.textTitle}>Hãy chọn địa điểm</Text>
                  {selectedLocation && (
                    <View style={styles.selectedLocationContainer}>
                      <Text style={styles.selectedLocationText}>
                        Địa điểm đã chọn:
                      </Text>
                      <Text style={styles.selectedLocation}>
                        {selectedLocation.title} - {selectedLocation.address}
                      </Text>
                      <TouchableOpacity
                        style={styles.removeIcon}
                        onPress={() => setSelectedLocation(null)}
                      >
                        <Icon
                          name="close-thick"
                          size={28}
                          style={styles.btnRemove}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <Searchbar
                    placeholder="Tìm kiếm..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onClearIconPress={() => setSearchQuery(null)}
                    clearIcon={() => (
                      <Icon
                        name="close-circle"
                        size={20}
                        color="gray"
                        onPress={() => setSearchQuery(null)}
                      />
                    )}
                    style={styles.searchbar}
                  />
                  {isLoading ? (
                    <ActivityIndicator
                      size="large"
                      color="#1646A9"
                      style={{ flex: 1 }}
                    />
                  ) : (
                    <ScrollView
                      style={styles.locationList}
                      contentContainerStyle={styles.scrollViewContent}
                    >
                      {locations.map((location, i) => (
                        <TouchableOpacity
                          key={i}
                          style={styles.locationItem}
                          onPress={() => setSelectedLocation(location)}
                        >
                          <Icon
                            name="map-marker-radius-outline"
                            size={30}
                            color="#3300FF"
                          />
                          <View style={styles.locationText}>
                            <Text style={styles.locationTitle}>
                              {location.title}
                            </Text>
                            <Text style={styles.locationDesc}>
                              {location.address}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    width: "90%",
    minWidth: "90%",
    height: "90%",
  },
  btnBack: {
    fontSize: 24,
    color: "#1646A9",
    fontWeight: "600",
  },
  btnRemove: {
    color: "white",
  },
  stepContainer: {
    paddingTop: 20,
    flex: 1,
    width: "100%",
  },
  removeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
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
    width: "100%",
  },
  selectedLocationContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#1646A9",
    borderRadius: 10,
    position: "relative",
    zIndex: 0,
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

export default SelectLocationModal;
