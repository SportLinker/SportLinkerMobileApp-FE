import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const FilterOptionList = ({ setFilterOptions, yards }) => {
  const [activeOption, setActiveOption] = useState("Tất cả");

  const options = [
    { id: "all", label: "Tất cả" },
    ...yards.map((yard, index) => ({
      id: `${yard.stadium.stadium_name}_${index}`, // Use a combination to ensure uniqueness
      label: yard.stadium.stadium_name,
    })),
  ];

  const handleOptionPress = (stadiumName, label) => {
    setActiveOption(label);
    setFilterOptions({ stadiumName });
  };

  return (
    <View>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            textColor={activeOption === item.label ? "white" : "black"}
            mode="outlined"
            labelStyle={styles.buttonLabel}
            style={[
              styles.button,
              {
                backgroundColor:
                  activeOption === item.label ? "#1646a9" : "#707070",
              },
            ]}
            onPress={() => handleOptionPress(item.id, item.label)}
          >
            {item.label}
          </Button>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#F7F7F7",
  },
  buttonLabel: {
    marginVertical: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 0,
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 10,
    height: 40,
  },
});

export default FilterOptionList;
