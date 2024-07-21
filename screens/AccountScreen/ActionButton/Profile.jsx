import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../../component/style";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/selectors";
import { getSportIcon } from "../../../utils/constant";

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
          <ScrollView>
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
                    <View>
                      <Text style={styles.textFav}>{item}</Text>
                    </View>
                    <View>
                      {/* <AntDesign name="right" size={24} color="#000" /> */}
                      <Icon size={24} color="#000" name={getSportIcon(item)} />
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
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
