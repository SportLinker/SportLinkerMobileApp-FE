import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import RatingModal from "./RatingModal";
import HeaderSection from "./Section/HeaderSection";
import { ActionButtons } from "./Section/ActionButtons ";
import { IntroductionSection } from "./Section/IntroductionSection";
import { DetailsSection } from "./Section/DetailsSection";

const DetailYardScreen = () => {
  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );
  const [liked, setLiked] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const rating = 3.5;

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <HeaderSection image={image} rating={rating} />
      <ActionButtons
        setModalVisible={setModalVisible}
        liked={liked}
        setLiked={setLiked}
      />
      <IntroductionSection />
      <DetailsSection rating={rating} />
      <RatingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

export default DetailYardScreen;
