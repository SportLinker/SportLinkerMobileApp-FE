import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getSportIcon, sports } from "../utils/constant";
import { useEffect, useState } from "react";

//count total sport of the system
const TOTAL_SPORT = sports.length;

const SportSelectOptions = ({
  visible,
  onDismiss,
  onClose,
  setSportFilter,
  sportFilter,
  favSport,
}) => {
  //Favorite sports of user
  const mySport =
    favSport && sports.filter((sport) => favSport.includes(sport.sport_name));

  //Other sports of the system
  const otherSport = favSport
    ? sports.filter((sport) => !favSport.includes(sport.sport_name))
    : sports;

  //temporary save the sport selected
  const [sportSelected, setSportSelected] = useState(
    mySport ? mySport : sportFilter
  );

  //temporary count the sport selected
  const [sportSelectedCount, setSportSelectedCount] = useState(
    sportFilter.length
  );

  const isTwoArrSportEqual = (sportArr1, sportArr2) => {
    if (sportArr1 && sportArr2) {
      const sportNameArr1 = sportArr1.map((sport) => sport.sport_name);

      //find the same sport items between two arrays
      const result = sportArr2.filter((sport) =>
        sportNameArr1.includes(sport.sport_name)
      );

      //two array equal when them have the same sport item and their length is equal
      if (
        result.length == sportArr1.length &&
        result.length == sportArr2.length
      ) {
        return true;
      }

      return false;
    }
  };

  const handleOptionPress = (option) => {
    console.log(option);
    switch (option) {
      case "Tất cả":
        setSportSelected([...sports]);
        setSportSelectedCount(sports.length);
        break;
      case "Của tôi":
        setSportSelected([...mySport]);
        setSportSelectedCount(mySport.length);
        break;

      //For cases user press sport items
      default:
        //if the filter sport state is "Tất cả" or "Của tôi" then remove and choose the sport selected
        if (
          isTwoArrSportEqual(sportSelected, sports) ||
          isTwoArrSportEqual(sportSelected, mySport)
        ) {
          setSportSelected([option]);
          setSportSelectedCount(1);
        }

        //if the filter sport state is not "Tất cả" or "Của tôi"
        if (
          sportSelected.find(
            (sport) => sport.sport_name == option.sport_name
          ) == undefined
        ) {
          //if sport item not selected before -> add to selected array
          setSportSelected([...sportSelected, option]);
          setSportSelectedCount(sportSelectedCount + 1);
        } else {
          console.log(sportSelectedCount - 1);
          //if sport item selected before -> remove from selected array
          setSportSelected(
            sportSelected.filter(
              (sport) => sport.sport_name != option.sport_name
            )
          );
          setSportSelectedCount(sportSelectedCount - 1);
        }
        break;
    }
  };

  const handleSubmitFilter = () => {
    setSportFilter(sportSelected);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onDismiss={onDismiss}
      onClose={onClose}
      setSportFilter={setSportFilter}
      contentContainerStyle={styles.modalContainer}
    >
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Lọc môn thể thao</Text>
          <Button
            mode="contained"
            onPress={() => handleSubmitFilter()}
            labelStyle={[styles.buttonLabel]}
            style={[
              styles.button,
              {
                borderRadius: 5,
                backgroundColor:
                  // sportSelectedCount == 0 ? "#707070" : "#1646A9",
                  "#1646A9",
              },
            ]}
            // disabled={sportSelectedCount == 0}
          >
            Xác nhận
          </Button>
        </View>
        <ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              labelStyle={[styles.buttonLabel]}
              style={[
                styles.button,
                sportSelectedCount == TOTAL_SPORT && styles.buttonActive,
              ]}
              mode="contained"
              onPress={() => handleOptionPress("Tất cả")}
            >
              Tất cả
            </Button>
            {mySport && (
              <Button
                labelStyle={styles.buttonLabel}
                style={[
                  styles.button,
                  isTwoArrSportEqual(sportSelected, mySport) &&
                    styles.buttonActive,
                ]}
                mode="contained"
                onPress={() => handleOptionPress("Của tôi")}
              >
                Của tôi
              </Button>
            )}
            {sportSelectedCount != TOTAL_SPORT && (
              <Button
                labelStyle={styles.buttonLabel}
                style={[styles.button, styles.buttonActive]}
                mode="contained"
                onPress={() => handleOptionPress("Của tôi")}
              >
                Đã chọn • {sportSelectedCount}
              </Button>
            )}
          </View>
          {mySport && mySport?.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.subTitle}>Thể thao của tôi</Text>
              <View style={styles.sportItemContainer}>
                {mySport.map((sport, index) => (
                  <TouchableOpacity
                    key={index + sport.value}
                    style={[
                      styles.sportItem,
                      sportSelected.find(
                        (selected) => selected.sport_name == sport.sport_name
                      ) != undefined && {
                        backgroundColor: "#4878D9",
                      },
                    ]}
                    onPress={() => handleOptionPress(sport)}
                  >
                    <Icon
                      color={"white"}
                      name={getSportIcon(sport.sport_name)}
                      size={36}
                    />
                    <Text style={styles.sportName}>{sport.sport_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {otherSport && otherSport?.length > 0 && (
            <View style={[styles.sectionContainer, { borderBottomWidth: 0 }]}>
              <Text style={styles.subTitle}>
                {favSport ? "Các môn khác" : "Môn thể thao"}
              </Text>
              <View style={styles.sportItemContainer}>
                {otherSport.map((sport, index) => (
                  <TouchableOpacity
                    key={index + sport.value}
                    style={[
                      styles.sportItem,
                      sportSelected.find(
                        (selected) => selected.sport_name == sport.sport_name
                      ) != undefined && {
                        backgroundColor: "#4878D9",
                      },
                    ]}
                    onPress={() => handleOptionPress(sport)}
                  >
                    <Icon
                      color={"white"}
                      name={getSportIcon(sport.sport_name)}
                      size={36}
                    />
                    <Text style={styles.sportName}>{sport.sport_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: 5,
    marginHorizontal: "5%",
    marginTop: "20%",
    marginBottom: "20%",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    zIndex: 2,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
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
  buttonActive: {
    backgroundColor: "#4878D9",
  },
  headerContainer: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionContainer: {
    display: "flex",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
  },
  sportItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    flexWrap: "wrap",
    gap: 10,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    color: "#707070",
    marginTop: 10,
  },
  sportItem: {
    width: "30%",
    minHeight: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#707070",
    borderRadius: 7,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  sportName: {
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    color: "white",
  },
});

export default SportSelectOptions;
