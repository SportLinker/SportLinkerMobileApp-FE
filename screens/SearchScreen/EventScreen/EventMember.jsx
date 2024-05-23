import { useState } from "react";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";

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
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.avatarContainer}>
        {data.map((item) => {
          return <MemberItem item={item} />;
        })}
      </View>
    </View>
  );

  return (
    <View>
      <SectionList
        stickySectionHeadersEnabled
        sections={fakeData}
        contentContainerStyle={{ marginTop: 20 }}
        keyExtractor={(item, index) => item.id + index}
        renderItem={() => {
          return null;
        }}
        renderSectionHeader={renderSection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    width: "100%",
    paddingVertical: 20,
    borderColor: "#707070",
    borderTop: 1,
    borderBottom: 1,
  },
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
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
    color: "#555",
    paddingVertical: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: "#d5d5d5",
    borderBottomColor: "#d5d5d5",
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
});

export default EventMember;
