import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  getDetailYardByOwnerSelector,
  getLoadingSelector,
  getUserSelector,
} from "../../../../redux/selectors";
import { getDetailYardByOwner } from "../../../../redux/slices/yardSlice";
import { ActionButtons } from "./Section/ActionButtons ";
import { DetailsSection } from "./Section/DetailsSection";
import HeaderSection from "./Section/HeaderSection";
import IntroductionSection from "./Section/IntroductionSection";
import Loading from "../../../../component/Loading";

const InfoYard = ({ route }) => {
  const { yardId } = route.params;
  const dispatch = useDispatch();
  const yard = useSelector(getDetailYardByOwnerSelector);
  const user = useSelector(getUserSelector);
  const loading = useSelector(getLoadingSelector);

  const [yardDetail, setYardDetail] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

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
        <Loading visible={loading} />
      ) : (
        <>
          <HeaderSection image={userAvatar} yardDetail={yardDetail} />
          <ActionButtons yardDetail={yardDetail} yardId={yardId} />
          <IntroductionSection yardDetail={yardDetail} />
          <DetailsSection yardDetail={yardDetail} />
        </>
      )}
    </ScrollView>
  );
};

export default InfoYard;
