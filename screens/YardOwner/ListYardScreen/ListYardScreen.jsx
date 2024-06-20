import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { listYardData } from "../../../utils/constant";
import FilterOptionList from "./FilterOption";
import ListYardItem from "./ListYardItem";

const ListYardScreen = ({ navigation }) => {
  const [filterOptions, setFilterOptions] = useState({ status: "all" });

  // Filter data based on filter options
  const filteredData = listYardData.filter((item) => {
    if (filterOptions.status === "all") return true;
    return item.status === filterOptions.status;
  });

  return (
    <SafeAreaView style={styles.container}>
      <FilterOptionList setFilterOptions={setFilterOptions} />
      <ScrollView style={{ height: "90%" }}>
        <ListYardItem data={filteredData} />
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateYard")}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ListYardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
});
