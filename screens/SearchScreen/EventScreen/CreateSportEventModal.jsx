import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import StepOne from "./Step/StepOne";
import StepTwo from "./Step/StepTwo";
import StepThree from "./Step/StepThree";

const CreateSportEventModal = ({ visible, onClose }) => {
  const [step, setStep] = React.useState(1);

  const initialValues = {
    eventName: "",
    clubName: "",
    eventDate: new Date(),
    eventTime: (() => {
      const time = new Date();
      time.setHours(7, 0, 0, 0); // Đặt giờ là 7:00 sáng
      return time;
    })(),
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
    selectedSport: Yup.object()
      .shape({
        label: Yup.string().required("Sport label is required"),
        value: Yup.string().required("Sport value is required"),
        icon: Yup.string().required("Sport icon is required"),
      })
      .required("Hãy chọn môn thể thao"),
  });

  const validationSchemaStepTwo = Yup.object().shape({
    participants: Yup.number()
      .min(2, "Người tham gia phải lớn hơn 1")
      .required("Hãy chọn số lượng người tham gia"),
    budget: Yup.number()
      .min(1000, "Ngân sách mỗi người mang lớn hơn 1000")
      .required("Hãy chọn số tiền"),
    note: Yup.string().required("Hãy viết lưu ý"),
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
      onClose();
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
    </Modal>
  );
};

export default CreateSportEventModal;

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
});
