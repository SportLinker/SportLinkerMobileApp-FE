import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../component/style";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/selectors";

const Profile = () => {
  const userSelector = useSelector(getUserSelector);
  const { favorite } = userSelector;

  return (
    <>
      {favorite.length > 0 ? (
        <>
          <View style={styles.topInfoSport}>
            <Text style={{ color: "#707070", fontWeight: "bold" }}>
              {"Thể thao yêu thích".toUpperCase()}
            </Text>
          </View>
          <View style={styles.centerStyle}>
            {favorite.map((item, index) => (
              <View key={index} style={styles.innerInfoSport}>
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 20,
                    paddingVertical: 20,
                  }}
                >
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text>{item}</Text>
                  </View>
                  <View>
                    <AntDesign name="right" size={24} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.favSportEmpty}>
          Không có môn thể thao yêu thích
        </Text>
      )}
    </>
  );
};

export default Profile;
