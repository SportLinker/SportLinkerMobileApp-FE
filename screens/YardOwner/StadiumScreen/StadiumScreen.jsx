import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import NoStadiumScreen from "./InfoStadium/NoStadiumScreen";

const StadiumScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <NoStadiumScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#6200ee",
  },
  buttonLabel: {
    color: "#ffffff",
  },
});

export default StadiumScreen;
