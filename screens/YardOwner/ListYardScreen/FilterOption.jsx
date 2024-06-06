import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const fakeData = [
  {
    id: 1,
    label: "Tất cả",
  },
  {
    id: 2,
    label: "Hoạt động",
  },
  {
    id: 3,
    label: "Ngừng hoạt động",
  },
];

const options = {
  "Tất cả": {
    type: "all",
  },
  "Hoạt động": {
    type: "active",
  },
  "Ngừng hoạt động": {
    type: "inactive",
  },
};

export const FilterOptionList = ({ setFilterOptions }) => {
  const [activeOption, setActiveOption] = useState("Tất cả");

  const handleOptionPress = (type, label) => {
    console.log("Selected option:", type);

    setActiveOption(label);

    setFilterOptions((prevState) => ({
      ...prevState,
      status: type,
    }));
  };

  return (
    <View>
      <FlatList
        data={fakeData}
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
            onPress={() =>
              handleOptionPress(options[item.label].type, item.label)
            }
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
