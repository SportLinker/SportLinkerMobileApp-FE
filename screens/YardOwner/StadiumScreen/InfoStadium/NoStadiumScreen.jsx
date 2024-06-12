import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const NoStadiumScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.message}>Bạn chưa tạo sân vận động nào.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreateStadium")}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Tạo sân vận động
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  content: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  message: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1646a9",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1646a9",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  buttonLabel: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default NoStadiumScreen;
