import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { FAB } from "react-native-paper";
import FuncHomeYard from "./FuncHomeYard";
import HeaderHomeYard from "./HeaderHomeYard";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/selectors";

function HomeYardScreen({ navigation }) {
  const user = useSelector(getUserSelector);

  if (!user) return <Text>Loading...</Text>;
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={[styles.logoHeader, styles.pr5]}>
            <Image
              source={require("./../../../assets/sportlinker_logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <FAB
              icon="bell-outline"
              color="black"
              size="small"
              style={styles.buttonHeader}
              onPress={() => navigation.navigate("NotificationScreen")}
            />
          </View>
        </View>
        <ScrollView>
          <HeaderHomeYard user={user} />
          <FuncHomeYard />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeYardScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  header: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#C4C4C4",
    paddingHorizontal: 10,
    backgroundColor: "#1646a9",
  },
  logo: {
    height: 35,
    width: 82,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  logoHeader: {
    borderRadius: 10,
  },
  pr5: {
    padding: 5,
  },
  buttonHeader: {
    backgroundColor: "#F7F7F7",
  },
  mr5: {
    marginRight: 5,
  },
});
