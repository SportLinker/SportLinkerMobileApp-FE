import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const LoadImage = ({ listImages }) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        autoplayTimeout={3}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        loop={false} // Disable looping
      >
        {listImages.map((imageUri, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    height: 250, // Adjust based on your needs
  },
  dotStyle: {
    backgroundColor: "#FFFFFF",
    width: 6,
    height: 6,
    borderRadius: 4,
    margin: 3,
  },
  activeDotStyle: {
    backgroundColor: "#1646A9",
    width: 10,
    height: 10,
    borderRadius: 10,
    margin: 3,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default LoadImage;
