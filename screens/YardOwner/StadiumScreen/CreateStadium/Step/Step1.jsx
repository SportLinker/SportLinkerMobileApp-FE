import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const Step1 = ({ stadiumData, setStadiumData, nextStep }) => {
  const validateStep1 = () => {
    if (
      stadiumData.stadium_name &&
      stadiumData.stadium_time &&
      stadiumData.stadium_description
    ) {
      nextStep();
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <View>
      <TextInput
        label="Tên Sân Vận Động"
        style={styles.input}
        mode="outlined"
        placeholder=""
        value={stadiumData.stadium_name}
        onChangeText={(text) =>
          setStadiumData({ ...stadiumData, stadium_name: text })
        }
      />
      <TextInput
        label="Thời gian mở"
        style={styles.input}
        mode="outlined"
        placeholder="7h - 21h | T2 - T7"
        value={stadiumData.stadium_time}
        onChangeText={(text) =>
          setStadiumData({ ...stadiumData, stadium_time: text })
        }
      />
      <TextInput
        label="Giới thiệu"
        multiline
        style={styles.inputDescription}
        mode="outlined"
        placeholder=""
        value={stadiumData.stadium_description}
        onChangeText={(text) =>
          setStadiumData({ ...stadiumData, stadium_description: text })
        }
      />
      <TouchableOpacity onPress={validateStep1}>
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>Tiếp theo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  inputDescription: {
    marginBottom: 12,
    paddingHorizontal: 8,
    minHeight: 100,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginBottom: 12,
    backgroundColor: "#1646a9",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonLabel: {
    color: "#ffffff",
  },
});

export default Step1;
