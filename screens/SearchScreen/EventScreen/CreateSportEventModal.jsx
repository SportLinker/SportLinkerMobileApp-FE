import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import StepOne from "./Step/StepOne";
import StepTwo from "./Step/StepTwo";
import StepThree from "./Step/StepThree";
import { calculateEventTimes } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, getEventList } from "../../../redux/slices/eventSlice";
import { useNavigation } from "@react-navigation/native";
import { getListMessage } from "../../../redux/slices/messageSlice";
import { getUserSelector } from "../../../redux/selectors";
import { DEFAULT_DISTACNCE } from "../../../utils/constant";

const CreateSportEventModal = ({ visible, onClose }) => {
  const getUserInfo = useSelector(getUserSelector);
  const [step, setStep] = React.useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [failMessage, setFailMessage] = useState("");

  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const initialValues = {
    eventName: "",
    clubName: "",
    eventDate: new Date(),
    eventTime: (() => {
      const time = new Date();
      time.setHours(7, 0, 0, 0); // Đặt giờ là 7:00 sáng
      return time;
    })(),
    duration: "",
    selectedSport: null,
    participants: 0,
    budget: 0,
    note: "",
    searchQuery: "",
    selectedLocation: null,
  };

  const validationSchemaStepOne = Yup.object().shape({
    eventName: Yup.string().required("Hãy chọn tên sự kiện"),
    eventDate: Yup.date()
      .min(new Date(), "Không chọn ngày trong quá khứ")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        "Không chọn ngày quá 1 năm sau"
      )
      .required("Hãy chọn ngày của sự kiện"),
    duration: Yup.number()
      .min(30, "Thời lượng tối thiểu là 30 phút")
      .test(
        "is-multiple-of-30",
        "Thời lượng phải là bội số của 30 phút",
        (value) => value % 30 === 0
      )
      .required("Hãy nhập thời lượng sự kiện"),
    selectedSport: Yup.object()
      .shape({
        sport_name: Yup.string().required("Sport label is required"),
        value: Yup.string().required("Sport value is required"),
        icon: Yup.string().required("Sport icon is required"),
      })
      .required("Hãy chọn môn thể thao"),
  });

  const validationSchemaStepTwo = Yup.object().shape({
    participants: Yup.number()
      .min(2, "Người tham gia phải lớn hơn 1")
      .required("Hãy chọn số lượng người tham gia"),
    // budget: Yup.number().min(1000, "Ngân sách mỗi người mang lớn hơn 1000"),
    // .required("Hãy chọn số tiền"),
    // note: Yup.string().required("Hãy viết lưu ý"),
  });

  const validationSchemaStepThree = Yup.object().shape({
    selectedLocation: Yup.object().required("Hãy chọn vị trí"),
  });

  const getValidationSchema = () => {
    switch (step) {
      case 1:
        return validationSchemaStepOne;
      case 2:
        return validationSchemaStepTwo;
      case 3:
        return validationSchemaStepThree;
      default:
        return validationSchemaStepOne;
    }
  };

  const handleNextStep = (values, actions) => {
    if (step === 1 && validationSchemaStepOne.isValidSync(values)) {
      setStep(2);
      actions.setTouched({});
    } else if (step === 2 && validationSchemaStepTwo.isValidSync(values)) {
      setStep(3);
      actions.setTouched({});
    } else if (step === 3 && validationSchemaStepThree.isValidSync(values)) {
      handleSubmit(values);
    } else {
      actions.validateForm().then(() => {
        actions.setTouched({
          ...Object.keys(initialValues).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {}),
        });
      });
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (values) => {
    const formattedDate = values.eventDate
      ? new Date(values.eventDate).toLocaleDateString()
      : "";

    const formattedTime = values.eventTime
      ? new Date(values.eventTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "";
    const times = calculateEventTimes(
      formattedDate,
      formattedTime,
      values.duration
    );
    try {
      const eventForm = {
        match_name: values.eventName,
        cid: values.selectedLocation.cid,
        sport_name: values.selectedSport.sport_name,
        maximum_join: parseInt(values.participants),
        start_time: times.start_time,
        end_time: times.end_time,
        option: {
          budget: values.budget ? parseInt(values.budget) : null,
          note: values.note ? values.note : null,
        },
      };

      console.log(eventForm);
      dispatch(createEvent(eventForm)).then((res) => {
        if (res.type === "eventSlice/createEvent/fulfilled") {
          console.log("Event created successfully: ", res.payload);
          setSuccessMessage("Bạn đã tạo kèo thành công !!!");
          const formData = {
            long: getUserInfo.longitude,
            lat: getUserInfo.latitude,
            distance: DEFAULT_DISTACNCE,
            start_time: 0,
            end_time: 23,
            sport_name: "",
          };
          setTimeout(() => {
            dispatch(getEventList(formData));
            setStep(1);
            onClose();
            dispatch(getListMessage());
          }, 3000);
        } else {
          if (res.payload.message == "Not found") {
            setFailMessage("Hãy đăng nhập lại !!!");
            navigate("Login");
          }
          if (res.payload.message == "You have a match upcomming!") {
            setFailMessage("Bạn đã tạo kèo ngày giờ này rồi");
          } else {
            setFailMessage(res.payload.message);
          }
        }
      });
    } catch (error) {
      console.log("error: ", JSON.stringify(error));
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema}
        onSubmit={(values, actions) => handleNextStep(values, actions)}
      >
        {({
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => {
                setStep(1);
                onClose();
              }}
            >
              <Text style={styles.btnBack}>Quay Về</Text>
            </TouchableOpacity>
            {step === 1 && (
              <StepOne
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
            )}
            {step === 2 && (
              <StepTwo
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
            )}
            {step === 3 && (
              <StepThree
                values={values}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
              />
            )}
            <View style={styles.buttonContainer}>
              <Button
                mode="elevated"
                onPress={handlePreviousStep}
                disabled={step === 1}
                style={styles.buttonPre}
                textColor="#1646A9"
              >
                Trước
              </Button>
              <Button
                mode="elevated"
                onPress={handleSubmit}
                style={styles.button}
                textColor="#fff"
              >
                {step === 3 ? "Hoàn thành" : "Tiếp tục"}
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <Snackbar
        visible={successMessage !== ""}
        onDismiss={() => setSuccessMessage("")}
        duration={2000}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
      <Snackbar
        visible={failMessage !== ""}
        onDismiss={() => setFailMessage("")}
        duration={2000}
        style={[styles.snackbarContainer, styles.snackbarContainerFail]}
      >
        {failMessage}
      </Snackbar>
    </Modal>
  );
};

export default CreateSportEventModal;
export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    paddingTop: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnBack: {
    fontSize: 14,
    color: "#1646A9",
    fontWeight: "600",
  },
  button: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#1646A9",
    backgroundColor: "#1646A9",
  },
  buttonPre: {
    marginHorizontal: 10,
    borderWidth: 1,
    textColor: "#1646A9",
    backgroundColor: "#fff",
  },
  snackbarContainer: {
    borderRadius: 10,
    // position: "absolute",
    // bottom: "50%",
    // left: "50%",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: 0 * screenHeight },
    ],
    backgroundColor: "#1646A9",
  },
  snackbarContainerFail: {
    backgroundColor: "red",
  },
});
