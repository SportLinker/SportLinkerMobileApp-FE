import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import CoachMatch from "./CoachMatch";
import CoachProfile from "./CoachProfile";
import CoachTrain from "./CoachTrain";

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
    <CoachProfile />
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#673ab7" }]}>
    <CoachMatch />
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]}>
    <CoachTrain />
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function CoachTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Hồ Sơ" },
    { key: "second", title: "Trận Đấu" },
    { key: "third", title: "Huấn Luyện" },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
