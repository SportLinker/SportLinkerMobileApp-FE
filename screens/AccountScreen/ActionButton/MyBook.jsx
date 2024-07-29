import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookedByUserSelector,
  getLoadingSelector,
} from "../../../redux/selectors";
import {
  cancelBooked,
  getAllBookedByUser,
} from "../../../redux/slices/bookSlice";

const MyBook = () => {
  const dispatch = useDispatch();
  const bookedList = useSelector(getBookedByUserSelector);
  const loading = useSelector(getLoadingSelector);

  const [booked, setBooked] = useState([]);

  console.log("booked", booked);

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

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    // Thay đổi định dạng ngày theo nhu cầu, ví dụ 'Ngày 27/07/2024'
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
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

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Đang xử lí";
      case "accepted":
        return "Thành công";
      case "rejected":
        return "Từ chối";
      default:
        return status;
    }
  };

  const handleCancelBooking = (id) => {
    console.log(`Cancel booking with id: ${id}`);
    dispatch(cancelBooked(id)).then(() => dispatch(getAllBookedByUser()));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.textStadium}>{item.yard.stadium.stadium_name}</Text>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>Sân nhỏ: </Text>
        <Text style={styles.text}>{item.yard.yard_name}</Text>
      </View>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>Thời gian: </Text>
        <Text style={styles.text}>
          {formatTime(item.time_start)} - {formatTime(item.time_end)} giờ
        </Text>
      </View>
      <View style={styles.innerText}>
        <Text style={styles.textBold}>Ngày: </Text>
        <Text style={styles.text}>{formatDate(item.time_start)}</Text>
      </View>

      <View style={styles.innerText}>
        <Text style={styles.textBold}>Giá thuê: </Text>
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
          {getStatusText(item.status).toUpperCase()}
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

  console.log(booked);

  return (
    <View style={styles.container}>
      {!loading && (
        <FlatList
          data={booked || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không có đơn đặt sân nào!</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "98%",
    marginHorizontal: "auto",
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
    textAlign: "center",
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
  emptyText: {
    textAlign: "center",
    fontSize: 24,
    color: "#707070",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default MyBook;
