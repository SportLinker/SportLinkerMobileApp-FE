import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { TextInput, Button, Divider } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const handleLogin = () => {
    // Handle login logic here, such as sending login credentials to server
    console.log("Phone:", loginForm.phone);
    console.log("Password:", loginForm.password);
    if (loginForm.phone == "" || loginForm.password == "") {
      setErrorMessage("Vui lòng không bỏ trống!");
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      <View style={styles.container}>
        <Image
          style={{
            resizeMode: "contain",
            height: 100,
            width: 150,
          }}
          source={require("./../assets/logo.png")}
        />
        <Text style={styles.title}>Đăng nhập nào!</Text>
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
          }}
          onPress={() => console.log("Pressed")}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 0,
              paddingBottom: 0,
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
              icon={isHidePassword ? "eye-off" : "eye"}
              onPress={() => setIsHidePassword(!isHidePassword)}
            />
          }
          value={loginForm.password}
          secureTextEntry={isHidePassword}
          outlineColor={errorMessage && "red"}
        />
        <Text style={styles.errorMessage}>{errorMessage && errorMessage}</Text>

        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonText}
          onPress={handleLogin}
        >
          Đăng nhập
        </Button>
        <Button
          style={{ width: "100%", marginTop: 10 }}
          mode="outlined"
          onPress={() => navigation.navigate("Register")}
          labelStyle={{ color: "black", fontSize: 16 }}
        >
          Đăng ký
        </Button>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            textDecorationLine: "underline",
            marginVertical: 20,
            width: "100%",
            textAlign: "center",
            color: "#4878D9",
          }}
          mode="outlined"
          onPress={() => console.log("Pressed")}
        >
          Quên mật khẩu
        </Text>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate("BottomTabs")}
        >
          Go to Authentabs
        </Button>
      </View>
    </SafeAreaView>
  );
};

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
  errorMessage: {
    fontSize: 15,
    color: "red",
    width: "100%",
    textAlign: "center",
    marginBottom: 10,
    height: 20,
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
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default LoginScreen;
