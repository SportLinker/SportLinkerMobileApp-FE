import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

const fakeData = [
  {
    id: 1,
    label: "Khoảng cách",
  },
  {
    id: 2,
    label: "Thời gian",
  },
  // {
  //   id: 3,
  //   label: "Thời gian",
  // },
  // {
  //   id: 4,
  //   label: "Thời gian",
  // },
];

const FilterEventOptionList = () => {
  return (
    <FlatList
      data={fakeData}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: "#F7F7F7" }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index, separators }) => (
        <Button
          textColor="white"
          mode="outlined"
          labelStyle={{
            marginVertical: 0,
            marginHorizontal: 0,
          }}
          style={{
            marginHorizontal: 5,
            marginVertical: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            height: 40,
            backgroundColor: "#707070",
          }}
        >
          {item.label}
        </Button>
      )}
    />
  );
};

export default FilterEventOptionList;
