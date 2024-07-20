import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { styles } from "../../../component/style";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/selectors";

const playerTabs = [
  { key: "profile", label: "Giới thiệu" },
  { key: "post", label: "Bài đăng" },
  { key: "match", label: "Trận đấu" },
  // { key: "transaction", label: "Giao dịch" },
  { key: "book", label: "Đặt sân" },
];

const stadiumTabs = [
  { key: "profile", label: "Giới thiệu" },
  // { key: "transaction", label: "Giao dịch" },
];

export default function TabViewProfile({ activeTab, setActiveTab }) {
  const userSelector = useSelector(getUserSelector);

  const tabs = userSelector?.role === "player" ? playerTabs : stadiumTabs;

  return (
    <View style={styles.tabView}>
      <FlatList
        data={tabs}
        horizontal
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
        }}
        style={{ padding: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.textWrapper,
              activeTab == item.key && styles.activeTextWrapper,
            ]}
            onPress={() => {
              setActiveTab(item.key);
            }}
          >
            <Text
              style={[
                styles.boldText,
                activeTab == item.key && styles.activeText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
