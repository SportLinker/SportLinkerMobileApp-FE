import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getBookedByUserSelector } from "../../../redux/selectors";
import { getAllBookedByUser } from "../../../redux/slices/bookSlice";

const MyBook = () => {
  const dispatch = useDispatch();
  const bookedList = useSelector(getBookedByUserSelector);

  const [booked, setBooked] = useState([]);

  useEffect(() => {
    dispatch(getAllBookedByUser());
  }, [dispatch]);

  useEffect(() => {
    if (bookedList) {
      const sortedBookedList = [...bookedList].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setBooked(sortedBookedList);
    }
  }, [bookedList]);

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#cccc00", color: "white" };
      case "accepted":
        return { backgroundColor: "green", color: "white" };
      case "rejected":
        return { backgroundColor: "red", color: "white" };
      default:
        return { backgroundColor: "white", color: "white" };
    }
  };

  const handleCancelBooking = (id) => {
    console.log(`Cancel booking with id: ${id}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.textStadium}>{item.yard.stadium.stadium_name}</Text>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>Yard: </Text>
        <Text style={styles.text}>{item.yard.yard_name}</Text>
      </View>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>Start Time: </Text>
        <Text style={styles.text}>{formatTime(item.time_start)} giờ</Text>
      </View>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>End Time: </Text>
        <Text style={styles.text}>{formatTime(item.time_end)} giờ</Text>
      </View>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>Price per Hour: </Text>
        <Text style={styles.text}>{item.yard.price_per_hour} VNĐ/giờ</Text>
      </View>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>Trạng thái: </Text>
        <Text
          style={[
            styles.text,
            { fontWeight: "bold", padding: 5, borderRadius: 5 },
            getStatusColor(item.status),
          ]}
        >
          {item.status.toUpperCase()}
        </Text>
      </View>
      {item.status === "pending" && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelBooking(item.id)}
        >
          <Text style={styles.cancelButtonText}>Hủy Đặt Sân</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={booked || []}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
    borderWidth: 3,
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
  },
  textBold: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
  },
  textStadium: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 6,
    marginHorizontal: "auto",
  },
  innerText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MyBook;
