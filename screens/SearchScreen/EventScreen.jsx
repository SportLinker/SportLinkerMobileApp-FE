import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import SearchInputDynamic from "../../component/SearchInputDynamic";

export default function EventScreen() {
  const route = useRoute();
  const [activeScreenName, setActiveScreenName] = useState(route.name);

  // Update activeScreenName whenever the screen focus changes
  useFocusEffect(
    React.useCallback(() => {
      setActiveScreenName(route.name);
    }, [route])
  );

  return (
    <SafeAreaView>
      <SearchInputDynamic screen={activeScreenName} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
