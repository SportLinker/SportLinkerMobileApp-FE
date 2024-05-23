import { useState } from "react";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";

const fakeData = [
  {
    title: "Người tổ chức",
    data: [
      {
        id: "owner1",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
    ],
  },
  {
    title: "Xác nhận tham gia",
    totalMember: 10,
    data: [
      {
        id: "m1",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
      {
        id: "m2",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
      {
        id: "m3",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
      {
        id: "m4",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
      {
        id: "m5",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
      {
        id: "m6",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
      {
        id: "m7",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
      {
        id: "m8",
        name: "Pham Long",
        avatar:
          "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
      },
    ],
  },
];

const EventMember = () => {
  const MemberItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Avatar.Image size={50} source={{ uri: item.avatar }} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    );
  };

  const renderSection = ({ section: { title, data } }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.sectionHeader}>{title}</Text>
      </View>
      <View style={styles.avatarContainer}>
        {data.map((item) => {
          return <MemberItem item={item} />;
        })}
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "white",
        zIndex: 0,
      }}
    >
      <SectionList
        stickySectionHeadersEnabled
        sections={fakeData}
        contentContainerStyle={{
          paddingTop: 20,
          backgroundColor: "white",
          paddingBottom: 150,
        }}
        keyExtractor={(item, index) => item.id + index}
        renderItem={() => {
          return null;
        }}
        renderSectionHeader={renderSection}
      />
      <View style={styles.floatContainer}>
        <Button
          style={[styles.floatBtn, { borderColor: "#1646A9", borderWidth: 2 }]}
          labelStyle={[styles.floatBtnLabel, { color: "#1646A9" }]}
          mode="outlined"
          rippleColor="#4a69a9"
        >
          Chat với host
        </Button>
        <Button
          style={[styles.floatBtn, { backgroundColor: "#1646A9" }]}
          labelStyle={[
            styles.floatBtnLabel,
            { color: "white", paddingVertical: 10 },
          ]}
          mode="contained"
          rippleColor="#4a69a9"
        >
          Yêu cầu tham gia
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#d5d5d5",
    borderBottomColor: "#d5d5d5",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#555",
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  floatContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: 150,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  floatBtnLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  floatBtn: {
    borderRadius: 12,
  },
});

export default EventMember;
