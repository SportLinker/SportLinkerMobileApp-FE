import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import ModalOption from "../../../component/ModalOption";

const fakeData = [
  {
    id: 1,
    label: "Khoảng cách",
  },
  {
    id: 2,
    label: "Thời gian",
  },
];

const options = {
  "Khoảng cách": {
    type: "distance",
    title: "Lọc khoảng cách",
    options: [
      {
        label: "<5km",
        value: 5,
      },
      {
        label: "<10km",
        value: 10,
      },
      {
        label: "<15km",
        value: 15,
      },
      {
        label: "<20km",
        value: 20,
      },
    ],
  },
  "Thời gian": {
    type: "time",
    title: "Lọc thời gian",
    options: [
      {
        label: "4h - 11h",
        value: "4-11",
      },
      {
        label: "11h - 17h",
        value: "11-17",
      },
      {
        label: "17h - 0h",
        value: "17-0",
      },
    ],
  },
};

export const FilterEventOptionList = ({ setFilterOptions }) => {
  const [activeOption, setActiveOption] = useState(null);

  const handleSelectSport = (sport) => {
    console.log("Select sport", sport);
  };

  const handleOptionPress = (type, optionValue) => {
    console.log("Selected option:", optionValue);
    // Handle the option selection here
    if (type == "distance") {
      const newDistance = optionValue * 1000; // convert to meters
      setFilterOptions((prevState) => ({
        ...prevState,
        distance: newDistance,
      }));
    }
    if (type == "time") {
      const timeParts = optionValue.split("-"); // split optionValue to get two time parts
      const start_time = parseInt(timeParts[0], 10); // parse string to integer
      const end_time = parseInt(timeParts[1], 10); // parse string to integer
      console.log("time: " + start_time, end_time);
      setFilterOptions((prevState) => ({
        ...prevState,
        start_time: start_time,
        end_time: end_time,
      }));
    }

    setActiveOption(null); // Close the modal after selecting an option
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
            textColor="white"
            mode="outlined"
            labelStyle={styles.buttonLabel}
            style={styles.button}
            onPress={() => setActiveOption(item.label)}
          >
            {item.label}
          </Button>
        )}
      />
      <Portal>
        {activeOption == "Thể thao" && (
          <SportSelectionPopup
            onSelectSport={handleSelectSport}
            onClose={() => setActiveOption(null)}
            visible={!!activeOption}
          />
        )}
        <Modal
          visible={!!activeOption}
          onDismiss={() => setActiveOption(null)}
          contentContainerStyle={styles.modalContainer}
          style={{
            justifyContent: "flex-end",
          }}
        >
          {activeOption != "Thể thao" && (
            <ModalOption
              title={options[activeOption]?.title}
              optionItem={options[activeOption]}
              onOptionPress={handleOptionPress}
            />
          )}
        </Modal>
      </Portal>
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
    backgroundColor: "#707070",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default FilterEventOptionList;
