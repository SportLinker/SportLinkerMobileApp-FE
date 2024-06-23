import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";

import { DetailsSection } from "./Section/DetailsSection";
import HeaderSection from "./Section/HeaderSection";
import IntroductionSection from "./Section/IntroductionSection";
import { useDispatch, useSelector } from "react-redux";
import { getDetailYardByOwner } from "../../../../redux/slices/yardSlice";
import {
  getDetailYardByOwnerSelector,
  getLoadingSelector,
  getUserSelector,
} from "../../../../redux/selectors";
import { ActionButtons } from "./Section/ActionButtons ";

const InfoYard = ({ route }) => {
  const { yardId } = route.params;
  const dispatch = useDispatch();
  const yard = useSelector(getDetailYardByOwnerSelector);
  const user = useSelector(getUserSelector);
  const loading = useSelector(getLoadingSelector);

  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );
  const [yardDetail, setYardDetail] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  // console.log("yardDetail", yardDetail);

  useEffect(() => {
    dispatch(getDetailYardByOwner(yardId));
  }, [dispatch, yardId]);

  useEffect(() => {
    if (yard) {
      setYardDetail(yard);
      setUserAvatar(user.avatar_url);
    }
  }, [yard]);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <HeaderSection image={userAvatar} yardDetail={yardDetail} />
          <ActionButtons yardDetail={yardDetail} />
          <IntroductionSection yardDetail={yardDetail} />
          <DetailsSection yardDetail={yardDetail} />
        </>
      )}
    </ScrollView>
  );
};

export default InfoYard;
