import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Platform,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ListYardItem from "./ListYardItem";
import FilterOptionList from "./FilterOption";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { listYardData } from "../../../utils/constant";

const ListYardScreen = () => {
  const [filterOptions, setFilterOptions] = useState({ status: "all" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newYard, setNewYard] = useState({
    image: "",
    yardName: "",
    description: "",
    address: "",
    openTime: "",
    phoneNumber: "",
    price: "",
    status: "active", // Default status
  });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // Helper function to validate phone number
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^0[0-9]{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Function to go to the next step
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to go to the previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Filter data based on filter options
  const filteredData = listYardData.filter((item) => {
    if (filterOptions.status === "all") return true;
    return item.status === filterOptions.status;
  });

  // Function to handle adding a new yard
  const handleAddNewYard = () => {
    setIsModalVisible(true);
    setCurrentStep(1); // Reset current step when opening modal
  };

  // Function to handle saving a new yard
  const handleSaveNewYard = () => {
    if (!isValidPhoneNumber(newYard.phoneNumber)) {
      alert("Số điện thoại không hợp lệ!");
      return;
    }

    listYardData.push({ ...newYard, id: listYardData.length + 1 });
    // console.log(listYardData);
    setIsModalVisible(false);
    setNewYard({
      image: "",
      yardName: "",
      description: "",
      address: "",
      openTime: "",
      phoneNumber: "",
      price: "",
      status: "active", // Reset default status
    });
  };

  // Function to pick an image from the library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewYard({ ...newYard, image: result.assets[0].uri });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FilterOptionList setFilterOptions={setFilterOptions} />
      <ScrollView style={{ height: "90%" }}>
        <ListYardItem data={filteredData} />
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={handleAddNewYard}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              {currentStep === 1 && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Tên Sân"
                    value={newYard.yardName}
                    onChangeText={(text) =>
                      setNewYard({ ...newYard, yardName: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Giới thiệu"
                    value={newYard.description}
                    onChangeText={(text) =>
                      setNewYard({ ...newYard, description: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Giờ mở cửa"
                    value={newYard.openTime}
                    onChangeText={(text) =>
                      setNewYard({ ...newYard, openTime: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Số điện thoại liên hệ"
                    value={newYard.phoneNumber}
                    keyboardType="number-pad"
                    onChangeText={(text) =>
                      setNewYard({ ...newYard, phoneNumber: text })
                    }
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Giá Thuê"
                    value={newYard.price}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setNewYard({ ...newYard, price: text })
                    }
                  />
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Thoát"
                      onPress={() => setIsModalVisible(false)}
                    />
                    <Button title="Tiếp tục" onPress={goToNextStep} />
                  </View>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Địa Chỉ"
                    value={newYard.address}
                    onChangeText={(text) =>
                      setNewYard({ ...newYard, address: text })
                    }
                  />
                  <View style={styles.buttonContainer}>
                    <Button title="Quay lại" onPress={goToPreviousStep} />
                    <Button title="Tiếp tục" onPress={goToNextStep} />
                  </View>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.imagePickerButton}
                  >
                    <Text style={styles.imagePickerButtonText}>Chọn Ảnh</Text>
                  </TouchableOpacity>
                  {newYard.image && (
                    <Image
                      source={{ uri: newYard.image }}
                      style={styles.pickedImage}
                    />
                  )}
                  <View style={styles.buttonContainer}>
                    <Button title="Quay lại" onPress={goToPreviousStep} />
                    <Button title="Hoàn thành" onPress={handleSaveNewYard} />
                  </View>
                </>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default ListYardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  locationWrapper: {
    marginVertical: 20,
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "black",
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#03A9F4",
    borderRadius: 30,
    elevation: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%", // Đã thay đổi từ "80%" thành "90%"
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Align buttons to the sides
    width: "100%",
    marginTop: 10, // Add some margin between the buttons and other inputs
  },
  imagePickerButton: {
    backgroundColor: "#4878d9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerButtonText: {
    color: "#fff",
  },
  pickedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
