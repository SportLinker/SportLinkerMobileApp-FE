import { ScrollView, View } from "react-native";
import FilterEventOptionList from "./FilterEventOptionList";
import EventScheduleTable from "./EventScheduleTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import eventSlice, { getEventList } from "../../../redux/slices/eventSlice";
import { DEFAULT_DISTACNCE, sports } from "../../../utils/constant";
import {
  getEventListSelector,
  getEventLoadingtSelector,
} from "../../../redux/selectors";
import userSlice from "../../../redux/slices/userSlice";

const EventSchedule = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sportFilter, setSportFilter] = useState(sports);
  const [filterOptions, setFilterOptions] = useState({
    distance: DEFAULT_DISTACNCE,
    start_time: 0,
    end_time: 23,
    sport_name: "",
  });

  const eventListSelecter = useSelector(getEventListSelector);
  const eventLoadingtSelector = useSelector(getEventLoadingtSelector);

  const getEventListAPI = () => {
    try {
      const formData = {
        long: address.longitude,
        lat: address.latitude,
        ...filterOptions,
      };
      dispatch(getEventList(formData));
    } catch (error) {
      console.log(error);
    }
  };

  //get a string which match name of sport items together
  const getStringSportName = (sportArrObj) => {
    let sportNameString = "";
    const sportNameArr = sportArrObj.map((sport) => {
      if (sportNameString == "") {
        sportNameString = sportNameString + sport.sport_name;
      } else {
        //if have sport name before will add ',' after
        sportNameString = sportNameString + "," + sport.sport_name;
      }
    });
    console.log("sportNameString", sportNameString);
    return sportNameString;
  };

  useEffect(() => {
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
        }
      }
    };
    dispatch(eventSlice.actions.setLoading(false));

    getLocationPermission();
  }, []);

  useEffect(() => {
    let newSportName = "";
    if (sportFilter.length != sports.length && sportFilter.length > 0) {
      newSportName = getStringSportName(sportFilter);
    }
    setFilterOptions({ ...filterOptions, sport_name: newSportName });
  }, [sportFilter]);

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
  }, [address, filterOptions]);
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ height: "10%" }}>
        <FilterEventOptionList
          filterOptions={filterOptions}
          setSportFilter={setSportFilter}
          sportFilter={sportFilter}
          setFilterOptions={setFilterOptions}
        />
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
