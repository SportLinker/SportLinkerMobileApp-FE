// Loading.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

const Loading = ({ visible, message }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size={80} color="#1646A9" />
      {/* {message && <Text style={styles.message}>{message}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
    color: "#1646A9",
  },
});

export default Loading;
