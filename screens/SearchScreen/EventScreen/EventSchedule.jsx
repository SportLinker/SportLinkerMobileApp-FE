import { ScrollView, View } from "react-native";
import FilterEventOptionList from "./FilterEventOptionList";
import EventScheduleTable from "./EventScheduleTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { getEventList } from "../../../redux/slices/eventSlice";
import { DEFAULT_DISTACNCE } from "../../../utils/constant";
import {
  getEventListSelector,
  getEventLoadingtSelector,
} from "../../../redux/selectors";

const EventSchedule = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const eventListSelecter = useSelector(getEventListSelector);
  const eventLoadingtSelector = useSelector(getEventLoadingtSelector);

  const getEventListAPI = () => {
    try {
      const formData = {
        long: address.longitude,
        lat: address.latitude,
        distance: DEFAULT_DISTACNCE,
        start_time: 0,
        end_time: 23,
        sport_name: "",
      };
      dispatch(getEventList(formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("get permission");
    const getLocationPermission = async () => {
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
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        if (userLocation) {
          setAddress(userLocation);
        }
      }
    };
    getLocationPermission();
  }, []);

  useEffect(() => {
    // Set a timeout to execute the logic after 500 milliseconds
    const getListTimeOut = setTimeout(() => {
      if (address != null) {
        console.log("adress updated");
        console.log("address: ", address);
        getEventListAPI();
      }
    }, 500);

    return () => clearTimeout(getListTimeOut);
  }, [address]);
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ height: "10%" }}>
        <FilterEventOptionList />
      </View>
      <View style={{ height: "90%" }}>
        <EventScheduleTable
          loading={eventLoadingtSelector}
          eventListData={eventListSelecter}
        />
      </View>
    </View>
  );
};

export default EventSchedule;
