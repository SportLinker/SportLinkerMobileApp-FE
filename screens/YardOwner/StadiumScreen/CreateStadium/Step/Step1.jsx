import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

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
      <View style={{ marginTop: 20 }}>
        <Text style={styles.label}>Tên Sân Vận Động</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={stadiumData.stadium_name}
          onChangeText={(text) =>
            setStadiumData({ ...stadiumData, stadium_name: text })
          }
        />
      </View>
      <View>
        <Text style={styles.label}>Thời gian mở</Text>
        <TextInput
          label="Thời gian mở"
          style={styles.input}
          mode="outlined"
          placeholder="8h - 22h, cả tuần (trừ thứ 5 nghỉ)"
          value={stadiumData.stadium_time}
          onChangeText={(text) =>
            setStadiumData({ ...stadiumData, stadium_time: text })
          }
        />
      </View>
      <View>
        <Text style={styles.label}>Giới thiệu</Text>
        <TextInput
          label="Giới thiệu"
          multiline
          style={styles.inputDescription}
          placeholder=""
          value={stadiumData.stadium_description}
          onChangeText={(text) =>
            setStadiumData({ ...stadiumData, stadium_description: text })
          }
        />
      </View>
      <TouchableOpacity onPress={validateStep1}>
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>Tiếp theo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 20, fontWeight: "bold" },
  input: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 12,
    marginHorizontal: "auto",
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 2,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  inputDescription: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    marginBottom: 12,
    marginHorizontal: "auto",
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 2,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
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
