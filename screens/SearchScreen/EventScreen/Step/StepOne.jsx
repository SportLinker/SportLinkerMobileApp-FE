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
import SportSelectionPopup from "../SportSelectionPopup";

const StepOne = ({ values, setFieldValue, errors, touched }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showSportPicker, setShowSportPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(values.eventDate);
    setShowDatePicker(false);
    setFieldValue("eventDate", currentDate.toISOString());
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || new Date(values.eventTime);
    setShowTimePicker(false);
    setFieldValue("eventTime", currentTime.toISOString());
  };

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
          value={values.eventName}
          onChangeText={(text) => setFieldValue("eventName", text)}
          placeholder="Điền tên sự kiện..."
          style={styles.textInput}
          outlineColor="#1646A9"
          placeholderTextColor="#1646A9"
        />
        {errors.eventName && touched.eventName && (
          <Text style={styles.errorText}>{errors.eventName}</Text>
        )}
        <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Ngày diễn ra sự kiện</Text>
        </View>
        <TouchableOpacity
          style={styles.inputDate}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateValue}>
            {new Date(values.eventDate).toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(values.eventDate)}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={handleDateChange}
            textColor="#1646A9"
          />
        )}
        {errors.eventDate && touched.eventDate && (
          <Text style={styles.errorText}>{errors.eventDate}</Text>
        )}
        <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Giờ diễn ra sự kiện</Text>
        </View>
        <TouchableOpacity
          style={styles.inputDate}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.dateValue}>
            {new Date(values.eventTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={new Date(values.eventTime)}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleTimeChange}
            minuteInterval={30}
            textColor="#1646A9"
          />
        )}
        {errors.eventTime && touched.eventTime && (
          <Text style={styles.errorText}>{errors.eventTime}</Text>
        )}
        <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Thời lượng (Phút)</Text>
        </View>
        <TextInput
          textContentType="telephoneNumber"
          mode="outlined"
          activeUnderlineColor="#1646A9"
          textColor="#1646A9"
          value={values.duration}
          onChangeText={(text) => setFieldValue("duration", text)}
          placeholder="Nhập thời lượng sự kiện..."
          style={styles.textInput}
          outlineColor="#1646A9"
          placeholderTextColor="#1646A9"
          keyboardType="numeric"
        />
        {errors.duration && touched.duration && (
          <Text style={styles.errorText}>{errors.duration}</Text>
        )}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowSportPicker(true)}
        >
          <View style={styles.justifyLeft}>
            <Text style={styles.dateLabel}>Môn thể thao</Text>
          </View>
          <View style={styles.selectedSportContainer}>
            {values.selectedSport ? (
              <View style={{ flex: 1 }}>
                <Icon
                  name={values.selectedSport.icon}
                  size={30}
                  style={{
                    marginTop: 10,
                    textAlign: "center",
                    color: "white",
                  }}
                />
                <Text
                  style={{ color: "white", fontSize: 14, textAlign: "center" }}
                >
                  {values.selectedSport.label}
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
          onSelectSport={(sport) => setFieldValue("selectedSport", sport)}
        />
        {errors.selectedSport && touched.selectedSport && (
          <Text style={styles.errorText}>{errors.selectedSport}</Text>
        )}
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
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 10,
    marginBottom: 10,
  },
  inputDate: {
    marginBottom: 10,
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
    marginTop: 10,
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
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "left",
    width: "100%",
  },
});
