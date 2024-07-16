import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import RatingModal from "./RatingModal";
import HeaderSection from "./Section/HeaderSection";
import { ActionButtons } from "./Section/ActionButtons ";
import { IntroductionSection } from "./Section/IntroductionSection";
import { DetailsSection } from "./Section/DetailsSection";
import { useDispatch, useSelector } from "react-redux";
import { getStadiumDetailByUserSelector } from "../../../redux/selectors";
import { getDetailStadiumByUser } from "../../../redux/slices/yardSlice";

const DetailYardScreen = ({ route }) => {
  const { stadium, latitude, longitude } = route?.params;

  const dispatch = useDispatch();
  const stadiumDetailById = useSelector(getStadiumDetailByUserSelector);

  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );
  const [liked, setLiked] = useState("");
  const [stadiumOwner, setStadiumOwner] = useState(stadium.owner);
  const [modalVisible, setModalVisible] = useState(false);
  const [stadiumDetail, setStadiumDetail] = useState(false);

  console.log("stadiumDetail", stadiumDetail);

  useEffect(() => {
    dispatch(getDetailStadiumByUser(stadium.id));
  }, []);

  useEffect(() => {
    if (stadiumDetailById) {
      setStadiumDetail(stadiumDetailById);
    }
  }, [stadiumDetailById]);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <HeaderSection
        image={image}
        stadium={stadiumDetail}
        stadiumOwner={stadiumOwner}
      />
      <ActionButtons
        setModalVisible={setModalVisible}
        liked={liked}
        setLiked={setLiked}
        stadium={stadium}
      />
      <IntroductionSection stadium={stadiumDetail} />
      <DetailsSection stadium={stadiumDetail} />
      <RatingModal
        stadium={stadiumDetail}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        longitude={longitude}
        latitude={latitude}
      />
    </ScrollView>
  );
};

export default DetailYardScreen;
