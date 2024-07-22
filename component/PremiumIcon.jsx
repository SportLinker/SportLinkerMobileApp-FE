import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

const PremiumIcon = ({ size, color, wrapperStyle }) => {
  return (
    <MaterialCommunityIcons
      name="check-decagram"
      size={size ? size : 14}
      color={color ? color : "#1446a9"}
    />
  );
};

export default PremiumIcon;
