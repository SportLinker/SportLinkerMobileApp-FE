import { useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

export const styles = StyleSheet.create({
  editBtn: {
    marginRight: 20,
  },
  editBtnInfo: {
    color: "black",
  },

  horizontalIconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoText: {
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 400,
  },
  innerInfoSport: {
    borderRadius: 20,
    backgroundColor: "#fff", // Màu nền của phần tử
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Chỉ áp dụng cho Android
    marginBottom: 20,
  },
  profileCoach: {
    borderRadius: 20,
    backgroundColor: "#fff", // Màu nền của phần tử
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Chỉ áp dụng cho Android
    marginBottom: 20,
  },
  topInfoSport: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  bottomInfoSport: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  innerInfoCommunity: {
    borderRadius: 20,
    backgroundColor: "#fff", // Màu nền của phần tử
    width: 337,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Chỉ áp dụng cho Android
    marginBottom: 20,
  },
  centerStyle: { alignItems: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(72, 120, 217, 0.5)",
  },
  modalLogout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(72, 120, 217, 0.5)",
  },
  menu: {
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "50%",
  },
  menuAccount: {
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  confirmLogout: {
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 15,

    width: "80%",
  },
  menuCoach: {
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  textContainer: {
    marginLeft: 15,
  },
  playerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  playerGender: {
    fontSize: 16,
    color: "gray",
  },
  menuItem: {
    padding: 10,
  },
  textMenuItem: { fontSize: 20, fontWeight: "bold" },
  textMenuLogout: { fontSize: 20, fontWeight: "bold" },
  textTitleSport: { fontSize: 13, fontWeight: "bold", color: "#707070" },
  cancelText: {
    color: "red",
  },
  blueText: {
    color: "blue",
  },
  marginTopText: { marginTop: 20 },
  modalMainContainer: {
    backgroundColor: "rgba(0, 211, 241, 0.5)",
    padding: 20,
    height: "100%",
    paddingTop: 20,
  },
  modalCoachContainer: {
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  iconCoachContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editBtn: {
    padding: 10,
  },
  horizontalIconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  centerStyle: { alignItems: "center" },
  nameContainer: {
    marginLeft: 20,
    paddingTop: 2,
  },
  nameAccountContainer: {
    alignItems: "center",
    paddingTop: 2,
  },
  flexRowStyle: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  header: {
    height: 50, // Chiều cao của header
    backgroundColor: "#ccc", // Màu nền của header
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scene: {
    flex: 1,
  },
  snackbarContainer: {
    borderRadius: 10,
    // position: "absolute",
    // bottom: "50%",
    // left: "50%",
    alignItems: "center",
    textAlign: "center",
    transform: [
      { translateX: 0 * screenWidth },
      { translateY: 0 * screenHeight },
    ],
    backgroundColor: "#1646a9",
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: "#C4C4C4",
    paddingHorizontal: 20,
  },
  logo: {
    height: 35,
    width: 82,
    resizeMode: "cover",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonHeader: {
    backgroundColor: "#F7F7F7",
  },
  containerPlayer: {
    width: "95%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    padding: 10,
    marginBottom: 20,
  },
  containerYard: {
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    padding: 5,
    marginBottom: 20,
  },
  imageYard: {
    width: 322,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  containerDetailYard: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  innerDetailYard: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  imageDetailYard: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatar: {
    position: "absolute",
    bottom: -55,
    left: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  detailSection: {
    flexDirection: "row",
    paddingTop: 10,
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 2,
    fontSize: 16,
  },
  containerYardDetail: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
  },
  avatarSpacer: {
    width: 80,
  },
  rating: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 10,
    marginVertical: "auto",
    color: "#F9A825",
  },
  tabView: {
    marginTop: 20,
    backgroundColor: "#fff",
    width: "100%",
    height: 45,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
  },
  textWrapper: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
  },
  boldText: {
    fontSize: 17,
    fontWeight: 700,
  },
  activeText: {
    color: "#4878D9",
  },
  activeTextWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: "#4878D9",
  },
  tabViewCoach: {
    backgroundColor: "#fff",
    width: "100%",
    height: 44,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
  },
  textCoachWrapper: {
    width: "33.33%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
  },
  boldTextCoach: {
    fontSize: 16,
    fontWeight: 700,
  },
  logoRankContainer: { padding: 20, width: 150, height: 150, margin: "auto" },
  textRank: {
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  imageStyle: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#4878d9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  imagePickerButton: {
    backgroundColor: "#4878d9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  imagePickerButtonText: {
    color: "#fff",
  },
  pickedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: "#4878d9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
