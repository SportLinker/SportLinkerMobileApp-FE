import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUserLoadingSelector, getUserSelector } from "../../redux/selectors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { updateUserProfile } from "../../redux/slices/userSlice";
import Loading from "../../component/Loading";
import { Button, Portal, Snackbar } from "react-native-paper";
import { screenHeight, screenWidth } from "../../component/style";
import SportSelectOptions from "../../component/SportSelectOptions";
import { getArrStringSportName } from "../../utils";

const phoneRegExp = /^0\d{9}$/;

const validationSchema = Yup.object().shape({
  textName: Yup.string().required("Tên là bắt buộc"),
  textEmail: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  phone: Yup.string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ!")
    .required("Số điện thoại là bắt buộc!"),
  dateOfBirth: Yup.date().required("Ngày sinh là bắt buộc"),
  textBio: Yup.string(),
  isGenderSelected: Yup.string().required("Giới tính là bắt buộc"),
});

export default function EditAccountScreen({ navigation }) {
  const userSelector = useSelector(getUserSelector);
  const loading = useSelector(getUserLoadingSelector);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isOpenSportModal, setIsOpenSportModal] = useState(false);

  const dispatch = useDispatch();

  console.log(userSelector.favorite);

  const initialValues = userSelector.id
    ? {
        textName: userSelector.name,
        textEmail: userSelector.email || "",
        phone: userSelector.phone,
        textBio: userSelector.bio || "",
        isGenderSelected: userSelector.gender,
        dateOfBirth: new Date(userSelector.date_of_birth),
        favSport: userSelector.favorite || [],
      }
    : {
        textName: "Ninh",
        phone: "",
        textEmail: "ninh2002@gmail.com",
        textBio: "Tôi là Ninh, quê Tây Ninh",
        isGenderSelected: "",
        dateOfBirth: new Date(),
        favSport: [],
      };

  const handleSubmitUpdate = (values) => {
    try {
      console.log(values);
      if (userSelector.id) {
        const formData = {
          id: userSelector.id,
          data: {
            name: values.textName,
            email: values.textEmail,
            phone: values.phone,
            date_of_birth: values.dateOfBirth,
            gender: values.isGenderSelected,
            bio: values.textBio,
            favorite: getArrStringSportName(values.favSport),
          },
        };
        console.log("formData", formData);
        dispatch(updateUserProfile(formData)).then((response) => {
          console.log("response", response);
          if (response?.payload?.message == "Update user successfully") {
            setSuccessMessage("User successfully");
            setTimeout(() => {
              navigation.navigate("AccountScreen");
            });
          } else {
            setErrorMessage("Update fail");
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, position: "relative" }}>
      {loading && <Loading visible={loading} />}
      <ScrollView>
        <View style={{ paddingTop: 20 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Cập nhật hồ sơ
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitUpdate}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Tên</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("textName")}
                    onBlur={handleBlur("textName")}
                    value={values.textName}
                  />
                  {touched.textName && errors.textName && (
                    <Text style={styles.errorText}>{errors.textName}</Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Số điện thoại</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorText}>{errors.phone}</Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("textEmail")}
                    onBlur={handleBlur("textEmail")}
                    value={values.textEmail}
                  />
                  {touched.textEmail && errors.textEmail && (
                    <Text style={styles.errorText}>{errors.textEmail}</Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Ngày sinh</Text>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text>
                      {new Date(values.dateOfBirth).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date(values.dateOfBirth)}
                      mode="date"
                      is24Hour={true}
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        console.log(selectedDate);
                        const currentDate =
                          selectedDate || new Date(values.dateOfBirth);
                        setShowDatePicker(false);
                        setFieldValue("dateOfBirth", currentDate.toISOString());
                      }}
                      textColor="#1646A9"
                    />
                  )}
                  {touched.dateOfBirth && errors.dateOfBirth && (
                    <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
                  )}
                </View>
                <Text style={styles.label}>Môn thể thao yêu thích:</Text>
                {values.favSport.length > 0 ? (
                  <Button
                    mode="contained"
                    style={styles.buttonSport}
                    labelStyle={styles.buttonText}
                    onPress={() => setIsOpenSportModal(true)}
                  >
                    Bạn đã chọn {values.favSport.length} môn thể thao
                  </Button>
                ) : (
                  <Button
                    mode="contained"
                    style={styles.buttonSport}
                    labelStyle={styles.buttonText}
                    onPress={() => setIsOpenSportModal(true)}
                  >
                    Chọn môn thể thao
                  </Button>
                )}
                <Portal>
                  <SportSelectOptions
                    visible={isOpenSportModal}
                    onDismiss={() => setIsOpenSportModal(false)}
                    onClose={() => setIsOpenSportModal(false)}
                    setSportFilter={(sports) =>
                      setFieldValue("favSport", sports)
                    }
                    sportFilter={values.favSport}
                    favSport={values.favSport}
                  />
                </Portal>
                {touched.favSport && errors.favSport && (
                  <Text style={styles.errorText}>{errors.favSport}</Text>
                )}
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Giới tính</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      gap: 40,
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setFieldValue("isGenderSelected", "men")}
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.isGenderSelected === "men" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Ionicons
                          name="male"
                          size={24}
                          color={
                            values.isGenderSelected === "men"
                              ? "white"
                              : "black"
                          }
                        />
                        <Text
                          style={{
                            color:
                              values.isGenderSelected === "men"
                                ? "white"
                                : "black",
                          }}
                        >
                          Nam
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setFieldValue("isGenderSelected", "women")}
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.isGenderSelected === "women" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Ionicons
                          name="female"
                          size={24}
                          color={
                            values.isGenderSelected === "women"
                              ? "white"
                              : "black"
                          }
                        />
                        <Text
                          style={{
                            color:
                              values.isGenderSelected === "women"
                                ? "white"
                                : "black",
                          }}
                        >
                          Nữ
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {touched.isGenderSelected && errors.isGenderSelected && (
                    <Text style={styles.errorText}>
                      {errors.isGenderSelected}
                    </Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Bio</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("textBio")}
                    onBlur={handleBlur("textBio")}
                    value={values.textBio}
                  />
                </View>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.updateButtonText}>Cập nhật</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Portal>
        <Snackbar
          visible={Boolean(errorMessage)}
          onDismiss={() => setErrorMessage(null)}
          action={{
            label: "Close",
            onPress: () => setErrorMessage(null),
          }}
          duration={3000}
        >
          {errorMessage}
        </Snackbar>
        <Snackbar
          visible={Boolean(successMessage)}
          onDismiss={() => setSuccessMessage("")}
          action={{
            label: "Close",
            onPress: () => setSuccessMessage(""),
          }}
          duration={3000}
        >
          {successMessage}
        </Snackbar>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoTextContainer: {
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  buttonSport: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#1646A9",
  },
  buttonText: {
    color: "white",
  },
  iconGender: {
    backgroundColor: "#fff",
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4878D9",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSelected: {
    backgroundColor: "#1646A9",
    color: "white",
  },
  updateButton: {
    backgroundColor: "#1646A9",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
