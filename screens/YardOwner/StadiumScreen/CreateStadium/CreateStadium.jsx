import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";

const fetchLocationData = async (query, setIsLoading, setLocations) => {
  setIsLoading(true);
  const data = JSON.stringify({ q: query, hl: "vi", gl: "vn" });

  const config = {
    method: "post",
    url: "https://google.serper.dev/places",
    headers: {
      "X-API-KEY": "775483d107560624b1292bfb388a5101fcd13e8b",
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    setLocations(response.data.places || []);
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error message:", error.message);
    }
  } finally {
    setIsLoading(false);
  }
};

const CreateStadium = () => {
  const navigation = useNavigation();

  const [stadiumData, setStadiumData] = useState({
    stadium_name: "",
    stadium_address: "",
    stadium_thumbnail: null,
    stadium_lat: "",
    stadium_long: "",
    stadium_time: "",
    stadium_description: "",
  });

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setStadiumData({
          ...stadiumData,
          stadium_thumbnail: result.assets[0].uri,
        });
      } else {
        console.log("Image uri not found in result:", result);
      }
    } else {
      console.log("Image selection canceled");
    }
  };

  const handleCreateStadium = () => {
    console.log(stadiumData);
    navigation.goBack();
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentStep === 1 && (
        <Step1
          stadiumData={stadiumData}
          setStadiumData={setStadiumData}
          nextStep={nextStep}
        />
      )}
      {currentStep === 2 && (
        <Step2
          stadiumData={stadiumData}
          setStadiumData={setStadiumData}
          locations={locations}
          setLocations={setLocations}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          nextStep={nextStep}
          previousStep={previousStep}
          fetchLocationData={fetchLocationData}
        />
      )}
      {currentStep === 3 && (
        <Step3
          stadiumData={stadiumData}
          setStadiumData={setStadiumData}
          handleSelectImage={handleSelectImage}
          previousStep={previousStep}
          handleCreateStadium={handleCreateStadium}
        />
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
});

export default CreateStadium;
