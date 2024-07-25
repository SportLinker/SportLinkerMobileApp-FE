import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import {
  RadioButton,
  Button,
  Title,
  Paragraph,
  Divider,
} from "react-native-paper";

const PlanSelection = ({ handleSubmit, checked, setChecked }) => {
  const getBorderColor = (value) => {
    return checked === value ? "#1646A9" : "#ccc";
  };

  return (
    <ImageBackground
      source={{
        uri: "https://www.truelemon.com/cdn/shop/articles/Is-VitaminWater-Good-For-You_93eedf9b-c192-4712-91bb-8c2870c2fd1c_700x.jpg?v=1551889562",
      }} // Replace with your sports image URL
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Title style={styles.title}>Nâng Cấp Gói Của Bạn</Title>
          <Paragraph style={styles.description}>
            Chọn gói tốt nhất phù hợp với nhu cầu của bạn.
          </Paragraph>

          <View style={styles.radioContainer}>
            <RadioButton.Group
              onValueChange={(newValue) => setChecked(newValue)}
              value={checked}
            >
              <View
                style={[
                  styles.radioItem,
                  {
                    borderColor: getBorderColor("first"),
                    backgroundColor: checked === "first" ? "#E3F2FD" : "#fff",
                  },
                ]}
              >
                <RadioButton value="first" />
                <Text style={styles.radioText}>
                  Gói Cơ Bản - 39.000đ / tháng
                </Text>
              </View>
              <View
                style={[
                  styles.radioItem,
                  {
                    borderColor: getBorderColor("second"),
                    backgroundColor: checked === "second" ? "#E3F2FD" : "#fff",
                  },
                ]}
              >
                <RadioButton value="second" />
                <Text style={styles.radioText}>Gói 1 Năm - 390.000đ / năm</Text>
              </View>
            </RadioButton.Group>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.ownedItemsContainer}>
            <Title style={styles.subTitle}>Những gì bạn sở hữu</Title>
            <Paragraph style={styles.ownedItem}>
              - Gói nâng cấp:{" "}
              <Text style={styles.boldText}>
                Tài khoản sở hữu tick xanh chuyên nghiệp
              </Text>
              ,{" "}
              <Text style={styles.boldText}>
                Bài viết được hiển thị ưu tiên
              </Text>
              ,{" "}
              <Text style={styles.boldText}>
                Có thể đăng thoải mái 10 ảnh trong một bài
              </Text>
              ,{" "}
              <Text style={styles.boldText}>
                và những ưu đãi mới nhất từ SportLinker
              </Text>
              .
            </Paragraph>
          </View>

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Xác Nhận
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 10,
  },
  content: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional: to make the text more readable on top of the image
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1646A9",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1646A9",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  radioContainer: {
    marginBottom: 24,
    width: "100%",
    paddingHorizontal: 16,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#1646A9",
  },
  button: {
    marginTop: 24,
    width: "80%",
    backgroundColor: "#1646A9",
  },
  divider: {
    marginVertical: 24,
    height: 1,
    width: "100%",
  },
  ownedItemsContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  ownedItem: {
    fontSize: 16,
    marginBottom: 8,
    color: "#1646A9",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default PlanSelection;
