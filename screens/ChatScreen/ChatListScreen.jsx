import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import ChatListItem from "./ChatListItem";
import { useDispatch, useSelector } from "react-redux";
import { getListMessage } from "../../redux/slices/messageSlice";
import { getListMessageSelector } from "../../redux/selectors";
import Loading from "../../component/Loading";

export default function ChatListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { chatList, loading, error } = useSelector(
    (state) => state.messageSlice
  );
  const { userInfo } = useSelector((state) => state.userSlice);

    useEffect(() => {
    dispatch(getListMessage());
  }, [dispatch]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => dispatch(getListMessage())}>
          <Text style={styles.titleHeader}>Trò Chuyện</Text>
        </TouchableOpacity>
        <Searchbar
          placeholder="Tìm bạn trò chuyện"
          onChangeText={setSearchQuery}
          value={searchQuery}
          iconColor="#1646A9"
          inputStyle={styles.textInput}
          style={styles.searchInput}
          placeholderTextColor="#707070"
        />
      </View>
      <View style={styles.chatBody}>
        {loading ? (
          <Loading visible={loading} />
        ) : (
          <ScrollView>
            {chatList ? (
              chatList.map((chatItem, index) => (
                <ChatListItem
                  key={chatItem.group_message_id}
                  seen={false}
                  chatItem={chatItem}
                  navigation={navigation}
                />
              ))
            ) : (
              <Text>Không có đoạn chat nào</Text>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatHeader: {
    backgroundColor: "#1646A9",
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 70,
  },
  titleHeader: {
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 30,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  searchInput: {
    borderRadius: 5,
    backgroundColor: "white",
  },
  textInput: {
    fontSize: 16,
  },
  chatBody: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    // borderRadius: 40,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    paddingTop: 30,
    paddingHorizontal: 10,
    marginTop: -45,
  },
});
