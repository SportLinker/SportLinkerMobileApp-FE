import { Avatar } from "react-native-paper";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { formatCurrency, formatISODate } from "../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const fakeData = [
  {
    id: "t1",
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
    name: "Nguyễn Khánh Ninh",
    time: "13:30",
    date: "05/01/2023",
    value: 505000,
  },
  {
    id: "t2",
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
    name: "Nguyễn Khánh Ninh",
    time: "13:30",
    date: "05/01/2023",
    value: 505000,
  },
  {
    id: "t3",
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
    name: "Nguyễn Khánh Ninh",
    time: "13:30",
    date: "05/01/2023",
    value: 505000,
  },
  {
    id: "t4",
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
    name: "Nguyễn Khánh Ninh",
    time: "13:30",
    date: "05/01/2023",
    value: 505000,
  },
  {
    id: "t5",
    avatar:
      "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
    name: "Nguyễn Khánh Ninh",
    time: "13:30",
    date: "05/01/2023",
    value: 505000,
  },
];

const TransactionReview = () => {
  const { listTransaction } = useSelector((state) => state.paymentSlice);

  const navigation = useNavigation();
  const TransactionItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.transactionContainer}
        // onPress={() => navigation.navigate("DetailTransaction")}
      >
        <Avatar.Image
          size={50}
          source={{
            uri:
              item.status === "completed"
                ? "https://westphysics.com/wp-content/uploads/2022/10/green-tick-icon.png"
                : "https://cdn-icons-png.flaticon.com/512/7269/7269138.png",
          }}
        ></Avatar.Image>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionName}>
            {item.status === "completed" ? "Thành Công" : "Thất Bại"}
          </Text>
          <Text style={styles.transactionTime}>
            {formatISODate(item.created_at)}
          </Text>
        </View>
        <Text
          style={
            item.status === "completed"
              ? styles.transactionValue
              : styles.transactionValueCancel
          }
        >
          +{formatCurrency(item.amount, "VND", "vi-VN")}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listTransaction.transactions}
        renderItem={TransactionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    height: "65%",
    marginHorizontal: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: "#ffffff",
  },
  transactionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    gap: 10,
  },
  transactionValue: {
    color: "#5BD027",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 16,
  },
  transactionValueCancel: {
    color: "#F90303",
    fontWeight: "bold",
    textAlign: "right",
    fontSize: 16,
  },
  transactionInfo: {
    width: "50%",
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionTime: {
    color: "#707070",
    fontSize: 12,
  },
});

export default TransactionReview;
