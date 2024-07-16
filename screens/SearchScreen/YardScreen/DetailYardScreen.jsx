import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import RatingModal from "./RatingModal";
import HeaderSection from "./Section/HeaderSection";
import { ActionButtons } from "./Section/ActionButtons ";
import { IntroductionSection } from "./Section/IntroductionSection";
import { DetailsSection } from "./Section/DetailsSection";

const DetailYardScreen = ({ route }) => {
  const { stadium, latitude, longitude } = route?.params;
  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );
  const [liked, setLiked] = useState("");
  const [stadiumOwner, setStadiumOwner] = useState(stadium.owner);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const rating = 3.5;

  console.log("stadium", stadium);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <HeaderSection
        image={image}
        rating={rating}
        stadium={stadium}
        stadiumOwner={stadiumOwner}
      />
      <ActionButtons
        setModalVisible={setModalVisible}
        liked={liked}
        setLiked={setLiked}
        stadium={stadium}
      />
      <IntroductionSection stadium={stadium} />
      <DetailsSection rating={rating} stadium={stadium} />
      <RatingModal
        stadium={stadium}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        longitude={longitude}
        latitude={latitude}
      />
    </ScrollView>
  );
};

export default DetailYardScreen;
