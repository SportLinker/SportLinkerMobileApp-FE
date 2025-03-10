import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllYardByOwnerSelector } from "../../../redux/selectors";
import { getAllYardByYardOwner } from "../../../redux/slices/yardSlice";
import ListYardItem from "./ListYardItem";

const ListYardScreen = ({ navigation, route }) => {
  const { stadiumId } = route?.params;
  const dispatch = useDispatch();
  const yardList = useSelector(getAllYardByOwnerSelector);

  const [yards, setYards] = useState(null);

  useEffect(() => {
    dispatch(getAllYardByYardOwner({ stadium_id: stadiumId }));
  }, [dispatch]);

  useEffect(() => {
    if (yardList) setYards(yardList);
  }, [yardList]);

  const filteredYard = yards?.filter((yard) => yard.yard_status === "avaiable");

  return (
    <SafeAreaView style={styles.container}>
      <ListYardItem data={filteredYard} stadiumId={stadiumId} />
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
