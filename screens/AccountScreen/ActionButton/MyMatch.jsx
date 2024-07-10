import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import eventSlice, { getMyEventList } from "../../../redux/slices/eventSlice";
import * as Location from "expo-location";
import {
  getEventLoadingtSelector,
  getMyEventListSelector,
  getUserSelector,
} from "../../../redux/selectors";
import EventScheduleTable from "../../SearchScreen/EventScreen/EventScheduleTable";
import userSlice from "../../../redux/slices/userSlice";

const MyMatch = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserSelector);
  const myEventList = useSelector(getMyEventListSelector);
  const eventLoadingtSelector = useSelector(getEventLoadingtSelector);

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const getMyEventListAPI = (formData) => {
    dispatch(getMyEventList(formData));
  };

  useEffect(() => {
    console.log("render my match");

    try {
      if (!userInfo?.longitude || !userInfo?.latitude) {
        console.log("get location permission");
        const getLocationPermission = async () => {
          dispatch(eventSlice.actions.setLoading(true));
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
            dispatch(
              userSlice.actions.setUserLocation({
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              })
            );
            const userLocation = {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            if (userLocation) {
              setAddress(userLocation);
              const formData = {
                long: location.coords.longitude,
                lat: location.coords.latitude,
              };
              getMyEventListAPI(formData);
            }
          }
        };

        dispatch(eventSlice.actions.setLoading(false));

        getLocationPermission();
      } else {
        //if user location exist in redux
        const formData = {
          long: userInfo.longitude,
          lat: userInfo.latitude,
        };
        getMyEventListAPI(formData);
      }
    } catch (error) {
      console.log("Error fetch my match: " + error);
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <EventScheduleTable
        loading={eventLoadingtSelector}
        eventListData={myEventList}
      />
    </View>
  );
};

export default MyMatch;
