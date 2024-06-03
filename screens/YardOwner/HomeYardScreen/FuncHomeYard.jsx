import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function FuncHomeYard() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="calendar" size={70} color="#1646a9" />
        <Text style={styles.cardText}>Xem Lịch</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <AntDesign name="checksquareo" size={70} color="#1646a9" />
        <Text style={styles.cardText}>Đơn Đặt Sân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <FontAwesome name="star-o" size={70} color="#1646a9" />
        <Text style={styles.cardText}>Đánh Giá</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("WithDrawScreen")}
      >
        <MaterialCommunityIcons name="export" size={70} color="#1646a9" />
        <Text style={styles.cardText}>Rút Tiền</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    columnGap: 20,
  },
  card: {
    borderRadius: 20,
    backgroundColor: "#f7f7f7",
    width: 165,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    marginBottom: 20,
    alignItems: "center",
  },
  cardText: {
    color: "#1646a9",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 5,
  },
});
