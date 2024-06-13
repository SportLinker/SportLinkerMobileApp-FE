import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar } from "react-native-paper";

const fetchLocationData = async (query, setIsLoading, setLocations) => {
  setIsLoading(true);
  const data = JSON.stringify({ q: query, hl: "vi", gl: "vn" });

  const config = {
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
    // console.log("API Response:", response.data);
    setLocations(response.data.places || []);
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
  } finally {
    setIsLoading(false);
  }
};

const LocationItem = ({ item, onSelect }) => (
  <TouchableOpacity onPress={() => onSelect(item)}>
    <View style={styles.locationItem}>
      <Text style={styles.locationTitle}>{item.title}</Text>
      <Text>{item.address}</Text>
    </View>
  </TouchableOpacity>
);

const CreateStadium = () => {
  const [stadiumData, setStadiumData] = useState({
    stadium_name: "",
    stadium_address: "",
    stadium_thumbnail: null,
    stadium_lat: "",
    stadium_long: "",
    stadium_cid: "",
  });
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreateStadium = () => {
    console.log(stadiumData);
  };

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setStadiumData({
          ...stadiumData,
          stadium_thumbnail: result.assets[0].uri,
        });
      } else {
        console.log("Image uri not found in result:", result);
      }
    } else {
      console.log("Image selection canceled");
    }
  };

  const handleSelectLocation = (item) => {
    setStadiumData({
      ...stadiumData,
      stadium_address: item.address,
      stadium_lat: item.latitude,
      stadium_long: item.longitude,
      stadium_cid: item.cid,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage}>
        {stadiumData.stadium_thumbnail ? (
          <Image
            source={{ uri: stadiumData.stadium_thumbnail }}
            style={styles.thumbnail}
          />
        ) : (
          <Image
            source={require("../../../../assets/default_img.png")}
            style={styles.thumbnail}
          />
        )}
      </TouchableOpacity>
      <TextInput
        label="Tên Sân Vận Động"
        style={styles.input}
        mode="flat"
        placeholder=""
        value={stadiumData.stadium_name}
        onChangeText={(text) =>
          setStadiumData({ ...stadiumData, stadium_name: text })
        }
      />
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
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LocationItem item={item} onSelect={handleSelectLocation} />
        )}
      />
      <TouchableOpacity onPress={handleCreateStadium}>
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>Tạo Sân Vận Động</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginBottom: 12,
    backgroundColor: "#1646a9",
  },
  buttonLabel: {
    color: "#ffffff",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    aspectRatio: 4 / 3,
    marginHorizontal: "auto",
    marginBottom: 12,
  },
  locationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  locationTitle: {
    fontWeight: "bold",
  },
  searchbar: {
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
    marginBottom: 20,
  },
});

export default CreateStadium;
