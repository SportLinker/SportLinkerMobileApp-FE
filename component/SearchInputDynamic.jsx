import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import {
  searchAdvanceListMatch,
  searchAdvanceListUser,
  searchAdvanceLisYard,
} from "../redux/slices/eventSlice";

export default function SearchInputDynamic({ screen }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location) {
        const { latitude, longitude } = location.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        let addressArray = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (addressArray && addressArray.length > 0) {
          setAddress(addressArray[0]);
        }
      }
    })();
  }, []);

  const handleSearchSubmit = () => {
    console.log("screen: " + screen);
    const page_size = 20;
    const page_number = 1;
    const propsToSearch = {
      page_size,
      page_number,
      search: searchQuery,
      latitude,
      longitude,
    };
    console.log("Search query submitted:", propsToSearch);
    if (screen == "user") {
      dispatch(searchAdvanceListUser(propsToSearch));
    } else if (screen == "match") {
      dispatch(searchAdvanceListMatch(propsToSearch));
    } else if (screen == "yard") {
      console.log("vao day");
      dispatch(searchAdvanceLisYard(propsToSearch));
    }
  };
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "#1646a9", padding: 10 }}>
        <Searchbar
          placeholder={`Tìm kiếm bằng từ khóa `}
          onChangeText={setSearchQuery}
          value={searchQuery}
          iconColor="#4878D9"
          placeholderTextColor="#707070"
          style={styles.inputSearch}
          inputStyle={{ fontSize: 14 }}
          onSubmitEditing={handleSearchSubmit}
          onIconPress={handleSearchSubmit}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputSearch: {
    backgroundColor: "#FDFDFD",
    borderWidth: 1,
    borderColor: "#F3F3F3",
    borderRadius: 10,
  },
});
