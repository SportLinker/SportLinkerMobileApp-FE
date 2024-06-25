import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllYardSelector } from "../../../redux/selectors";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";
import ListAllYardItem from "./ListAllYardItem";
import FilterOptionList from "../ListYardScreen/FilterOption";

const ListAllYardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const yardList = useSelector(getAllYardSelector);

  const [filterOptions, setFilterOptions] = useState({ status: "all" });
  const [yards, setYards] = useState(null);

  // console.log("yards", yards);

  useEffect(() => {
    dispatch(getAllYardByOwner());
  }, [dispatch]);

  useEffect(() => {
    if (yardList) setYards(yardList);
  }, [yardList]);

  // Filter data based on filter options
  // const filteredData = yards.filter((item) => {
  //   if (filterOptions.status === "all") return true;
  //   return item.status === filterOptions.status;
  // });

  return (
    <SafeAreaView style={styles.container}>
      <FilterOptionList setFilterOptions={setFilterOptions} />
      <ScrollView style={{ height: "90%" }}>
        <ListAllYardItem data={yards} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListAllYardScreen;

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
