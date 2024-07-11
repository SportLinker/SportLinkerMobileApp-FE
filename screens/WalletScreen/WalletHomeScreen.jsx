import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WalletOptions from "./WalletOptions";
import TransactionReview from "./TransactionReview";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListTransactionByUser } from "../../redux/slices/paymentSlice";

const WalletHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListTransactionByUser());
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <View style={[styles.logoHeader, styles.pr5]}>
            <Image
              source={require("./../../assets/sportlinker_logo.png")}
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
        </View> */}
        <WalletOptions />
        <TransactionReview />
      </View>
    </SafeAreaView>
  );
};

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

export default WalletHome;
