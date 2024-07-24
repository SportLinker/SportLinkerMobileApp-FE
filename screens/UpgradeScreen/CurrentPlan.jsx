import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Title, Paragraph } from "react-native-paper";

const CurrentPlan = ({ currentPlan, expiryDate }) => {
  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/564x/4f/aa/58/4faa585dc163af9603ebfaf615b024fd.jpg",
      }} // Thay thế với URL hình nền của bạn
      style={styles.background}
    >
      <View style={styles.content}>
        <Title style={styles.title}>Gói Hiện Tại Của Bạn</Title>
        <Paragraph style={styles.description}>
          Bạn hiện đang sử dụng gói{" "}
          <Text style={styles.bold}>{currentPlan}</Text>.
        </Paragraph>
        <Paragraph style={styles.description}>
          Hạn sử dụng đến: <Text style={styles.bold}>{expiryDate}</Text>.
        </Paragraph>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    padding: 16,
    backgroundColor: "rgba(247, 250, 255, 0.8)", // Màu nền với độ trong suốt để dễ đọc hơn
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dbe6f5",
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1646A9",
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16,
    color: "#3c4b64",
  },
  bold: {
    fontWeight: "600",
    color: "#1646A9",
  },
});

export default CurrentPlan;
