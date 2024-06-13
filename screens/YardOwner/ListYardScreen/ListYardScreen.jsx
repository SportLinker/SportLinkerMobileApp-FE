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

const fake_data = [
  {
    id: 1,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN 1",
    openTime: "7h00 - 22h00",
    openDay: "T2 đến CN mỗi tuần",
    status: "active",
  },
  {
    id: 2,
    image: "https://ipsc.edu.vn/uploads/news/2020_07/hoi-boi-dhqg-hcm-3a.jpg",
    yardName: "SÂN 2",
    openTime: "6h00 - 21h00",
    openDay: "T2 đến T7",
    status: "inactive",
  },
  {
    id: 3,
    image:
      "https://yousport.vn/Media/Blog/san-bong-ro-tp-hcm/san-bong-ro-hcm-17.jpg",
    yardName: "SÂN 3",
    openTime: "5h30 - 23h00",
    openDay: "Cả tuần",
    status: "active",
  },
  {
    id: 4,
    image:
      "https://tinyfilms.vn/wp-content/uploads/2018/08/TinyFilms_L%E1%BB%85-khai-tr%C6%B0%C6%A1ng-s%C3%A2n-tennis-Ho%C3%A0ng-Gia.jpg",
    yardName: "SÂN 4",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
    status: "inactive",
  },
  {
    id: 5,
    image: "https://ts.huit.edu.vn/tttstt/images/tin-tuc/rlsk9.jpg",
    yardName: "SÂN 5",
    openTime: "7h00 - 20h00",
    openDay: "T2 đến T6",
    status: "active",
  },
  {
    id: 6,
    image: "https://sieuthicaulong.vn/userfiles/files/san-cau-long-mega.jpg",
    yardName: "SÂN 6",
    openTime: "6h30 - 21h30",
    openDay: "T2 đến CN",
    status: "inactive",
  },
  {
    id: 7,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN 7",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
    status: "active",
  },
  {
    id: 8,
    image:
      "https://sport360.vn/wp-content/uploads/2019/08/Kich-thuoc-san-bong-chuyen-hoi-tieu-chuan-sport360vn-4.jpg",
    yardName: "SÂN 8",
    openTime: "6h00 - 21h00",
    openDay: "Cả tuần",
    status: "inactive",
  },
  {
    id: 9,
    image:
      "https://www.myuc.vn/uploads/products/2019/01/28/pvcredcolortabletennisfloor.jpg",
    yardName: "SÂN 9",
    openTime: "6h00 - 23h00",
    openDay: "T2 đến CN",
    status: "active",
  },
  {
    id: 10,
    image:
      "https://sport360.vn/wp-content/uploads/2019/08/Kich-thuoc-san-bong-chuyen-hoi-tieu-chuan-sport360vn-4.jpg",
    yardName: "SÂN 10",
    openTime: "5h00 - 22h00",
    openDay: "Cả tuần",
    status: "inactive",
  },
  {
    id: 11,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN 11",
    openTime: "6h00 - 21h00",
    openDay: "T2 đến T7",
    status: "active",
  },
  {
    id: 12,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN 12",
    openTime: "7h00 - 22h00",
    openDay: "T2 đến CN mỗi tuần",
    status: "inactive",
  },
  {
    id: 13,
    image: "https://ipsc.edu.vn/uploads/news/2020_07/hoi-boi-dhqg-hcm-3a.jpg",
    yardName: "SÂN 13",
    openTime: "6h00 - 21h00",
    openDay: "T2 đến T7",
    status: "active",
  },
  {
    id: 14,
    image:
      "https://yousport.vn/Media/Blog/san-bong-ro-tp-hcm/san-bong-ro-hcm-17.jpg",
    yardName: "SÂN 14",
    openTime: "5h30 - 23h00",
    openDay: "Cả tuần",
    status: "inactive",
  },
  {
    id: 15,
    image:
      "https://tinyfilms.vn/wp-content/uploads/2018/08/TinyFilms_L%E1%BB%85-khai-tr%C6%B0%C6%A1ng-s%C3%A2n-tennis-Ho%C3%A0ng-Gia.jpg",
    yardName: "SÂN 15",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
    status: "active",
  },
  {
    id: 16,
    image: "https://ts.huit.edu.vn/tttstt/images/tin-tuc/rlsk9.jpg",
    yardName: "SÂN 16",
    openTime: "7h00 - 20h00",
    openDay: "T2 đến T6",
    status: "inactive",
  },
  {
    id: 17,
    image: "https://sieuthicaulong.vn/userfiles/files/san-cau-long-mega.jpg",
    yardName: "SÂN 17",
    openTime: "6h30 - 21h30",
    openDay: "T2 đến CN",
    status: "active",
  },
  {
    id: 18,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN 18",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
    status: "inactive",
  },
  {
    id: 19,
    image:
      "https://sport360.vn/wp-content/uploads/2019/08/Kich-thuoc-san-bong-chuyen-hoi-tieu-chuan-sport360vn-4.jpg",
    yardName: "SÂN 19",
    openTime: "6h00 - 21h00",
    openDay: "Cả tuần",
    status: "active",
  },
  {
    id: 20,
    image:
      "https://www.myuc.vn/uploads/products/2019/01/28/pvcredcolortabletennisfloor.jpg",
    yardName: "SÂN 20",
    openTime: "6h00 - 23h00",
    openDay: "T2 đến CN",
    status: "inactive",
  },
];

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
  const filteredData = fake_data.filter((item) => {
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

    fake_data.push({ ...newYard, id: fake_data.length + 1 });
    console.log(fake_data); // Log the updated fake_data array
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
