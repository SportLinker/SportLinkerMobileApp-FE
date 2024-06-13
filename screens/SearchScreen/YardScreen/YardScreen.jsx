import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import YardItem from "./YardItem";
import FilterEventOptionList from "../EventScreen/FilterEventOptionList";
import { yard_data } from "../../../utils/constant";

export default function YardScreen() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
        console.log("latitude: ", location.coords.latitude);
        console.log("longitude: ", location.coords.longitude);

        let addressArray = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (addressArray && addressArray.length > 0) {
          setAddress(addressArray[0]);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <FilterEventOptionList /> */}
      <View style={styles.locationWrapper}>
        {address ? (
          <Text style={styles.locationText}>
            Current Location: {address.street || ""}, {address.city || ""},{" "}
            {address.region || ""}, {address.country || ""}
          </Text>
        ) : location ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text>{errorMsg || "Waiting..."}</Text>
        )}
      </View>
      <ScrollView style={{ height: "90%" }}>
        <YardItem data={yard_data} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  locationWrapper: {
    marginVertical: 20,
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "black",
  },
});
