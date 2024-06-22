import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getAllSportSelector } from "../../../../redux/selectors";
import { getAllSport } from "../../../../redux/slices/yardSlice";
import { useDispatch, useSelector } from "react-redux";

const SportSelectionPopup = ({ visible, onClose, onSelectSport }) => {
  const dispatch = useDispatch();

  const sportList = useSelector(getAllSportSelector);
  const [sports, setSports] = useState("");
  useEffect(() => {
    dispatch(getAllSport());
  }, []);

  useEffect(() => {
    if (sportList) setSports(sportList);
  }, [sportList]);

  // console.log("sports", sports);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      style={{
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={styles.modalSubContainer}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View style={styles.modalContainer}>
          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity> */}
          <View style={styles.content}>
            {sports &&
              sports.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => {
                    onSelectSport(item.sport_name);
                    onClose();
                  }}
                >
                  <View style={styles.sportItem}>
                    <Icon name={item.icon} size={20} color={"white"} />
                    <Text style={{ marginLeft: 10, color: "white" }}>
                      {item.sport_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SportSelectionPopup;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: 400,
    width: "80%",
    overflow: "hidden",
  },
  sportItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#1646A9",
    marginVertical: 10,
    borderRadius: 10,
  },
  closeButton: {
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: "#1646A9",
    borderRadius: 5,
    width: "80%",
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  modalSubContainer: {
    flex: 1,
  },
});
