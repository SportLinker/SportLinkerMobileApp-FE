import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllYardSelector,
  getLoadingSelector,
} from "../../../redux/selectors";
import { getAllYardByOwner } from "../../../redux/slices/yardSlice";
import FilterOptionList from "../ListYardScreen/FilterOption";
import Loading from "../../../component/Loading";

const OrderYardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const yardList = useSelector(getAllYardSelector);
  const loading = useSelector(getLoadingSelector);

  const [yards, setYard] = useState(null);
  const [filterOptions, setFilterOptions] = useState({ stadiumName: "all" });

  useEffect(() => {
    dispatch(getAllYardByOwner());
  }, []);

  useEffect(() => {
    if (yardList) {
      setYard(yardList);
    }
  }, [yardList]);

  const filteredData =
    filterOptions.stadiumName === "all"
      ? yards
      : yards.filter(
          (item) => item.stadium.stadium_name === filterOptions.stadiumName
        );

  return (
    <View style={styles.container}>
      <FilterOptionList
        setFilterOptions={setFilterOptions}
        yards={yards || []}
      />
      {!loading ? (
        <FlatList
          data={filteredData || []}
          keyExtractor={(item) => item.yard_id}
          renderItem={({ item }) => (
            <View style={styles.fieldContainer}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.fieldName}>{item.yard_name}</Text>
                <Text>{item.yard_sport}</Text>
              </View>
              <Button
                title="Xem đặt sân"
                color="#1446a9"
                onPress={() =>
                  navigation.navigate("Booking", {
                    yard_name: item.yard_name,
                    booking: item.BookingYard,
                    price: item.price_per_hour,
                  })
                }
              />
            </View>
          )}
        />
      ) : (
        <Loading message={"Loading..."} visible={loading} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  fieldContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
});

export default OrderYardScreen;
