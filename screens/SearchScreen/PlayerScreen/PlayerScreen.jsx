import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { styles } from "../../../component/style";
import FilterEventOptionList from "../EventScreen/FilterEventOptionList";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlayers } from "../../../redux/slices/eventSlice";
import {
  getAllPlayersSelector,
  getEventLoadingtSelector,
} from "../../../redux/selectors";
import Loading from "../../../component/Loading";
import { convertHttpToHttps } from "../../../utils";

export const mock_data = [
  { id: 1, name: "Tai Vo", star: "true" },
  { id: 2, name: "Tai Vo", star: "false" },
  { id: 3, name: "Tai Vo", star: "false" },
  { id: 4, name: "Tai Vo", star: "true" },
  { id: 5, name: "Tai Vo", star: "false" },
  { id: 6, name: "Tai Vo", star: "true" },
  { id: 7, name: "Tai Vo", star: "false" },
  { id: 8, name: "Tai Vo", star: "true" },
  { id: 9, name: "Tai Vo", star: "false" },
];

export default function PlayerScreen({ navigation }) {
  const dispatch = useDispatch();
  const getAllPlayersFromRedux = useSelector(getAllPlayersSelector);
  const eventLoadingtSelector = useSelector(getEventLoadingtSelector);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, []);

  console.log(eventLoadingtSelector);

  if (!getAllPlayersFromRedux) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", minHeight: 600 }}>
      {/* <FilterEventOptionList /> */}
      {eventLoadingtSelector ? (
        <Loading
          message={"Loading..."}
          visible={eventLoadingtSelector}
        ></Loading>
      ) : (
        <ScrollView>
          {getAllPlayersFromRedux.length > 0 ? (
            <View
              style={{ alignItems: "center", marginTop: 20, paddingBottom: 30 }}
            >
              {getAllPlayersFromRedux.map((item) => (
                <View key={item.id} style={styles.containerPlayer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailPlayerScreen", { item })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 20,
                      }}
                    >
                      <Avatar.Image
                        size={40}
                        source={{
                          uri: convertHttpToHttps(item.avatar_url),
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            marginHorizontal: 20,
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          {item.username}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              marginLeft: 20,
                              marginRight: 10,
                              fontSize: 14,
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text>-</Text>
                          {item.favorite?.length - 1 < 2 &&
                          item.favorite?.length > 0 ? (
                            <Text> Yêu thích {item.favorite[0]}</Text>
                          ) : item.favorite?.length > 0 ? (
                            <Text
                              style={{
                                fontSize: 14,
                                marginLeft: 10,
                              }}
                            >
                              Yêu thích {item.favorite[0]} và{" "}
                              {item.favorite?.length - 1} môn
                            </Text>
                          ) : (
                            <Text> Yêu thích không có</Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text
              style={{
                color: "#1646A9",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Không có thông tin phù hợp
            </Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
