import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  editBtn: {
    marginRight: 20,
  },
  editBtnInfo: {
    color: "black",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
  },
  horizontalIconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    width: 337,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menu: {
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
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
    backgroundColor: "white",
    padding: 20,
    height: "100%",
    paddingTop: 30,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
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
    justifyContent: "center",
    alignItems: "center",
  },
  flexRowStyle: {
    display: "flex",
    flexDirection: "row",
  },
});
