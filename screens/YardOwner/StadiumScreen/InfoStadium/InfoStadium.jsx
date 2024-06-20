import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailByOwnerSelector,
  getUserSelector,
} from "../../../../redux/selectors";
import { getDetailStadiumById } from "../../../../redux/slices/yardSlice";
import { ActionButtons } from "./Section/ActionButtons ";
import { DetailsSection } from "./Section/DetailsSection";
import HeaderSection from "./Section/HeaderSection";
import IntroductionSection from "./Section/IntroductionSection";

const InfoStadium = ({ route }) => {
  const { stadiumId } = route.params;
  const dispatch = useDispatch();

  const [stadiumDetail, setStadiumDetail] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  const stadium = useSelector(getDetailByOwnerSelector);
  const user = useSelector(getUserSelector);

  // console.log("user in stadium", userAvatar);

  useEffect(() => {
    dispatch(getDetailStadiumById(stadiumId));
  }, [dispatch, stadiumId]);

  useEffect(() => {
    if (stadium) {
      setStadiumDetail(stadium);
      setUserAvatar(user.avatar_url);
    }
  }, [stadium, user]);

  if (!stadiumDetail) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <HeaderSection userAvatar={userAvatar} stadiumDetail={stadiumDetail} />
      <ActionButtons stadiumId={stadiumId} />
      <IntroductionSection stadiumDetail={stadiumDetail} />
      <DetailsSection stadiumDetail={stadiumDetail} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#6200ee",
  },
});

export default InfoStadium;
