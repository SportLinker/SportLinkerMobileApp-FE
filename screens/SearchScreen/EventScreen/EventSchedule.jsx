import { ScrollView, View } from "react-native";
import FilterEventOptionList from "./FilterEventOptionList";
import EventScheduleTable from "./EventScheduleTable";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import { getEventList } from "../../../redux/slices/eventSlice";
import { DEFAULT_DISTACNCE } from "../../../utils/constant";

const EventSchedule = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    console.log("call api get event list");
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
        console.log("latitude: ", location.coords.longitude);
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setAddress(userLocation);
      }
    })().then((res) => {
      console.log("Get location done!");
      const formData = {
        long: address.longitude,
        lat: address.latitude,
        distance: DEFAULT_DISTACNCE,
        start_time: 0,
        end_time: 23,
        sport_name: "Bóng đá",
      };
      dispatch(getEventList(formData));
    });
  }, []);
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ height: "10%" }}>
        <FilterEventOptionList />
      </View>
      <View style={{ height: "90%" }}>
        <EventScheduleTable />
      </View>
    </View>
  );
};

export default EventSchedule;
