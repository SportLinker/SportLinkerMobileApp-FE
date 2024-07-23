import { Formik } from "formik";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Portal, Snackbar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Loading from "../component/Loading";
import RadioButtonGroup from "../component/RadioButtonGroup";
import SportSelectOptions from "../component/SportSelectOptions";
import { getUserLoadingSelector } from "../redux/selectors";
import { getArrStringSportName } from "../utils";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../utils/constant";
import { register } from "../redux/slices/userSlice";

const phoneRegExp = /^0\d{9}$/;

const genderOptions = [
  {
    label: "Nam",
    value: "men",
  },
  {
    label: "Nữ",
    value: "women",
  },
];

const roleOptions = [
  {
    label: "Người dùng",
    value: "player",
  },
  {
    label: "Chủ sân",
    value: "stadium",
  },
  // {
  //   label: "Huấn luyện viên",
  //   value: "coach",
  // },
];

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Tên đăng nhập quá ngắn!")
    .max(50, "Tên đăng nhập quá dài!")
    .required("Vui lòng không bỏ trống thông tin này!"),
  name: Yup.string()
    .min(2, "Tên quá ngắn!")
    .max(50, "Tên quá dài!")
    .required("Vui lòng không bỏ trống thông tin này!"),
  password: Yup.string()
    .required("Vui lòng không bỏ trống thông tin này!")
    .min(6, "Vui lòng nhập mật khẩu có độ dài từ 6 - 20 ký tự.")
    .max(20, "Vui lòng nhập mật khẩu có độ dài từ 6 - 20 ký tự."),
  // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  confirmPassword: Yup.string()
    .required("Vui lòng không bỏ trống thông tin này!")
    .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu không khớp!"),
  gender: Yup.string().required("Vui lòng không bỏ trống thông tin này!"),
  role: Yup.string().required("Vui lòng không bỏ trống thông tin này!"),
  favSport: Yup.array()
    .of(
      Yup.object().shape({
        sport_name: Yup.string().required("Chọn môn thể thao!"),
        value: Yup.string().required("Chọn môn thể thao!"),
        icon: Yup.string().required("Chọn môn thể thao!"),
      })
    )
    .min(1, "Vui lòng chọn ít nhất một môn thể thao!"),
});

export default function RegisterScreen({ navigation }) {
  const [isOpenSportModal, setIsOpenSportModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(true);
  const dispatch = useDispatch();
  const loadingSelector = useSelector(getUserLoadingSelector);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <Formik
        initialValues={{
          username: "",
          name: "",
          password: "",
          confirmPassword: "",
          gender: "men",
          role: "player",
          favSport: [],
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          console.log(values);
          const formData = {
            username: values.username,
            password: values.password,
            name: values.name,
            gender: values.gender,
            role: values.role,
            favorite: getArrStringSportName(values.favSport),
            avatar_url:
              "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
          };
          console.log(formData);
          try {
            dispatch(register(formData)).then((response) => {
              if (response.error) {
                console.log("error response");
                setFailMessage(response.payload.message);
              }
              if (
                response?.payload?.message &&
                response.payload.message == "Register sucessfully"
              ) {
                console.log("success");
                setSuccessMessage("Đăng ký thành công!");
                setTimeout(() => {
                  navigation.navigate("Login");
                }, 3000);
              }
            });
          } catch (error) {
            console.log("error", error);
          }
        }}
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {loadingSelector && <Loading visible={loadingSelector} />}

            <ScrollView style={styles.container}>
              <Image
                style={{
                  resizeMode: "contain",
                  height: 100,
                  width: 150,
                }}
                source={require("./../assets/logo.png")}
              />
              <Text style={styles.title}>Đăng ký nào!</Text>
              <Text style={styles.secondaryText}>
                Để đăng ký hãy nhập thông tin bên dưới
              </Text>

              <Text style={styles.label}>Tên đăng nhập:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                inputMode="decimal"
                placeholder="Tên đăng nhập"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                outlineColor={touched.username && errors.username && "red"}
              />
              <Text style={styles.errorMessage}>
                {touched.username && errors.username && errors.username}
              </Text>

              <Text style={styles.label}>Họ và tên:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                inputMode="text"
                placeholder="Họ và tên"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                outlineColor={touched.name && errors.name && "red"}
              />
              <Text style={styles.errorMessage}>
                {touched.name && errors.name && errors.name}
              </Text>

              <Text style={styles.label}>Mật khẩu:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                inputMode="text"
                placeholder="Mật khẩu"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={isHidePassword}
                value={values.password}
                outlineColor={touched.password && errors.password && "red"}
                right={
                  <TextInput.Icon
                    color="#1646A9"
                    forceTextInputFocus={false}
                    icon={isHidePassword ? "eye-off" : "eye"}
                    onPress={() => setIsHidePassword(!isHidePassword)}
                  />
                }
              />
              <Text style={styles.errorMessage}>
                {touched.password && errors.password && errors.password}
              </Text>
              <Text style={styles.label}>Xác nhận mật khẩu:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                inputMode="text"
                placeholder="Xác nhận mật khẩu"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={isHideConfirmPassword}
                outlineColor={
                  touched.confirmPassword && errors.confirmPassword && "red"
                }
                right={
                  <TextInput.Icon
                    color="#1646A9"
                    forceTextInputFocus={false}
                    icon={isHideConfirmPassword ? "eye-off" : "eye"}
                    onPress={() =>
                      setIsHideConfirmPassword(!isHideConfirmPassword)
                    }
                  />
                }
              />
              <Text style={styles.errorMessage}>
                {touched.confirmPassword &&
                  errors.confirmPassword &&
                  errors.confirmPassword}
              </Text>

              <Text style={styles.label}>Giới tính:</Text>
              <RadioButtonGroup
                options={genderOptions}
                selected={values.gender}
                setSelected={handleChange("gender")}
              />
              <Text style={styles.errorMessage}>
                {touched.gender && errors.gender && errors.gender}
              </Text>

              <Text style={styles.label}>Bạn là:</Text>
              <RadioButtonGroup
                options={roleOptions}
                selected={values.role}
                setSelected={handleChange("role")}
              />
              <Text style={styles.errorMessage}>
                {touched.role && errors.role && errors.role}
              </Text>

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
                  setSportFilter={(sports) => setFieldValue("favSport", sports)}
                  sportFilter={values.favSport}
                />
              </Portal>
              <Text style={styles.errorMessage}>
                {touched.favSport && errors.favSport && errors.favSport}
              </Text>

              <Button
                mode="contained"
                style={styles.button}
                labelStyle={styles.buttonText}
                onPress={() => {
                  // HANDLE SUBMIT
                  handleSubmit();

                  // HANDLE DISPLAY OTP
                  // navigation.navigate("OTPScreen");
                }}
              >
                Đăng ký
              </Button>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginVertical: 10,
                }}
              >
                <Text style={{ marginVertical: "auto", fontSize: 16 }}>
                  Bạn đã có tài khoản?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  mode="outlined"
                  labelStyle={{ color: "black", fontSize: 16 }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#1646a9",
                      marginLeft: 10,
                      fontSize: 16,
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
      <Snackbar
        visible={successMessage !== ""}
        onDismiss={() => setSuccessMessage("")}
        duration={3000}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
      <Snackbar
        visible={failMessage !== ""}
        onDismiss={() => setFailMessage("")}
        duration={4000}
        style={[styles.snackbarContainer, styles.snackbarContainerFail]}
      >
        {failMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 40,
    height: "100%",
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    // marginBottom: 5,
  },
  secondaryText: {
    color: "#797979",
    marginBottom: 30,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    marginVertical: 10,
    // borderWidth: 1,
    borderRadius: 8,
    borderColor: "#4878D9",
    // borderWidth: 2,
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
    height: 18,
  },
  button: {
    backgroundColor: "#1646A9",
    borderRadius: 20,
    paddingVertical: 4,
    marginTop: 20,
  },
  buttonSport: {
    backgroundColor: "#1646A9",
    borderRadius: 20,
    marginTop: 10,
    height: 80,
    display: "flex",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  snackbarContainer: {
    borderRadius: 10,
    textAlign: "center",
    transform: [
      { translateX: 0 * WINDOW_WIDTH },
      { translateY: 0 * WINDOW_HEIGHT },
    ],
    backgroundColor: "#1646A9",
  },
  snackbarContainerFail: {
    backgroundColor: "red",
  },
});
