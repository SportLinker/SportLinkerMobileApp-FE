import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getByOwner, getLoading } from "../../../redux/selectors";
import { getStadiumByOwner } from "../../../redux/slices/bookingSlice";
import NoStadiumScreen from "./InfoStadium/NoStadiumScreen";
import StadiumList from "./StadiumList/StadiumList";
import { FAB } from "react-native-paper";

const StadiumScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stadium = useSelector(getByOwner);
  const loading = useSelector(getLoading);

  const [stadiumList, setStadiumList] = useState([]);

  console.log("stadiumList", stadiumList);

  useEffect(() => {
    dispatch(getStadiumByOwner());
  }, [dispatch]);

  useEffect(() => {
    if (stadium) {
      setStadiumList(stadium);
    }
  }, [stadium]);

  const handleAddStadium = () => {
    // Navigate to the screen for adding a new stadium
    navigation.navigate("Create");
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      ) : stadiumList && stadiumList.length > 0 ? (
        <StadiumList stadiumList={stadiumList} />
      ) : (
        <NoStadiumScreen />
      )}
    </SafeAreaView>
  );
};

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
    marginTop: 12,
    backgroundColor: "#6200ee",
  },
  buttonLabel: {
    color: "#ffffff",
  },
});

export default StadiumScreen;
