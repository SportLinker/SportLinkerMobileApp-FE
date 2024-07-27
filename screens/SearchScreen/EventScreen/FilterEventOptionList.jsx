import React, { useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Button, Modal, Portal } from "react-native-paper";
import ModalOption from "../../../component/ModalOption";
import { DEFAULT_DISTACNCE, sports } from "../../../utils/constant";
import SportSelectOptions from "../../../component/SportSelectOptions";

const my_sport = ["Bóng đá", "Bóng chuyền"];

const fakeData = [
  {
    id: 1,
    label: "Khoảng cách",
  },
  {
    id: 2,
    label: "Thời gian",
  },
  {
    id: 3,
    label: "Thể thao",
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
        label: "0h - 23h",
        value: "0-23",
      },
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
  "Thể thao": {
    type: "sport",
    title: "Lọc môn thể thao",
    options: sports,
  },
};

export const FilterEventOptionList = ({
  filterOptions,
  setFilterOptions,
  sportFilter,
  setSportFilter,
}) => {
  const [activeOption, setActiveOption] = useState(null);

  const handleOptionPress = (type, optionValue) => {
    console.log("Selected option:", optionValue);
    // Handle the option selection here
    if (type == "distance") {
      const newDistance = optionValue * 1000; // convert to meters
      if (newDistance == filterOptions.distance) {
        //if select to the aldready selected option will remove this option and using default option
        setFilterOptions((prevState) => ({
          ...prevState,
          distance: DEFAULT_DISTACNCE,
        }));
      } else {
        setFilterOptions((prevState) => ({
          ...prevState,
          distance: newDistance,
        }));
      }
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

  const checkActiveBtn = (button) => {
    let result = false;

    //check the filter value with the default filter if different then active
    if (button.label == "Khoảng cách") {
      result = filterOptions.distance != DEFAULT_DISTACNCE;
    }
    if (button.label == "Thời gian") {
      result = filterOptions.start_time != 0 && filterOptions.end_time != 23;
    }
    if (button.label == "Thể thao") {
      result = filterOptions.sport_name != "";
    }
    return result;
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={fakeData}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            textColor="white"
            mode="contained"
            labelStyle={[
              styles.buttonLabel,
              checkActiveBtn(item) && styles.buttonActive,
            ]}
            style={styles.button}
            onPress={() => setActiveOption(item.label)}
          >
            {item.label}
          </Button>
        )}
      />

      <Portal>
        {activeOption == "Thể thao" && (
          <SportSelectOptions
            sportFilter={sportFilter}
            setSportFilter={setSportFilter}
            onClose={() => setActiveOption(null)}
            onDismiss={() => setActiveOption(null)}
            visible={!!activeOption}
            favSport={my_sport}
          />
        )}
        {activeOption && activeOption != "Thể thao" && (
          <Modal
            visible={!!activeOption}
            onDismiss={() => setActiveOption(null)}
            contentContainerStyle={styles.modalContainer}
            style={{
              justifyContent: "flex-end",
            }}
          >
            <ModalOption
              filterOptions={filterOptions}
              title={options[activeOption]?.title}
              optionItem={options[activeOption]}
              onOptionPress={handleOptionPress}
            />
          </Modal>
        )}
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#F7F7F7",
    flex: 1,
  },
  buttonLabel: {
    marginVertical: 0,
    fontSize: 12,
    paddingVertical: 10,
    textAlign: "center",
    paddingHorizontal: 20,
    marginHorizontal: 0,
  },
  button: {
    marginHorizontal: 5,
    marginVertical: 10,
    paddingVertical: 0,
    height: "70%",
    backgroundColor: "#707070",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonActive: {
    backgroundColor: "#4878D9",
  },
});

export default FilterEventOptionList;
