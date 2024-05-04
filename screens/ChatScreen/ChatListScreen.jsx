import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import ChatListItem from "./ChatListItem";

export default function ChatListScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.chatHeader}>
        <Text style={styles.titleHeader}>Trò Chuyện</Text>
        <Searchbar
          placeholder="Tìm bạn trò chuyện"
          onChangeText={setSearchQuery}
          value={searchQuery}
          iconColor="#1646A9"
          inputStyle={styles.textInput}
          style={styles.searchInput}
        />
      </View>
      <View style={styles.chatBody}>
        <ScrollView>
          <ChatListItem seen={false} navigation={navigation} />
          <ChatListItem seen={false} navigation={navigation} />
          <ChatListItem seen={false} navigation={navigation} />
          <ChatListItem seen={true} navigation={navigation} />
          <ChatListItem seen={true} navigation={navigation} />
          <ChatListItem seen={true} navigation={navigation} />
        </ScrollView>
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
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingTop: 30,
    paddingHorizontal: 10,
    marginTop: -45,
  },
});
