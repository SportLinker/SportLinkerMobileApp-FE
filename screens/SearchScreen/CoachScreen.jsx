import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import SearchInputDynamic from "../../component/SearchInputDynamic";
import { useFocusEffect, useRoute } from "@react-navigation/native";

export default function CoachScreen() {
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
