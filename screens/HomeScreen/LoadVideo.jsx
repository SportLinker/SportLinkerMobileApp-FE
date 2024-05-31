import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Button } from "react-native-paper";
import Swiper from "react-native-swiper";

const LoadVideo = ({ listVideo }) => {
  return (
    <Swiper
      style={styles.swiper}
      autoplayTimeout={3}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
      loop={false} // Disable looping
    >
      {listVideo.map((videoUri, index) => (
        <VideoPlayer key={index} uri={videoUri} />
      ))}
    </Swiper>
  );
};

const VideoPlayer = ({ uri }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.containerVideo}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        isMuted={false}
      />
      {/* <View style={styles.buttons}>
        <Button
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          {status.isPlaying ? "Pause" : "Play"}
        </Button>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
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
  containerVideo: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Ensure this matches the swiper height
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default LoadVideo;
