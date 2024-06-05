import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput, Button, Divider, Snackbar } from "react-native-paper";
import { screenHeight, screenWidth } from "../component/style";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlice";
import { api } from "../services/api";
import { createEvent } from "../redux/slices/eventSlice";

const LoginScreen = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    phone: "0825999871",
    password: "123456",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log("handleLogin");
    try {
      // Handle login logic here, such as sending login credentials to server
      if (loginForm.phone === "" || loginForm.password === "") {
        setErrorMessage("Vui lòng không bỏ trống!");
      }
      dispatch(login(loginForm));
      // navigation.navigate("BottomTabs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={{
                resizeMode: "contain",
                height: 100,
                width: 150,
                marginTop: 50,
              }}
              source={require("./../assets/logo.png")}
            />
            <Text style={styles.title}>Chào mừng quay lại!</Text>
            <Text style={styles.secondaryText}>
              Để đăng nhập hãy nhập thông tin bên dưới
            </Text>
            <Button
              mode="outlined"
              labelStyle={{
                color: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: "auto",
                padding: 8,
              }}
              onPress={() => console.log("presss")}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    resizeMode: "contain",
                    width: 30,
                    height: 30,
                  }}
                  source={require("./../assets/googleLogo.jpg")}
                />
                <Text>Đăng nhập bằng Google</Text>
              </View>
            </Button>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 30,
              }}
            >
              <Divider style={{ flex: 1, height: 1 }} />
              <Text style={{ width: 100, textAlign: "center", fontSize: 16 }}>
                Hoặc
              </Text>
              <Divider
                theme={{ colors: { primary: "gray" } }}
                style={{ flex: 1, height: 1 }}
              />
            </View>

            <Text style={styles.label}>Số điện thoại:</Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              inputMode="decimal"
              placeholder="Số điện thoại"
              onChangeText={(text) => {
                setLoginForm((prevState) => ({ ...prevState, phone: text }));
              }}
              outlineColor={errorMessage && "red"}
              value={loginForm.phone}
            />
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              placeholder="Mật khẩu"
              onChangeText={(text) => {
                setLoginForm((prevState) => ({ ...prevState, password: text }));
              }}
              right={
                <TextInput.Icon
                  color="#1646A9"
                  forceTextInputFocus={false}
                  icon={isHidePassword ? "eye-off" : "eye"}
                  onPress={() => setIsHidePassword(!isHidePassword)}
                />
              }
              value={loginForm.password}
              secureTextEntry={isHidePassword}
              outlineColor={errorMessage && "red"}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#4878D9",
                marginBottom: 10,
                paddingVertical: 5,
              }}
              mode="outlined"
              onPress={() => console.log("Pressed")}
            >
              Quên mật khẩu?
            </Text>
            <Button
              mode="contained"
              style={styles.button}
              labelStyle={styles.buttonText}
              onPress={handleLogin}
            >
              Đăng nhập
            </Button>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              <Text style={{ marginVertical: "auto", fontSize: 16 }}>
                Bạn chưa có tài khoản?
              </Text>
              <TouchableOpacity
                mode="outlined"
                onPress={() => navigation.navigate("Register")}
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
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              mode="outlined"
              style={{ marginBottom: 10 }}
              onPress={() => navigation.navigate("BottomTabs")}
            >
              Go to User
            </Button>
            <Button
              mode="outlined"
              style={{ marginBottom: 10 }}
              onPress={() => navigation.push("BottomTabYardOwnerNavigator")}
            >
              Go to Yard Owner
            </Button>
            <Button
              mode="outlined"
              style={{ marginBottom: 10 }}
              onPress={() => navigation.navigate("BottomTabCoachNavigator")}
            >
              Go to Coach
            </Button>
          </View>
        </ScrollView>
        <Snackbar
          visible={!!errorMessage}
          duration={2000}
          onDismiss={() => setErrorMessage(null)}
          style={styles.snackbarContainer}
        >
          {errorMessage}
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 40,
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1646A9",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  snackbarContainer: {
    borderRadius: 10,
    alignItems: "center",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: -0.02 * screenHeight },
    ],
  },
});

export default LoginScreen;
