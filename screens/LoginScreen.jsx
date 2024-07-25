import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider, Snackbar, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import NotificationComponent from "../component/NotificationComponent";
import { screenHeight, screenWidth } from "../component/style";
import { getUserLoadingSelector, getUserSelector } from "../redux/selectors";
import userSlice, { login } from "../redux/slices/userSlice";
import { BackHandler } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({
    username: "ninh18",
    password: "123456",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [invalidInput, setInvalidInput] = useState(true);

  const loadingSelector = useSelector(getUserLoadingSelector);
  const userInfo = useSelector(getUserSelector);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { triggerNotification } = NotificationComponent();

  useEffect(() => {
    if (isFocused) {
      dispatch(userSlice.actions.setUserLoading(false));
    }
  }, [dispatch, isFocused]);

  useEffect(() => {
    const backAction = () => {
      return true; // Chặn hành động quay lại
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogin = async () => {
    console.log("handleLogin");
    try {
      if (loginForm.username === "" || loginForm.password === "") {
        setErrorMessage("Vui lòng không bỏ trống!");
        setInvalidInput(false);
        return;
      }
      dispatch(login(loginForm)).then((response) => {
        console.log(response);

        if (response.error) {
          setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
          setInvalidInput(false);
        }

        if (
          response?.payload?.message &&
          response.payload.message === "Login sucessfully"
        ) {
          setSuccessMessage("Đăng nhập thành công!");
          setTimeout(() => {
            if (response.payload.metadata.user.role === "player") {
              navigation.navigate("BottomTabs");
            }
            if (response.payload.metadata.user.role === "stadium") {
              navigation.navigate("BottomTabYardOwnerNavigator");
            }
          }, 500);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function onGoogleButtonPress() {
    GoogleSignin.configure({
      webClientId:
        "906328135376-90t5fhq0fe85g0bjdse93s62bkcun5q7.apps.googleusercontent.com",
    });
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken } = await GoogleSignin.signIn();
      console.log(`idToken`, idToken);

      if (!idToken) {
        console.error("No ID token received from Google Sign-In");
        return;
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(`googleCredential`, googleCredential);

      if (!googleCredential) {
        console.error("Failed to create Google credential");
        return;
      }

      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      console.log(`user`, userCredential.user);
    } catch (err) {
      console.log(`Error during Google Sign-In`, JSON.stringify(err));
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView keyboardDismissMode="on-drag">
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
              onPress={
                () => Alert.alert("Tính năng đang phát triển", "")
                // onGoogleButtonPress().then(() =>
                //   console.log("Signed in with Google!")
                // )
              }
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

            <Text style={styles.label}>Tên đăng nhập:</Text>
            <TextInput
              textColor="black"
              style={[
                styles.input,
                { borderColor: invalidInput ? "#4878D9" : "red" },
              ]}
              mode="outlined"
              placeholder="Tên đăng nhập"
              onChangeText={(text) => {
                setLoginForm((prevState) => ({ ...prevState, username: text }));
                setInvalidInput(true);
              }}
              outlineColor={errorMessage && "red"}
              value={loginForm.username}
            />
            <Text style={styles.label}>Mật khẩu:</Text>
            <TextInput
              textColor="black"
              mode="outlined"
              style={[
                styles.input,
                { borderColor: invalidInput ? "#4878D9" : "red" },
              ]}
              placeholder="Mật khẩu"
              onChangeText={(text) => {
                setLoginForm((prevState) => ({ ...prevState, password: text }));
                setInvalidInput(true);
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

            {/* <Button
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
            <Button
              mode="outlined"
              style={{ marginBottom: 10 }}
              onPress={async () => {
                await triggerNotification("Hello from App.js!");
              }}
            >
              Press to schedule a notification
            </Button> */}
          </View>
        </ScrollView>
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
    backgroundColor: "white",
    marginVertical: 12,
    marginBottom: 12,
    borderRadius: 8,
    // borderWidth: 1,
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
    backgroundColor: "#1646A9",
    textAlign: "center",
    color: "white",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: 0.3 * screenHeight },
    ],
  },
  snackbarContainerFail: {
    backgroundColor: "red",
    color: "white",
  },
});

export default LoginScreen;
