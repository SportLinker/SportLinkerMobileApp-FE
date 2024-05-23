import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate, formatTime } from "../../../../utils";
import { maxDate, minDate } from "../../../../utils/constant";
import SportSelectionPopup from "../SportSelectionPopup";

const StepOne = ({
  eventName,
  setEventName,
  clubName,
  setClubName,
  eventDate,
  setShowDatePicker,
  showDatePicker,
  handleDateChange,
  eventTime,
  setShowTimePicker,
  showTimePicker,
  handleTimeChange,
  selectedSport,
  setSelectedSport,
}) => {
  const [showSportPicker, setShowSportPicker] = useState(false);

  return (
    <ScrollView>
      <View style={styles.stepContainer}>
        <Text style={styles.textTitle}>Chi Tiết</Text>
        <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Tên sự kiện </Text>
        </View>
        <TextInput
          mode="outlined"
          activeUnderlineColor="#1646A9"
          textColor="#1646A9"
          value={eventName}
          onChangeText={(text) => setEventName(text)}
          placeholder="Điền tên sự kiện..."
          style={styles.textInput}
          outlineColor="#1646A9"
          placeholderTextColor="#1646A9"
        />
        {/* <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Tên CLB </Text>
        </View>
        <TextInput
          mode="outlined"
          activeUnderlineColor="#1646A9"
          textColor="#1646A9"
          value={clubName}
          onChangeText={(text) => setClubName(text)}
          placeholder="Điền tên clb..."
          placeholderTextColor="#1646A9"
          style={styles.textInput}
          outlineColor="#1646A9"
        /> */}
        <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Ngày diễn ra sự kiện</Text>
        </View>
        <TouchableOpacity
          style={styles.inputDate}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateValue}>{formatDate(eventDate)}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={eventDate}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={handleDateChange}
            minimumDate={minDate} // Ngày tối thiểu (ngày hiện tại)
            maximumDate={maxDate} // Ngày tối đa (1 năm sau)
            textColor="#1646A9"
          />
        )}
        <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Giờ diễn ra sự kiện</Text>
        </View>
        <TouchableOpacity
          style={styles.inputDate}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateValue}>{formatTime(eventTime)}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={eventTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleTimeChange}
            minuteInterval={30}
            textColor="#1646A9"
          />
        )}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowSportPicker(true)}
        >
          <View style={styles.justifyLeft}>
            <Text style={styles.dateLabel}>Môn thể thao</Text>
          </View>
          <View style={styles.selectedSportContainer}>
            {selectedSport ? (
              <View style={{ flex: 1 }}>
                <Icon
                  name={selectedSport.icon}
                  size={30}
                  style={{
                    marginTop: 10,
                    textAlign: "center",
                    color: "white",
                  }} // Adjust the marginTop to center the icon
                />
                <Text
                  style={{ color: "white", fontSize: 14, textAlign: "center" }}
                >
                  {selectedSport.label}
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <Text style={styles.placeholderText}>Chọn môn thể thao</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <SportSelectionPopup
          visible={showSportPicker}
          onClose={() => setShowSportPicker(false)}
          onSelectSport={(sport) => setSelectedSport(sport)}
        />
      </View>
    </ScrollView>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  stepContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "700",
    marginBottom: 20,
  },
  textInput: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 10,
  },
  inputDate: {
    marginBottom: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#1646A9",
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
  },
  justifyLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#707070",
    textAlign: "center",
  },
  dateValue: {
    fontSize: 16,
    color: "#1646A9",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown: {
    marginBottom: 15,
    width: "100%",
  },
  selectedSportContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 20,
    borderRadius: 5,
    backgroundColor: "#1646A9",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  placeholderText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
});
