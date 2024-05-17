import { ScrollView, View } from "react-native";
import FilterEventOptionList from "./FilterEventOptionList";
import EventScheduleTable from "./EventScheduleTable";

const EventSchedule = () => {
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
