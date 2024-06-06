import { Text, TouchableOpacity } from "react-native";
import { Modal, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getSportIcon } from "../utils/constant";

const SportSelectOptions = () => {
  return (
    <Portal>
      <Modal>
        <View>
          <View>
            <Text>Lọc môn thể thao</Text>
            <Button>Xác nhận</Button>
          </View>
          <View>
            <Text>Thể thao của tôi</Text>
            <View>
              <TouchableOpacity>
                <Text>Bóng đá</Text>
                <Icon name={getSportIcon("Bóng đá")} />
              </TouchableOpacity>
            </View>
          </View>
          <Veiw>
            <Text>Các môn khác</Text>
            <TouchableOpacity>
              <Text>Bóng bàn</Text>
              <Icon name={getSportIcon("Bóng bàn")} />
            </TouchableOpacity>
          </Veiw>
        </View>
      </Modal>
    </Portal>
  );
};

export default SportSelectOptions;
