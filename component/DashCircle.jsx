import { View } from "react-native";

export const DashCircle = ({ styles }) => (
  <View
    style={[
      {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "#717171",
        borderStyle: "dashed",
        backgroundColor: "#D9D9D9",
      },
      styles && { ...styles },
    ]}
  ></View>
);
