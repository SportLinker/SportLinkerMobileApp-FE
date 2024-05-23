import { useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

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
    width: "95%",
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
    width: 300,
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
    marginHorizontal: 38,
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
    backgroundColor: "rgba(0, 211, 241, 0.5)",
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
    padding: 10,
    marginBottom: 20,
  },
  imageYard: {
    width: 355,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
