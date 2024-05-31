import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import RadioButtonGroup from "../../component/RadioButtonGroup";
import { useState } from "react";

const publicOptions = [
  { label: "Công khai", value: "Công khai" },
  { label: "Bạn bè", value: "Bạn bè" },
  { label: "Chỉ mình tôi", value: "Chỉ mình tôi" },
];

const PublicStatusModal = ({
  onToggleStatusModal,
  isOpenStatusModal,
  publicStatus,
  setPublicStatus,
}) => {
  return (
    <SafeAreaView>
      <Modal
        visible={isOpenStatusModal}
        transparent={true}
        animationType="slide"
        onRequestClose={onToggleStatusModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={onToggleStatusModal}
            >
              <Icon name="close-thick" size={30} style={styles.btnBack} />
            </TouchableOpacity>
            <Text style={styles.title}>Chỉnh sửa đối tượng</Text>
          </View>
          <View>
            <Text
              style={[
                styles.title,
                { fontWeight: "normal", textAlign: "left", marginBottom: 20 },
              ]}
            >
              Ai có thể xem bài viết của bạn?
            </Text>
            <RadioButtonGroup
              options={publicOptions}
              selected={publicStatus}
              setSelected={setPublicStatus}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    paddingTop: 50,
  },
  btnBack: {
    fontSize: 24,
    color: "#1646A9",
    fontWeight: "600",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    width: "90%",
    textAlign: "center",
  },
  radioButtonGroupContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default PublicStatusModal;
