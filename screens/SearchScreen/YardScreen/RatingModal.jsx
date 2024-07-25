import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { useDispatch } from "react-redux";
import defaultAvatar from "../../../assets/default_img.png";
import {
  getDetailStadiumByUser,
  ratingStadium,
} from "../../../redux/slices/yardSlice";
import { convertHttpToHttps } from "../../../utils";
import { getAllStadiumByUser } from "../../../redux/slices/eventSlice";

const RatingModal = ({
  visible,
  onClose,
  stadium,
  setMessageSnackbar,
  setSnackbarVisible,
  longitude,
  latitude,
}) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const confirmedRatingYard = () => {
    const feedbackData = {
      comment: feedback,
      rating: rating,
    };
    dispatch(ratingStadium({ stadium_id: stadium.id, feedbackData })).then(
      () => {
        dispatch(getDetailStadiumByUser(stadium.id));
        if (latitude && longitude) {
          const formData = {
            long: longitude,
            lat: latitude,
          };
          dispatch(getAllStadiumByUser(formData));
        }
      }
    );
    setMessageSnackbar(`Đánh giá sân ${stadium?.stadium_name} thành công!`);
    setSnackbarVisible(true);
    onClose();

    // Clear state
    setRating(0);
    setFeedback("");
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <FontAwesome
            name={i <= rating ? "star" : "star-o"}
            size={30}
            color="#F9A825"
            style={modalStyles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={modalStyles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={modalStyles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={modalStyles.modalContainer}>
                <Text style={modalStyles.modalTitle}>Đánh giá sân</Text>
                {stadium.stadium_thumbnail ? (
                  <Image
                    source={{
                      uri: convertHttpToHttps(stadium.stadium_thumbnail),
                    }}
                    style={modalStyles.modalImage}
                  />
                ) : (
                  <Image
                    source={defaultAvatar}
                    style={modalStyles.modalImage}
                  />
                )}

                <Text style={modalStyles.modalDescription}>
                  {stadium.stadium_name}
                </Text>
                <Text style={modalStyles.modalAddress}>
                  {stadium.stadium_address}
                </Text>
                <View style={modalStyles.starsContainer}>{renderStars()}</View>
                <TextInput
                  style={modalStyles.feedbackInput}
                  placeholder="Thêm đánh giá của bạn"
                  value={feedback}
                  onChangeText={setFeedback}
                  multiline
                />
                <View style={modalStyles.modalButtonContainer}>
                  <TouchableOpacity
                    onPress={onClose}
                    style={[modalStyles.modalButton, modalStyles.closeButton]}
                  >
                    <Text style={modalStyles.modalButtonText}>Đóng</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={confirmedRatingYard}
                    style={[modalStyles.modalButton, modalStyles.submitButton]}
                  >
                    <Text style={modalStyles.modalButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalImage: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalDescription: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  modalAddress: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#707070",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  feedbackInput: {
    height: 80,
    width: "100%",
    borderColor: "#707070",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: "white",
  },
  closeButton: {
    backgroundColor: "#A0A0A0",
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#1646a9",
    marginLeft: 10,
  },
});

export default RatingModal;
