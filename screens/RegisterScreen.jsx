import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";

const phoneRegExp = /^0\d{9}$/;

const RegisterSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "Số điện thoại không hợp lệ!")
    .required("Vui lòng không bỏ trống thông tin này!"),
  fullname: Yup.string()
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
});

export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <Formik
        initialValues={{
          phone: "",
          fullname: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
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

              <Text style={styles.label}>Số điện thoại:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                inputMode="decimal"
                placeholder="Số điện thoại"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                outlineColor={touched.phone && errors.phone && "red"}
              />
              <Text style={styles.errorMessage}>
                {touched.phone && errors.phone && errors.phone}
              </Text>

              <Text style={styles.label}>Họ và tên:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                inputMode="text"
                placeholder="Họ và tên"
                onChangeText={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
                value={values.fullname}
                outlineColor={touched.fullname && errors.fullname && "red"}
              />
              <Text style={styles.errorMessage}>
                {touched.fullname && errors.fullname && errors.fullname}
              </Text>

              <Text style={styles.label}>Mật khẩu:</Text>
              <TextInput
                style={styles.input}
                mode="outlined"
                inputMode="text"
                placeholder="Mật khẩu"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                outlineColor={touched.password && errors.password && "red"}
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
                outlineColor={
                  touched.confirmPassword && errors.confirmPassword && "red"
                }
              />
              <Text style={styles.errorMessage}>
                {touched.confirmPassword &&
                  errors.confirmPassword &&
                  errors.confirmPassword}
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
    marginBottom: 5,
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
    height: 50,
  },
  errorMessage: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
    height: 18,
  },
  button: {
    backgroundColor: "#1646A9",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 4,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
