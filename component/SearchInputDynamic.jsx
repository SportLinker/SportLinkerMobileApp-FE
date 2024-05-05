import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";

export default function SearchInputDynamic({ screen }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={{ backgroundColor: "white", padding: 10 }}>
      <Searchbar
        placeholder={`Tìm kiếm bằng từ khóa ${screen}`}
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor="#4878D9"
        placeholderTextColor="#707070"
        style={styles.inputSearch}
        inputStyle={{ fontSize: 14 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputSearch: {
    backgroundColor: "#FDFDFD",
    borderWidth: 1,
    borderColor: "#F3F3F3",
    borderRadius: 10,
  },
});
