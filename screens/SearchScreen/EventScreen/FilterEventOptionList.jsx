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
    title: "Lọc khoảng cách",
    options: ["<5km", "<10km", "<15km", "<20km"],
  },
  "Thời gian": {
    title: "Lọc thời gian",
    options: ["4h - 11h", "11h - 17h", "17h - 0h"],
  },
};

export const FilterEventOptionList = () => {
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionPress = (option) => {
    console.log("Selected option:", option);
    // Handle the option selection here
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
        <Modal
          visible={!!activeOption}
          onDismiss={() => setActiveOption(null)}
          contentContainerStyle={styles.modalContainer}
          style={{
            justifyContent: "flex-end",
          }}
        >
          {activeOption && (
            <ModalOption
              title={options[activeOption].title}
              options={options[activeOption].options}
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
    marginHorizontal: 0,
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
