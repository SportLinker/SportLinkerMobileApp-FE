import React from "react";
import { View, StyleSheet } from "react-native";
import RadioButton from "./RadioButton";

const RadioButtonGroup = ({ options, selected, setSelected }) => {
  const handlePress = (value) => {
    setSelected(value);
  };

  return (
    <View>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={option.value === selected}
          onPress={handlePress}
        />
      ))}
    </View>
  );
};

export default RadioButtonGroup;
