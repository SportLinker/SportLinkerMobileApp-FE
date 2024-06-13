import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView } from "react-native";

import { DetailsSection } from "./Section/DetailsSection";
import HeaderSection from "./Section/HeaderSection";
import IntroductionSection from "./Section/IntroductionSection";

const InfoYard = ({ route }) => {
  const { yardName, yardDescription, yardPrice, openDay, openTime, yardImage } =
    route.params;
  const [image, setImage] = useState(
    "https://i.pinimg.com/236x/71/db/24/71db24f6798f1a208b7fe8a503365458.jpg"
  );

  // console.log("yardName", yardName);
  // console.log("yardDescription", yardDescription);
  // console.log("yardPrice", yardPrice);
  // console.log("openDay", openDay);
  // console.log("openTime", openTime);
  // console.log("yardImage", yardImage);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <HeaderSection image={image} yardName={yardName} yardImage={yardImage} />
      <IntroductionSection yardDescription={yardDescription} />
      <DetailsSection
        yardPrice={yardPrice}
        openDay={openDay}
        openTime={openTime}
      />
    </ScrollView>
  );
};

export default InfoYard;
