import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ModalOption = ({ title, optionItem, onOptionPress, filterOptions }) => {
  const checkActiveBtn = (button) => {
    if (title == "Lọc thời gian") {
      return (
        `${filterOptions.start_time}-${filterOptions.end_time}` == button.value
      );
    }
    if (title == "Lọc khoảng cách") {
      return filterOptions.distance == button.value * 1000;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          borderBottomWidth: 2,
          marginVertical: 5,
          borderBottomColor: "#707070",
        }}
      />
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.optionsContainer}>
          {optionItem?.options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => onOptionPress(optionItem?.type, option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  checkActiveBtn(option) && styles.buttonActive,
                ]}
              >
                {option?.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: "row",
  },
  optionButton: {
    marginHorizontal: 5,
  },
  optionText: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  buttonActive: {
    backgroundColor: "#4878D9",
    color: "#fff",
  },
});

export default ModalOption;
