import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { truncate } from "lodash";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/MaterialIcons";

const BookingScreen = ({ route, navigation }) => {
  const { fieldId } = route.params || {};

  // Initial sample booking data
  const initialBookings = {
    "2024-06-10": [
      { startTime: "08:00", endTime: "10:00", booked: true },
      { startTime: "10:00", endTime: "12:00", booked: false },
    ],
    "2024-06-12": [{ startTime: "14:00", endTime: "16:00", booked: true }],
  };

  const [bookings, setBookings] = useState(initialBookings);
  const [selectedDates, setSelectedDates] = useState(
    Object.keys(initialBookings)
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});

  console.log("bookings", bookings);

  // Fake data for titles
  const fakeTitles = [
    "Football với Thăng Long",
    "Football với Thăng Long",
    "Football với Thăng Long",
  ];

  // Fake data for start and end times
  const fakeData = [
    { id: 1, startTime: "08:00", endTime: "10:00" },
    { id: 2, startTime: "10:00", endTime: "12:00" },
    { id: 3, startTime: "14:00", endTime: "16:00" },
    // Add more fake data as needed
  ];

  // Function to truncate title to 20 words and add ellipsis
  const truncateTitle = (title) => {
    return (
      truncate(title, {
        length: 21,
        separator: " ",
      }) + "..."
    );
  };

  const onDayPress = (day) => {
    const currentDate = new Date();
    const selectedDate = new Date(day.dateString);

    if (selectedDate >= currentDate) {
      const date = day.dateString;
      if (!bookings[date]) {
        const newBookings = {
          ...bookings,
          [date]: fakeData.map(({ startTime, endTime }) => ({
            startTime,
            endTime,
            booked: false,
          })),
        };
        setBookings(newBookings);
        setSelectedDates([...selectedDates, date]);
      }
    } else {
      // Do something to notify the user that they cannot book for past dates
      console.log("Cannot book for past dates");
    }
  };

  const deleteBooking = (date, timeSlotIndex) => {
    if (bookings[date]) {
      const newBookings = { ...bookings };
      newBookings[date] = [
        ...newBookings[date].slice(0, timeSlotIndex),
        ...newBookings[date].slice(timeSlotIndex + 1),
      ];
      if (newBookings[date].length === 0) {
        delete newBookings[date];
        setSelectedDates(selectedDates.filter((d) => d !== date));
      }
      setBookings(newBookings);
    }
  };

  const acceptBooking = (date) => {
    // Handle accepting booking logic here
    console.log("Accepted booking for date", date);
    const selectedSlot = selectedTimeSlots[date];
    if (selectedSlot) {
      const newBookings = {
        ...bookings,
        [date]: bookings[date].map((slot) => {
          if (slot === selectedSlot) {
            return {
              ...slot,
              booked: true,
            };
          }
          return slot;
        }),
      };
      setBookings(newBookings);
    }
  };

  const recoveryBooking = (date) => {
    const selectedSlot = selectedTimeSlots[date];
    if (selectedSlot) {
      const newBookings = {
        ...bookings,
        [date]: bookings[date].map((slot) => {
          if (
            slot.startTime === selectedSlot.startTime &&
            slot.endTime === selectedSlot.endTime
          ) {
            return {
              ...slot,
              booked: false,
            };
          }
          return slot;
        }),
      };
      setBookings(newBookings);
      // Đặt lại khung giờ được chọn thành null sau khi phục hồi
      setSelectedTimeSlots({
        ...selectedTimeSlots,
        [date]: null,
      });
    }
  };

  const selectTimeSlot = (date, timeSlot) => {
    setSelectedTimeSlots({
      ...selectedTimeSlots,
      [date]: timeSlot,
    });
  };

  const sortedDates = selectedDates.sort((a, b) => new Date(a) - new Date(b));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch đặt cho sân {fieldId}</Text>
      <FlatList
        style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
        data={sortedDates}
        keyExtractor={(item) => item}
        renderItem={({ item: date }) => (
          <View
            style={{
              marginBottom: 15,
              padding: 15,
              backgroundColor: "rgba(240, 240, 240, 0.5)",
            }}
          >
            <Text style={styles.dateText}>{date}</Text>
            {bookings[date].map((timeSlot, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dateItem}
                onPress={() => {
                  setSelectedDate(date);
                  selectTimeSlot(date, timeSlot);
                }}
              >
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={styles.flatListHeader}>
                    {truncateTitle(fakeTitles[index])}
                  </Text>
                  <Text style={styles.timeText}>
                    {timeSlot.startTime} - {timeSlot.endTime}
                  </Text>
                </View>
                {selectedDate === date &&
                  selectedTimeSlots[date] === timeSlot &&
                  !timeSlot.booked && (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => deleteBooking(date, index)}
                      >
                        <FontAwesome name="trash-o" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, styles.acceptButton]}
                        onPress={() => acceptBooking(date)}
                      >
                        <AntDesign
                          name="checkcircleo"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                    </View>
                  )}

                {timeSlot.booked && (
                  <TouchableOpacity
                    style={[styles.button, styles.recoveryButton]}
                    onPress={() => recoveryBooking(date)}
                  >
                    <Text style={styles.buttonText}>
                      <Entypo name="check" size={24} color="green" />
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      <Icon.Button
        name={showCalendar ? "calendar-today" : "calendar-view-day"}
        backgroundColor="#3b5998"
        onPress={() => setShowCalendar(!showCalendar)}
      >
        {showCalendar ? "Ẩn Lịch" : "Hiện Lịch"}
      </Icon.Button>
      {showCalendar && (
        <Calendar
          markedDates={selectedDates.reduce((acc, date) => {
            const allBooked = bookings[date].every((slot) => slot.booked);
            const color = allBooked ? "#1646a9" : "#ff0000"; // Change color here based on booking status
            acc[date] = {
              selected: true,
              marked: true,
              selectedColor: color,
            };
            return acc;
          }, {})}
          onDayPress={onDayPress}
          style={styles.calendar}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  calendar: {
    marginVertical: 10,
  },
  dateItem: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1, // elevation vẫn được sử dụng cho các thiết bị Android
  },

  dateInfo: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  dateText: {
    fontSize: 16,
    marginVertical: "auto",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  timeText: {
    fontSize: 14,
    color: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: "auto",
    width: "38%",
  },
  button: {
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
    marginRight: 10,
    paddingHorizontal: 10,
  },
  acceptButton: {
    backgroundColor: "#00ff00",
    paddingHorizontal: 7,
  },
  recoveryButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: "auto",
    width: "38%",
  },
  buttonText: {
    color: "#ffffff",
  },
  flatListHeader: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default BookingScreen;
