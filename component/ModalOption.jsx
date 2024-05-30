import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ModalOption = ({ title, options, onOptionPress }) => {
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
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => onOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
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
});

export default ModalOption;
