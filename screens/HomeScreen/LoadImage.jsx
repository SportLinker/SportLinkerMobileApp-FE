import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { convertHttpToHttps } from "../../utils";

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
            <Image
              source={{ uri: convertHttpToHttps(imageUri) }}
              style={styles.image}
            />
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
    height: 400, // Adjust based on your needs
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
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
    objectFit: "cover",
    objectPosition: "center",
  },
});

export default LoadImage;
