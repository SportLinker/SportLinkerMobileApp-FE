import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "react-native-paper";
import {
  createStadium,
  updateStadium,
  getStadiumByOwner,
  getDetailStadiumById,
} from "../../../../redux/slices/yardSlice";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import Step3 from "./Step/Step3";
import { uploadImageToCloudinary } from "../../../../services/cloudinary";

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

const CreateStadium = ({ route }) => {
  const { stadiumId, stadiumDetail = {} } = route.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [stadiumData, setStadiumData] = useState({
    stadium_name: stadiumDetail.stadium_name || "",
    stadium_address: stadiumDetail.stadium_address || "",
    stadium_thumnail: stadiumDetail.stadium_thumnail || "",
    stadium_lat: stadiumDetail.stadium_lat || "",
    stadium_long: stadiumDetail.stadium_long || "",
    stadium_time: stadiumDetail.stadium_time,
    stadium_description: stadiumDetail.stadium_description || "",
  });

  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSelectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const { uri, type, fileName } = result.assets[0];
        console.log("Selected image:", result.assets[0]);

        // Upload image to Cloudinary
        uploadImageToCloudinary(uri, type, fileName).then((response) => {
          // after get a link from cloudinary then update url link for server
          console.log("response image ", response);

          // Update stadiumData with the Cloudinary URL
          setStadiumData({
            ...stadiumData,
            stadium_thumnail: response.url,
          });
        });
      } else {
        console.log("Image selection canceled");
      }
    } catch (error) {
      console.error("Error selecting/uploading image:", error);
      // Handle error as needed (e.g., show an alert)
    }
  };

  const handleCreateStadium = async () => {
    try {
      const {
        stadium_name,
        stadium_address,
        stadium_thumnail,
        stadium_time,
        stadium_description,
      } = stadiumData;

      const stadiumUpdate = {
        stadium_name: stadium_name,
        stadium_address: stadium_address,
        stadium_thumnail: stadium_thumnail,
        stadium_time: stadium_time,
        stadium_description: stadium_description,
      };
      setIsLoading(true);

      if (stadiumId) {
        const response = await dispatch(
          updateStadium({ stadium_id: stadiumId, stadiumData: stadiumUpdate })
        );

        if (response.payload && response.payload.code === 200) {
          Alert.alert("Thành công", "Sân đã cập nhật thành công!");
        } else {
          Alert.alert("Thất bại", "Cập nhật sân thất bại!");
        }
        navigation.goBack();
      } else {
        const response = await dispatch(createStadium(stadiumData));
        const { code } = response.payload;

        if (code === 200 || code === 201) {
          Alert.alert("Thành công", "Sân đã được tạo mới thành công!");
        } else if (code === 400) {
          Alert.alert("Thất bại", "Sân đã tồn tại ở cùng vị trí.");
        } else if (code === 500) {
          Alert.alert("Thất bại", "Hệ thống đang bảo trì!");
        } else {
          Alert.alert("Thất bại", "Đã xảy ra lỗi!");
        }
        navigation.goBack();
      }

      await dispatch(getDetailStadiumById(stadiumId));
      await dispatch(getStadiumByOwner());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to create/update stadium:", error);
      Alert.alert("Thất bại", "Đã xảy ra lỗi khi tạo/cập nhật sân.");
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 1 && stadiumId) {
        return 3; // Skip to step 3 if stadiumId is present
      }
      return prevStep + 1;
    });
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === 3 && stadiumId) {
        return 1; // Skip to step 3 if stadiumId is present
      }
      return prevStep - 1;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {stadiumId ? (
        <Text
          style={{
            marginHorizontal: "auto",
            fontWeight: "bold",
            fontSize: 25,
            marginVertical: 10,
          }}
        >
          Cập Nhật Sân Của Bạn
        </Text>
      ) : (
        <Text
          style={{
            marginHorizontal: "auto",
            fontWeight: "bold",
            fontSize: 25,
            marginVertical: 10,
          }}
        >
          Tạo Sân Của Bạn
        </Text>
      )}

      {currentStep === 1 && (
        <Step1
          stadiumData={stadiumData}
          setStadiumData={setStadiumData}
          nextStep={nextStep}
        />
      )}
      {currentStep === 2 && !stadiumId && (
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
          stadiumId={stadiumId}
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
