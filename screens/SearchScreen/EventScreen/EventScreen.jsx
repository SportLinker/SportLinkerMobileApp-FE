import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Searchbar } from "react-native-paper";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import SearchInputDynamic from "../../../component/SearchInputDynamic";
import CreateSportEventModal from "./CreateSportEventModal";

export default function EventScreen() {
  const [createPopup, setCreatePopup] = useState(false);

  const handleCloseCreateEvent = () => {
    setCreatePopup(false);
  };

  return (
    <SafeAreaView>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => setCreatePopup(true)}
      >
        Press me
      </Button>
      <CreateSportEventModal
        visible={createPopup}
        onClose={handleCloseCreateEvent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
