import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Avatar, Button, Appbar, Searchbar } from "react-native-paper";
import { convertHttpToHttps } from "../../utils";

const ListLikeScreen = ({ navigation }) => {
  const [people, setPeople] = useState([
    {
      id: "1",
      name: "Ninh PD",
      avatar:
        "https://th.bing.com/th/id/R.ab94f675f0abafc671595dce9a2fed9c?rik=LqtJ2QV%2fzPVZZg&pid=ImgRaw&r=0",
      isFollowing: false,
    },
    {
      id: "2",
      name: "John Doe",
      avatar:
        "https://th.bing.com/th/id/OIP.bGSqDZAcJfX0HTyrET5X5AHaKj?rs=1&pid=ImgDetMain",
      isFollowing: false,
    },
    {
      id: "3",
      name: "Jane Smith",
      avatar:
        "https://th.bing.com/th/id/R.3fa46a46013f961efb985ea692d73f2e?rik=J18czUfy5cCp9A&pid=ImgRaw&r=0",
      isFollowing: true,
    },
    // Add more people here
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFollowToggle = (id) => {
    setPeople((prevPeople) =>
      prevPeople.map((person) =>
        person.id === id
          ? { ...person, isFollowing: !person.isFollowing }
          : person
      )
    );
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Implement search filtering logic here
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Avatar.Image
        size={40}
        source={{ uri: convertHttpToHttps(convertHttpToHttps) }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Button
        mode={item.isFollowing ? "outlined" : "contained"}
        onPress={() => handleFollowToggle(item.id)}
        style={item.isFollowing ? styles.followingButton : styles.followButton}
        textColor={item.isFollowing ? "black" : "white"}
        labelStyle={{ fontSize: 15 }}
      >
        {item.isFollowing ? "Đang theo dõi" : "Theo dõi"}
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#1646A9" }}>
        <Appbar.BackAction
          color="white"
          style={{ fontSize: 18 }}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content
          title="Yêu Thích"
          titleStyle={{ fontSize: 18, color: "white" }}
        />
      </Appbar.Header>

      <Searchbar
        placeholder={`Tìm kiếm`}
        onChangeText={handleSearchChange}
        value={searchQuery}
        iconColor="#1646A9"
        placeholderTextColor="#707070"
        style={styles.searchInput}
        inputStyle={{ fontSize: 14 }}
      />
      <FlatList
        data={people.filter((person) =>
          person.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  avatar: {
    marginRight: 10,
  },
  name: {
    flex: 1,
  },
  followButton: {
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: "#1646A9",
  },
  followingButton: {
    marginLeft: 10,
    borderRadius: 10,
  },
  searchInput: {
    backgroundColor: "#FDFDFD",
    borderWidth: 1,
    borderColor: "#F3F3F3",
    borderRadius: 10,
    marginBottom: 10,
  },
  appbarTitle: {
    fontSize: 18, // Adjust this value to make the text smaller
  },
});

export default ListLikeScreen;
