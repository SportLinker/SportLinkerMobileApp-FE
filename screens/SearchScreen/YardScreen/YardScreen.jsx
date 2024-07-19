import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { yard_data } from "../../../utils/constant";
import YardItem from "./YardItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllStadiumByUser } from "../../../redux/slices/eventSlice";
import {
  getAllStadiumByUserSelector,
  getEventLoadingtSelector,
  getLoadingSelector,
} from "../../../redux/selectors";

export default function YardScreen() {
  const dispatch = useDispatch();
  const stadiumList = useSelector(getAllStadiumByUserSelector);
  const loading = useSelector(getEventLoadingtSelector);

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [stadiums, setStadiums] = useState("");

  useEffect(() => {
    if (latitude && longitude) {
      const formData = {
        long: longitude,
        lat: latitude,
      };
      dispatch(getAllStadiumByUser(formData));
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (stadiumList) setStadiums(stadiumList);
  }, [stadiumList]);

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

  return (
    <SafeAreaView style={styles.container}>
      <YardItem
        data={stadiums}
        latitude={latitude}
        longitude={longitude}
        loading={loading}
      />
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
