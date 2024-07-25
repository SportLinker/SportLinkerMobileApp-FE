import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../component/Loading";
import PremiumIcon from "../../../component/PremiumIcon";
import {
  getAllPlayersSelector,
  getEventLoadingtSelector,
} from "../../../redux/selectors";
import { getAllPlayers } from "../../../redux/slices/eventSlice";
import { convertHttpToHttps } from "../../../utils";

export default function PlayerScreen({ navigation }) {
  const dispatch = useDispatch();
  const getAllPlayersFromRedux = useSelector(getAllPlayersSelector);
  const eventLoadingtSelector = useSelector(getEventLoadingtSelector);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, []);

  if (!getAllPlayersFromRedux)
    return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      {eventLoadingtSelector ? (
        <Loading message="Loading..." visible={eventLoadingtSelector} />
      ) : (
        <ScrollView>
          {getAllPlayersFromRedux.length > 0 ? (
            <View style={styles.playerContainer}>
              {getAllPlayersFromRedux.map((item) => (
                <View key={item.id} style={styles.playerCard}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("DetailPlayerScreen", { item })
                    }
                  >
                    <View style={styles.playerRow}>
                      <Avatar.Image
                        size={40}
                        source={{ uri: convertHttpToHttps(item.avatar_url) }}
                      />
                      <View>
                        <Text style={styles.playerName}>
                          {item.username}
                          {item.is_premium && <PremiumIcon />}
                        </Text>
                        <View style={styles.playerDetails}>
                          <Text style={styles.favoriteText}>{item.name}</Text>
                          {item.favorite?.length > 0 ? (
                            <Text style={styles.favoriteText}>
                              Yêu thích {item.favorite[0]}
                              {item.favorite.length > 1 &&
                                ` và ${item.favorite.length - 1} môn`}
                            </Text>
                          ) : (
                            <Text style={styles.favoriteText}>
                              Yêu thích không có
                            </Text>
                          )}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noInfoText}>Không có thông tin phù hợp</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: 600,
  },
  loadingText: {
    fontSize: 20,
    textAlign: "center",
    color: "#1646A9",
    marginVertical: 20,
  },
  playerContainer: {
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 30,
  },
  playerCard: {
    width: "90%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  playerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerName: {
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  playerDetails: {
    flexDirection: "column",
    marginLeft: 20,
  },
  favoriteText: {
    paddingLeft: 20,
    fontSize: 14,
  },
  noInfoText: {
    color: "#1646A9",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
});
