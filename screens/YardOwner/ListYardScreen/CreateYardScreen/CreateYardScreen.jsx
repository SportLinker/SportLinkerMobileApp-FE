import { Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  createYardInStadium,
  getAllYardByOwner,
  getDetailYardByOwner,
  updateYard,
} from "../../../../redux/slices/yardSlice";
import SportSelectionPopup from "./SportSelectPopup";

const CreateYardScreen = ({ navigation, route }) => {
  const { stadiumId, yardId, yardDetail = {} } = route.params;
  const dispatch = useDispatch();
  const [showSportPicker, setShowSportPicker] = useState(false);

  // console.log("yardId in create yard", yardId);
  // console.log("yardDetail in create yard", yardDetail);

  const yardSchema = Yup.object().shape({
    yard_name: Yup.string().required("Vui lòng nhập tên sân"),
    yard_description: Yup.string().required("Vui lòng nhập mô tả"),
    yard_sport: Yup.string().required("Hãy chọn môn thể thao"),
    price_per_hour: Yup.string().required("Giá Thuê (ngàn VNĐ)/giờ"),
  });

  const handleSaveNewYard = async (values, { resetForm }) => {
    const yardData = {
      ...values,
      price_per_hour: parseFloat(values.price_per_hour),
    };

    try {
      if (yardId) {
        await dispatch(updateYard({ yard_id: yardId, yardData }));
        await dispatch(getDetailYardByOwner(yardId));
        await dispatch(getAllYardByOwner());
        Alert.alert("Thành công", "Cập nhật sân nhỏ thành công!");
      } else {
        await dispatch(
          createYardInStadium({ stadium_id: stadiumId, yardData })
        );
        Alert.alert("Thành công", "Tạo mới sân nhỏ thành công!");
      }
      resetForm();
      navigation.goBack(); // Go back to the previous screen
    } catch (error) {
      console.error("Error saving yard:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi lưu sân nhỏ. Vui lòng thử lại.");
    }
  };

  const handlePriceChange = (text, setFieldValue) => {
    if (text.endsWith("VNĐ/giờ")) {
      setFieldValue("price_per_hour", text);
    } else {
      setFieldValue("price_per_hour", `${text.replace(/\D/g, "")}VNĐ/giờ`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.container}>
        {yardId ? (
          <Text
            style={{
              marginHorizontal: "auto",
              fontWeight: "bold",
              fontSize: 25,
              marginVertical: 10,
            }}
          >
            Cập Nhật Sân Nhỏ Của Bạn
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
            Tạo Sân Nhỏ Của Bạn
          </Text>
        )}
        <Formik
          initialValues={{
            yard_name: yardDetail.yard_name || "Sân 1",
            yard_description: yardDetail.yard_description || "Sân 5 người",
            yard_sport: yardDetail.yard_sport || "",
            price_per_hour: yardDetail.price_per_hour
              ? String(yardDetail.price_per_hour)
              : "100000",
          }}
          validationSchema={yardSchema}
          onSubmit={handleSaveNewYard}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.form}>
              <TextInput
                label={"Tên Sân"}
                mode="outlined"
                style={styles.input}
                onChangeText={handleChange("yard_name")}
                onBlur={handleBlur("yard_name")}
                value={values.yard_name}
              />
              {errors.yard_name && touched.yard_name ? (
                <Text style={styles.errorText}>{errors.yard_name}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                label={"Giới thiệu"}
                mode="outlined"
                placeholder="Mô tả sân"
                onChangeText={handleChange("yard_description")}
                onBlur={handleBlur("yard_description")}
                value={values.yard_description}
              />
              {errors.yard_description && touched.yard_description ? (
                <Text style={styles.errorText}>{errors.yard_description}</Text>
              ) : null}

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowSportPicker(true)}
              >
                <View style={styles.justifyLeft}>
                  <Text style={styles.dateLabel}>Môn thể thao</Text>
                </View>
                <View style={styles.selectedSportContainer}>
                  {values.yard_sport ? (
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                      >
                        {values.yard_sport}
                      </Text>
                    </View>
                  ) : (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.placeholderText}>
                        Chọn môn thể thao
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              <SportSelectionPopup
                visible={showSportPicker}
                onClose={() => setShowSportPicker(false)}
                onSelectSport={(sport) => setFieldValue("yard_sport", sport)}
              />

              {errors.yard_sport && touched.yard_sport ? (
                <Text style={styles.errorText}>{errors.yard_sport}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                label={"Giá Thuê"}
                mode="outlined"
                placeholder="VNĐ/giờ"
                keyboardType="numeric"
                onChangeText={handleChange("price_per_hour")}
                onBlur={handleBlur("price_per_hour")}
                value={values.price_per_hour}
              />
              {errors.price_per_hour && touched.price_per_hour ? (
                <Text style={styles.errorText}>{errors.price_per_hour}</Text>
              ) : null}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSave]}
                  onPress={handleSubmit}
                >
                  {yardId ? (
                    <Text style={styles.buttonText}>Cập nhật</Text>
                  ) : (
                    <Text style={styles.buttonText}>Tạo</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateYardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonClose: {
    backgroundColor: "#d9534f",
    marginRight: 10,
  },
  buttonSave: {
    backgroundColor: "#1646a9",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  selectedSportContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#1646A9",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  placeholderText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});
