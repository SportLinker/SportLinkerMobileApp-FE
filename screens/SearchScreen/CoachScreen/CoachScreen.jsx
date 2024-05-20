import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../component/style";
import DetailCoachScreen from "./DetailCoachScreen";

export default function CoachScreen({ navigation }) {
  const fakeData = [
    {
      name: "Ninh",
      icon: "soccer-ball",
      sport: "Bóng đá",
      description:
        "15-year-old soccer player. University captain amateur teams and players in the US",
      distance: "3km",
    },
    {
      name: "Hùng",
      icon: "basketball",
      sport: "Bóng rổ",
      description:
        "17-year-old basketball player. MVP in local high school tournaments",
      distance: "5km",
    },
    {
      name: "Trang",
      icon: "person-running",
      sport: "Chạy bộ",
      description:
        "25-year-old marathon runner. Completed 3 marathons in the last 2 years",
      distance: "10km",
    },
    {
      name: "Dũng",
      icon: "person-swimming",
      sport: "Bơi lội",
      description:
        "20-year-old swimmer. National level competitor with multiple awards",
      distance: "2km",
    },
    {
      name: "Lan",
      icon: "volleyball",
      sport: "Bóng chuyền",
      description:
        "19-year-old volleyball player. Captain of college volleyball team",
      distance: "4km",
    },
    {
      name: "Minh",
      icon: "table-tennis-paddle-ball",
      sport: "Quần vợt",
      description: "22-year-old tennis player. Ranked in top 10 of the state",
      distance: "6km",
    },
  ];

  const [modalVisible, setModalVisible] = React.useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.centerStyle, styles.marginTopText]}>
          {fakeData.map((item, index) => (
            <View key={index} style={styles.innerInfoSport}>
              <TouchableOpacity
                onPress={() => navigation.navigate("DetailCoachScreen")}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginTop: 10,
                }}
              >
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Avatar.Image
                    size={60}
                    source={{
                      uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
                    }}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <Text
                        style={{
                          marginBottom: 5,
                          fontSize: 16,
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 10,
                          paddingTop: 5,
                          color: "#707070",
                        }}
                      >
                        {item.distance}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <FontAwesome6
                        name={item.icon}
                        size={24}
                        color="#000"
                        style={{
                          marginRight: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          paddingTop: 5,
                          color: "#707070",
                        }}
                      >
                        {item.sport}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 15 }}>
                  <AntDesign name="right" size={24} color="#000" />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: 1,
                  marginVertical: 5,
                  borderColor: "#C4C4C4",
                }}
              />
              <View style={styles.bottomInfoSport}>
                <View style={styles.centerStyle}>
                  <Text style={{ fontWeight: "bold", padding: 10 }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
