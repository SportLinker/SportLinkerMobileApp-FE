import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { convertHttpToHttps } from "../../../../../utils";

const Step3 = ({
  stadiumData,
  setStadiumData,
  handleSelectImage,
  previousStep,
  handleCreateStadium,
  stadiumId,
}) => {
  //   const validateStep3 = () => {
  //     if (stadiumData.stadium_thumnail) {
  //       handleCreateStadium();
  //     } else {
  //       alert("Please upload an image of the stadium.");
  //     }
  //   };
  return (
    <View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={previousStep} style={styles.buttonContainer}>
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>Quay lại</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreateStadium}
          style={styles.buttonContainer}
        >
          <View style={styles.button}>
            <Text style={styles.buttonLabel}>
              {stadiumId ? "Cập Nhật Sân" : "Tạo Sân"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleSelectImage}
        style={styles.uploadContainer}
      >
        {stadiumData.stadium_thumnail ? (
          <Image
            source={{ uri: convertHttpToHttps(stadiumData.stadium_thumnail) }}
            style={styles.thumbnail}
          />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Icon name="upload" size={40} color="#888" />
            <Text style={styles.uploadText}>Tải ảnh lên</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    borderColor: "#888",
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadPlaceholder: {
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  uploadText: {
    marginTop: 8,
    color: "#888",
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginBottom: 12,
    backgroundColor: "#1646a9",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Step3;
