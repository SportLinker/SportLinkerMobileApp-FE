import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { RadioButton, TextInput } from "react-native-paper";

const StepTwo = ({
  participants,
  setParticipants,
  budget,
  setBudget,
  note,
  setNote,
}) => {
  const options = ["5", "10", "20", "40"];

  return (
    <ScrollView>
      <View style={styles.stepContainer}>
        <View style={styles.justifyLeft}>
          <Text style={styles.dateLabel}>Số người tham gia </Text>
        </View>
        <View style={{ width: "100%" }}>
          <RadioButton.Group
            onValueChange={(value) => setParticipants(value)}
            value={participants}
          >
            {options.map((option) => (
              <View key={option} style={styles.radioContainer}>
                <RadioButton value={option} color="#1646A9" />
                <Text style={styles.radioLabel}>{option} người</Text>
              </View>
            ))}
          </RadioButton.Group>
          <TextInput
            keyboardType="numeric"
            mode="outlined"
            activeUnderlineColor="#1646A9"
            textColor="#1646A9"
            value={participants}
            onChangeText={(text) => setParticipants(text)}
            placeholder="Điền số lượng..."
            placeholderTextColor="#1646A9"
            style={styles.textInput}
            outlineColor="#1646A9"
          />
          <View style={styles.justifyLeft}>
            <Text style={styles.dateLabel}>Số tiền tham gia (VND)</Text>
          </View>
          <TextInput
            keyboardType="numeric"
            mode="outlined"
            activeUnderlineColor="#1646A9"
            textColor="#1646A9"
            value={budget}
            onChangeText={(text) => setBudget(text)}
            placeholder="Điền số tiền ..."
            placeholderTextColor="#1646A9"
            style={styles.textInput}
            outlineColor="#1646A9"
          />

          <View style={styles.justifyLeft}>
            <Text style={styles.dateLabel}>Lưu ý khi tham gia</Text>
          </View>

          <TextInput
            mode="outlined"
            activeUnderlineColor="#1646A9"
            textColor="#1646A9"
            value={note}
            onChangeText={(text) => setNote(text)}
            placeholder="Hãy điền những lưu ý ..."
            placeholderTextColor="#1646A9"
            style={[styles.textInput, styles.textInputNote]}
            outlineColor="#1646A9"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  stepContainer: {
    paddingTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  radioLabel: {
    fontSize: 16,
    color: "#1646A9",
  },
  justifyLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  dateLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#707070",
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 10,
  },
  textInputNote: {
    width: "100%",
    minHeight: 150,
  },
});
