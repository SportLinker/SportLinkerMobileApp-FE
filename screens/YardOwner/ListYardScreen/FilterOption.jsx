import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const FilterOptionList = ({ setFilterOptions, yards }) => {
  const [activeOption, setActiveOption] = useState("Tất cả");

  const filteredStadium = yards.filter(
    (stadium) => stadium.stadium.stadium_status === "approved"
  );

  const uniqueStadiumNames = [
    ...new Set(filteredStadium.map((yard) => yard.stadium.stadium_name)),
  ];

  const options = [
    { id: "all", label: "Tất cả" },
    ...uniqueStadiumNames.map((stadiumName, index) => ({
      id: stadiumName, // Use only stadiumName for id
      label: stadiumName,
    })),
  ];

  const handleOptionPress = (stadiumName, label) => {
    setActiveOption(label);
    setFilterOptions({ stadiumName: stadiumName === "all" ? "all" : label });
  };

  return (
    <View>
      <FlatList
        data={options}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        keyExtractor={(item) => item.id}
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
