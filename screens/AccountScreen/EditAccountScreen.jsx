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
import { Snackbar } from "react-native-paper";
import { screenHeight, screenWidth } from "../../component/style";

const phoneRegExp = /^0\d{9}$/;

const validationSchema = Yup.object().shape({
  textName: Yup.string().required("Tên là bắt buộc"),
  // textUsername: Yup.string().required("Tên người dùng là bắt buộc"),
  textEmail: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  phone: Yup.string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ!")
    .required("Số điện thoại là bắt buộc!"),
  dateOfBirth: Yup.date().required("Ngày sinh là bắt buộc"),
  textBio: Yup.string(),
  isGenderSelected: Yup.string().required("Giới tính là bắt buộc"),
  // isAgeSelected: Yup.string().required("Nhóm tuổi là bắt buộc"),
});

export default function EditAccountScreen({ navigation }) {
  const userSelector = useSelector(getUserSelector);
  const loading = useSelector(getUserLoadingSelector);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  const initialValues = userSelector.id
    ? {
        textName: userSelector.name,
        // textUsername: "Ninh-88",
        textEmail: userSelector.email || "",
        phone: userSelector.phone,
        textBio: userSelector.bio || "",
        isGenderSelected: userSelector.gender,
        // isAgeSelected: "",
        dateOfBirth: new Date(userSelector.date_of_birth),
      }
    : {
        textName: "Ninh",
        // textUsername: "Ninh-88",
        phone: "",
        textEmail: "ninh2002@gmail.com",
        textBio: "Tôi là Ninh, quê Tây Ninh",
        isGenderSelected: "",
        // isAgeSelected: "",
        dateOfBirth: new Date(),
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
                {/* <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Tên người dùng</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("textUsername")}
                    onBlur={handleBlur("textUsername")}
                    value={values.textUsername}
                  />
                  {touched.textUsername && errors.textUsername && (
                    <Text style={styles.errorText}>{errors.textUsername}</Text>
                  )}
                </View> */}
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
                    {/* <TouchableOpacity
                      onPress={() =>
                        setFieldValue("isGenderSelected", "secret")
                      }
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.isGenderSelected === "secret" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Ionicons
                          name="male-female"
                          size={24}
                          color={
                            values.isGenderSelected === "secret"
                              ? "white"
                              : "black"
                          }
                        />
                        <Text
                          style={{
                            color:
                              values.isGenderSelected === "secret"
                                ? "white"
                                : "black",
                          }}
                        >
                          Bí mật
                        </Text>
                      </View>
                    </TouchableOpacity> */}
                  </View>
                  {touched.isGenderSelected && errors.isGenderSelected && (
                    <Text style={styles.errorText}>
                      {errors.isGenderSelected}
                    </Text>
                  )}
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Tiểu sử</Text>
                  <TextInput
                    style={styles.inputBio}
                    onChangeText={handleChange("textBio")}
                    onBlur={handleBlur("textBio")}
                    value={values.textBio}
                    multiline={true}
                    numberOfLines={4}
                    returnKeyType="done"
                  />
                  {touched.textBio && errors.textBio && (
                    <Text style={styles.errorText}>{errors.textBio}</Text>
                  )}
                </View>

                {/* <View style={styles.infoTextContainer}>
                  <Text style={styles.textTitle}>Nhóm tuổi</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setFieldValue("isAgeSelected", "young")}
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.isAgeSelected === "young" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              values.isAgeSelected === "young"
                                ? "white"
                                : "black",
                          }}
                        >
                          Thiếu niên
                        </Text>
                        <Text
                          style={{
                            color:
                              values.isAgeSelected === "young"
                                ? "white"
                                : "black",
                          }}
                        >
                          (dưới 18)
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setFieldValue("isAgeSelected", "adult")}
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.isAgeSelected === "adult" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              values.isAgeSelected === "adult"
                                ? "white"
                                : "black",
                          }}
                        >
                          Người lớn
                        </Text>
                        <Text
                          style={{
                            color:
                              values.isAgeSelected === "adult"
                                ? "white"
                                : "black",
                          }}
                        >
                          (18 - 50)
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setFieldValue("isAgeSelected", "senior")}
                    >
                      <View
                        style={[
                          styles.iconGender,
                          values.isAgeSelected === "senior" &&
                            styles.iconSelected,
                        ]}
                      >
                        <Text
                          style={{
                            color:
                              values.isAgeSelected === "senior"
                                ? "white"
                                : "black",
                          }}
                        >
                          Cao tuổi
                        </Text>
                        <Text
                          style={{
                            color:
                              values.isAgeSelected === "senior"
                                ? "white"
                                : "black",
                          }}
                        >
                          (trên 50)
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {touched.isAgeSelected && errors.isAgeSelected && (
                    <Text style={styles.errorText}>{errors.isAgeSelected}</Text>
                  )}
                </View> */}
                <View
                  style={{
                    marginVertical: 20,
                    marginHorizontal: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1646A9",
                      paddingHorizontal: 50,
                      paddingVertical: 10,
                      borderRadius: 10,
                      height: 50,
                    }}
                    onPress={handleSubmit}
                  >
                    <Text style={{ color: "#FFF", fontSize: 16 }}>
                      Cập nhật
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        <Snackbar
          visible={!!errorMessage}
          duration={2000}
          onDismiss={() => setErrorMessage(null)}
          style={[styles.snackbarContainer, styles.snackbarContainerFail]}
        >
          {errorMessage}
        </Snackbar>
        <Snackbar
          visible={successMessage !== ""}
          onDismiss={() => setSuccessMessage("")}
          duration={1000}
          style={styles.snackbarContainer}
        >
          {successMessage}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoTextContainer: { marginTop: 10 },
  textTitle: { marginLeft: 25, fontWeight: "bold" },
  input: {
    height: 40,
    marginHorizontal: 25,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#4878D9",
    borderWidth: 2,
  },
  inputBio: {
    height: 80, // Điều chỉnh độ cao của TextInput để hiển thị nhiều dòng văn bản
    marginHorizontal: 25,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: "top",
    borderColor: "#4878D9",
    borderWidth: 2,
  },
  iconGender: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5, // Chỉ áp dụng cho Android
    height: 80,
    width: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4878D9",
    alignItems: "center",
    justifyContent: "center",
  },

  age: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5, // Chỉ áp dụng cho Android
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#4878D9",
    alignItems: "center",
  },
  iconSelected: {
    backgroundColor: "blue", // Màu nền khi được chọn
    borderColor: "white",
  },
  errorText: {
    color: "red",
    marginLeft: 25,
  },
  snackbarContainer: {
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#1646A9",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: -0.02 * screenHeight },
    ],
  },
  snackbarContainerFail: {
    backgroundColor: "red",
  },
});
