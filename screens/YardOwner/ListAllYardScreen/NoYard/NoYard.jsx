import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NoYard() {
  return (
    <View style={styles.content}>
      <Text style={styles.message}>Bạn chưa tạo sân nào.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
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
});
