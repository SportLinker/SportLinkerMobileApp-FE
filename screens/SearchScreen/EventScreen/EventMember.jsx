import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Button, Snackbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getEventSelector, getUserSelector } from "../../../redux/selectors";
import ConfirmPopup from "../../../component/ConfirmPopup";
import { TouchableOpacity } from "react-native";
import {
  getDetailEvent,
  getEventList,
  unjoinEventByUserOrOwner,
} from "../../../redux/slices/eventSlice";
import { convertHttpToHttps } from "../../../utils";
import { DEFAULT_DISTACNCE } from "../../../utils/constant";

const EventMember = ({ navigation }) => {
  const eventDetail = useSelector(getEventSelector);
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmDeleteUserByOwner, setConfirmDeleteUserByOwner] =
    useState(false);
  const [dataMember, setDataMember] = useState([]);

  const getUserInfo = useSelector(getUserSelector);

  const dispatch = useDispatch();

  const fakeData = [
    {
      title: "Người tổ chức",
      data: [eventDetail.user_create],
    },
    {
      title: "Xác nhận tham gia",
      totalMember: 10,
      data: eventDetail.match_join,
    },
  ];

  useEffect(() => {
    setDataMember(fakeData);
    console.log(eventDetail);
  }, [eventDetail.match_join]);

  const handleDeleteUserByOwner = () => {
    const formCancel = {
      match_id: eventDetail.match_id,
      user_id: confirmDeleteUserByOwner.id,
    };

    dispatch(unjoinEventByUserOrOwner(formCancel)).then((res) => {
      setConfirmDeleteUserByOwner(false);
      setSuccessMessage("Xóa người tham gia thành công");
      dispatch(getDetailEvent(eventDetail.match_id)).then((res) => {
        const formData = {
          long: getUserInfo.longitude,
          lat: getUserInfo.latitude,
          distance: DEFAULT_DISTACNCE,
          start_time: 0,
          end_time: 23,
          sport_name: "",
        };
        dispatch(getEventList(formData));
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      });
    });
  };

  const MemberItem = ({ item }) => {
    return (
      <View>
        {eventDetail.is_owner ? (
          <TouchableOpacity
            onPress={() => setConfirmDeleteUserByOwner(item.user_join)}
          >
            <View style={styles.itemContainer}>
              {item.user_join ? (
                <>
                  <View
                    style={{
                      backgroundColor: "red",
                      padding: 5,
                      borderRadius: 50,
                    }}
                  >
                    <Avatar.Image
                      size={50}
                      source={{
                        uri: convertHttpToHttps(item.user_join.avatar_url),
                      }}
                    />
                  </View>
                  <Text style={styles.itemText}>{item.user_join.name}</Text>
                </>
              ) : (
                <>
                  <Avatar.Image
                    size={50}
                    source={{ uri: convertHttpToHttps(item.avatar_url) }}
                  />
                  <Text style={styles.itemText}>{item.name}</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.itemContainer}>
            {item.user_join ? (
              <>
                <Avatar.Image
                  size={50}
                  source={{
                    uri: convertHttpToHttps(item.user_join.avatar_url),
                  }}
                />
                <Text style={styles.itemText}>{item.user_join.name}</Text>
              </>
            ) : (
              <>
                <Avatar.Image
                  size={50}
                  source={{ uri: convertHttpToHttps(item.avatar_url) }}
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderSection = ({ section: { title, data } }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.headerWrapper}>
        <Text style={styles.sectionHeader}>{title}</Text>
      </View>
      <View style={styles.avatarContainer}>
        {data.map((item, index) => {
          return <MemberItem item={item} key={index} />;
        })}
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: "white",
        zIndex: 0,
      }}
    >
      <SectionList
        stickySectionHeadersEnabled
        sections={dataMember}
        contentContainerStyle={{
          paddingTop: 20,
          backgroundColor: "white",
          paddingBottom: 150,
        }}
        keyExtractor={(item, index) => index}
        renderItem={() => {
          return null;
        }}
        renderSectionHeader={renderSection}
      />
      <Snackbar
        visible={successMessage !== ""}
        onDismiss={() => setSuccessMessage("")}
        duration={3000}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
      <ConfirmPopup
        visible={confirmDeleteUserByOwner}
        title={"Bạn không muốn người này tham gia"}
        description={"Nhấn đồng ý để xóa họ !!!"}
        type={"danger"}
        onConfirm={handleDeleteUserByOwner}
        onCancel={() => setConfirmDeleteUserByOwner(false)}
      />
      {/* <View style={styles.floatContainer}>
        <Button
          style={[styles.floatBtn, { borderColor: "#1646A9", borderWidth: 2 }]}
          labelStyle={[styles.floatBtnLabel, { color: "#1646A9" }]}
          mode="outlined"
          rippleColor="#4a69a9"
        >
          Chat với host
        </Button>
        <Button
          style={[styles.floatBtn, { backgroundColor: "#1646A9" }]}
          labelStyle={[
            styles.floatBtnLabel,
            { color: "white", paddingVertical: 10 },
          ]}
          mode="contained"
          rippleColor="#4a69a9"
        >
          Yêu cầu tham gia
        </Button>
      </View> */}
    </View>
  );
};

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

const styles = StyleSheet.create({
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#d5d5d5",
    borderBottomColor: "#d5d5d5",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#555",
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  floatContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    height: 150,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  floatBtnLabel: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  floatBtn: {
    borderRadius: 12,
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
    textAlign: "center",
  },
});

export default EventMember;
