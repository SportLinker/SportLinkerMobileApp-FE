import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

export default function ChatListItem({ seen, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("ChatDetailScreen")}>
      <View style={styles.chatItem}>
        <Avatar.Image
          size={45}
          source={{
            uri: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQlj3rCfLHry58AtJ8ZyBEAFPtChMddDSUSjt7C7nV3Nhsni9RIx5b0-n7LxfgerrPS6b-P-u3BOM3abuY",
          }}
          style={{ marginRight: 10 }}
        />
        <View>
          <View style={styles.chatTop}>
            <Text style={styles.userName}>Tài Võ</Text>
            <Text
              style={
                seen ? styles.textContent : [styles.textContent, styles.seen]
              }
            >
              10:10 am
            </Text>
          </View>
          <Text
            style={
              seen ? styles.textContent : [styles.textContent, styles.seen]
            }
            numberOfLines={1}
          >
            Chiều đi đá bóng nha ông Chiều đi đá bóng nha ông
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    borderWidth: 2,
    borderColor: "#F3F3F3",
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 20,
  },
  chatTop: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  textContent: {
    color: "#707070",
    fontSize: 14,
    maxWidth: 250,
    overflow: "hidden",
  },
  seen: {
    color: "black",
    fontWeight: "500",
  },
});
