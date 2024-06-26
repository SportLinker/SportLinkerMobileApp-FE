import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllYardSelector,
  getLoadingSelector,
} from "../../../redux/selectors";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";
import ListAllYardItem from "./ListAllYardItem";
import FilterOptionList from "../ListYardScreen/FilterOption";
import { Button } from "react-native-paper";
import NoYard from "./NoYard/NoYard";

const ListAllYardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const yardList = useSelector(getAllYardSelector);
  const loading = useSelector(getLoadingSelector);

  const [filterOptions, setFilterOptions] = useState({ yardName: "all" });
  const [yards, setYards] = useState([]);

  useEffect(() => {
    dispatch(getAllYardByOwner());
  }, [dispatch]);

  useEffect(() => {
    if (yardList) setYards(yardList);
  }, [yardList]);

  const filteredData =
    filterOptions.yardName === "all"
      ? yards
      : yards.filter((item) => item.yard_name === filterOptions.yardName);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <ScrollView style={{ height: "90%" }}>
            {filteredData.length > 0 ? (
              <>
                <FilterOptionList
                  setFilterOptions={setFilterOptions}
                  yards={yards}
                />
                <ListAllYardItem data={filteredData} />
              </>
            ) : (
              <NoYard />
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default ListAllYardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1646a9",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
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
