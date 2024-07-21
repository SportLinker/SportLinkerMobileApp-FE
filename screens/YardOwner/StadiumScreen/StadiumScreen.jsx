import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getByOwnerSelector,
  getLoadingSelector,
} from "../../../redux/selectors";
import { getStadiumByOwner } from "../../../redux/slices/yardSlice";
import NoStadiumScreen from "./InfoStadium/NoStadiumScreen";
import StadiumList from "./StadiumList/StadiumList";
import Loading from "../../../component/Loading";

const StadiumScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const stadium = useSelector(getByOwnerSelector);
  const loading = useSelector(getLoadingSelector);

  const [stadiumList, setStadiumList] = useState([]);

  useEffect(() => {
    dispatch(getStadiumByOwner());
  }, [dispatch]);

  useEffect(() => {
    if (stadium) {
      setStadiumList(stadium);
    }
  }, [stadium]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading visible={loading} />
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
