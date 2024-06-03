import { ScrollView, View } from "react-native";
import FilterEventOptionList from "./FilterEventOptionList";
import EventScheduleTable from "./EventScheduleTable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEventList } from "../../../redux/slices/eventSlice";

const EventSchedule = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("call api get event list");
    dispatch(getEventList());
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
