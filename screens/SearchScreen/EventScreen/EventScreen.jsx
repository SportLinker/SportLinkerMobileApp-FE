import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, IconButton, Searchbar } from "react-native-paper";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import SearchInputDynamic from "../../../component/SearchInputDynamic";
import CreateSportEventModal from "./CreateSportEventModal";
import EventSchedule from "./EventSchedule";

export default function EventScreen() {
  const [createPopup, setCreatePopup] = useState(false);

  const handleCloseCreateEvent = () => {
    setCreatePopup(false);
  };

  return (
    <SafeAreaView style={{ height: "100%", position: "relative", flex: 1 }}>
      <EventSchedule />
      <IconButton
        icon="camera"
        size={42}
        mode="contained"
        onPress={() => setCreatePopup(true)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 10,
          zIndex: 20,
        }}
      ></IconButton>
      <CreateSportEventModal
        visible={createPopup}
        onClose={handleCloseCreateEvent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
