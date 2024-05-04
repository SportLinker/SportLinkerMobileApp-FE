import React, { useRef } from "react";
import {
  Text,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FAB } from "react-native-paper";
import PostItem from "./PostItem";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.header}>
          <Image
            source={require("./../../assets/logo.png")}
            style={styles.logo}
          />
          <View style={styles.buttonsContainer}>
            <FAB
              icon="plus-circle-outline"
              color="black"
              size="small"
              style={[styles.buttonHeader, styles.mr5]}
              onPress={() => navigation.navigate("PostLinkerScreen")}
            />
            <FAB
              icon="bell-outline"
              color="black"
              size="small"
              style={styles.buttonHeader}
              onPress={() => navigation.navigate("PostLinkerScreen")}
            />
          </View>
        </View>
        <View style={{ paddingBottom: 220 }}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true); // Show refresh indicator
                  setTimeout(() => {
                    setRefreshing(false); // Hide refresh indicator
                  }, 1000);
                }}
                // Customizing the refresh icon
                colors={["#4478ff"]} // Color of the refresh indicator
                tintColor={"#4478ff"} // Color of the spinning wheel
                title="Tải thêm bài viết" // Text displayed while refreshing
                titleColor="#4478ff" // Color of the refresh text
              />
            }
          >
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
            <PostItem />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#C4C4C4",
  },
  logo: {
    height: 35,
    width: 82,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonHeader: {
    backgroundColor: "#F7F7F7",
  },
  mr5: {
    marginRight: 5,
  },
});
