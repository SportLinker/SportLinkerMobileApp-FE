import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Snackbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { convertUTCToVietnamTime, formatCurrency } from "../../../utils";
import { DashCircle } from "../../../component/DashCircle";
import { getEventSelector } from "../../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  joinEventByUser,
  unjoinEventByUserOrOwner,
} from "../../../redux/slices/eventSlice";
import { useState } from "react";
import { Dimensions } from "react-native";
import ConfirmPopup from "../../../component/ConfirmPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fakeData = {
  id: "e1",
  eventTime: "Thứ ba 21/05/2024 lúc 19:00",
  duration: "3 tiếng",
  addressName: "Sân bóng Mai Anh",
  location: "Khu phố 3, phường 3 thành phố Tây Ninh",
  sportType: "soccer",
  requireLevel: "Tất cả trình độ",
  preventOut: "Chặn rời khỏi kèo trước 4 tiếng kèo bắt đầu",
  note: "",
  totalMember: 20,
  currentMember: 1,
  matchType: "Giao hữu",
  participationFee: 10000,
  memberGender: "Nam",
  members: [
    {
      id: "m1",
      name: "Phong",
      avatar:
        "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
    },
  ],
};

const EventDetail = ({ navigation }) => {
  const eventDetail = useSelector(getEventSelector);
  const [anttendend, setAttended] = useState(eventDetail.is_attendend);
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmCancelEventByOwner, setConfirmCancelEventByOwner] =
    useState(false);
  const [confirmCancelEventByUser, setConfirmCancelEventByUser] =
    useState(false);
  const [
    confirmJoinEventByoinEventByUser,
    setConfirmJoinEventByoinEventByUser,
  ] = useState(false);

  const dispatch = useDispatch();

  const MemberView = ({ members }) => {
    //handle render member avatar
    const maxItems = 5;
    // Prepare the data to render
    let renderData = members.slice(0, maxItems);

    // If members are less than 5, add placeholders
    if (renderData.length < maxItems) {
      for (let i = renderData.length; i < maxItems; i++) {
        renderData.push({ id: `placeholder-${i}`, isPlaceholder: true });
      }
    }

    // Add remaining count indicator if members are more than 5
    if (members.length > maxItems) {
      renderData.push({
        id: "more",
        remaining: members.length - maxItems,
      });
    }

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        {renderData.map((newItem, index) => {
          if (newItem.isPlaceholder) {
            return (
              <DashCircle styles={{ width: 50, height: 50 }} key={index} />
            );
          } else if (newItem.remaining) {
            return (
              <Text
                key={newItem.id + index}
                style={{
                  color: "#717171",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                +{newItem.remaining}
              </Text>
            );
          } else {
            return (
              <Avatar.Image
                key={newItem.user_join.id + index}
                size={50}
                source={{
                  uri: newItem.user_join.avatar_url,
                }}
              />
            );
          }
        })}
      </View>
    );
  };

  const handleCancelEvent = () => {
    dispatch(deleteEvent(eventDetail.match_id)).then((res) => {
      setSuccessMessage("Hủy sự kiện thành công !!!");
      setConfirmCancelEventByOwner(false);
      setTimeout(() => {
        navigation.goBack();
      }, 4000);
    });
  };
  const handleCancelEventByUser = async () => {
    const clientId = await AsyncStorage.getItem("xClientId");
    const formCancel = {
      match_id: eventDetail.match_id,
      user_id: clientId,
    };

    dispatch(unjoinEventByUserOrOwner(formCancel)).then((res) => {
      setSuccessMessage("Hủy tham gia thành công !!!");
      setConfirmCancelEventByUser(false);
      setAttended(false);
    });
  };

  const handleJoinEvent = () =>
    dispatch(joinEventByUser(eventDetail.match_id)).then((res) => {
      setAttended(true);
      setSuccessMessage("Tham gia kèo thành công");
      setConfirmJoinEventByoinEventByUser(false);
    });

  return (
    <View style={{ position: "relative", flex: 1, zIndex: 0 }}>
      <ScrollView style={styles.container}>
        <MemberView members={eventDetail.match_join} />
        <View style={styles.itemWrapper}>
          <Icon name="calendar-check-outline" size={30} color={"black"} />

          <View style={styles.textWrapper}>
            <Text style={styles.boldText}>
              {convertUTCToVietnamTime(eventDetail.start_time)}
            </Text>
            <Text style={styles.subText}>
              {convertUTCToVietnamTime(eventDetail.end_time)}
            </Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <Icon name="map-marker-outline" size={30} color={"black"} />
          <View style={styles.textWrapper}>
            <Text style={styles.boldText}>
              {eventDetail?.place_detail?.title}
            </Text>
            <Text style={styles.subText}>
              {eventDetail?.place_detail?.address}
            </Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <Icon name={fakeData.sportType} size={30} color={"black"} />

          <View style={styles.inlineTextWrapper}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Tổng số người tham gia
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#707070",
                fontWeight: "bold",
                paddingLeft: 5,
              }}
            >
              • {eventDetail.maximum_join}
            </Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <Icon name="close-circle-outline" size={30} color={"black"} />

          <View style={styles.textWrapper}>
            <Text style={styles.boldText}>{fakeData.preventOut}</Text>
          </View>
        </View>

        {fakeData.participationFee != 0 && (
          <View style={styles.itemWrapper}>
            <Icon name="hand-coin-outline" size={30} color={"black"} />
            <View style={styles.inlineTextWrapper}>
              <Text style={styles.boldText}>Mỗi người: </Text>
              <Text style={styles.subText}>
                {eventDetail.option
                  ? formatCurrency(eventDetail.option.budget, "VND", "vi-vn")
                  : "Chưa yêu cầu"}
              </Text>
            </View>
          </View>
        )}

        {fakeData.memberGender && (
          <View style={styles.itemWrapper}>
            <Icon name="account-multiple-outline" size={30} color={"black"} />

            <View style={styles.textWrapper}>
              <Text style={styles.boldText}>{fakeData.memberGender}</Text>
            </View>
          </View>
        )}

        {fakeData.note != "" && (
          <View style={styles.noteView}>
            <Text style={styles.boldText}>Ghi chú</Text>
            <Text style={styles.subText}>{fakeData.note}</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.floatContainer}>
        {eventDetail.is_owner ? (
          <TouchableOpacity
            onPress={() => {
              setConfirmCancelEventByOwner(true);
            }}
          >
            <Button
              style={[
                styles.floatBtn,
                { borderColor: "#EE0000", borderWidth: 2 },
              ]}
              labelStyle={[styles.floatBtnLabel, { color: "#EE0000" }]}
              mode="outlined"
              rippleColor="#EE0000"
            >
              Hủy sự kiện
            </Button>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Button
              style={[
                styles.floatBtn,
                { borderColor: "#1646A9", borderWidth: 2 },
              ]}
              labelStyle={[styles.floatBtnLabel, { color: "#1646A9" }]}
              mode="outlined"
              rippleColor="#4a69a9"
            >
              Chat với host
            </Button>
          </TouchableOpacity>
        )}
        {anttendend ? (
          <TouchableOpacity onPress={() => setConfirmCancelEventByUser(true)}>
            <Button
              style={[styles.floatBtn, { backgroundColor: "#EE0000" }]}
              labelStyle={[
                styles.floatBtnLabel,
                { color: "white", paddingVertical: 10 },
              ]}
              mode="contained"
              rippleColor="#4a69a9"
            >
              Hủy tham gia
            </Button>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Button
              style={[styles.floatBtn, { backgroundColor: "#1646A9" }]}
              labelStyle={[
                styles.floatBtnLabel,
                { color: "white", paddingVertical: 10 },
              ]}
              mode="contained"
              rippleColor="#4a69a9"
              onPress={() => setConfirmJoinEventByoinEventByUser(true)}
            >
              Yêu cầu tham gia
            </Button>
          </TouchableOpacity>
        )}
      </View>
      <Snackbar
        visible={successMessage !== ""}
        onDismiss={() => setSuccessMessage("")}
        duration={3000}
        style={styles.snackbarContainer}
      >
        {successMessage}
      </Snackbar>
      <ConfirmPopup
        visible={confirmCancelEventByOwner}
        title={"Bạn muốn hủy sự kiện"}
        description={"Nhấn đồng ý nếu bạn muốn hủy sự kiện này !!!"}
        type={"danger"}
        onConfirm={handleCancelEvent}
        onCancel={() => setConfirmCancelEventByOwner(false)}
      />
      <ConfirmPopup
        visible={confirmCancelEventByUser}
        title={"Bạn không muốn tham gia"}
        description={"Nhấn đồng ý nếu bạn không muốn tham gia !!!"}
        type={"danger"}
        onConfirm={handleCancelEventByUser}
        onCancel={() => setConfirmCancelEventByUser(false)}
      />
      <ConfirmPopup
        visible={confirmJoinEventByoinEventByUser}
        title={"Bạn muốn tham gia sự kiện"}
        description={"Nhấn đồng ý để tham gia sự kiện !!!"}
        type={"success"}
        onConfirm={handleJoinEvent}
        onCancel={() => setConfirmJoinEventByoinEventByUser(false)}
      />
    </View>
  );
};

export const { width: screenWidth, height: screenHeight } =
  Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: 20,
    paddingTop: 30,
    paddingBottom: 150,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  itemWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 5,
    marginTop: 20,
  },
  textWrapper: { display: "flex", paddingTop: 10, paddingRight: 10 },
  boldText: { fontWeight: "bold", fontSize: 18 },
  subText: { fontSize: 16, color: "#707070", fontWeight: "bold" },
  inlineTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  noteView: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#707070",
    paddingTop: 20,
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
    zIndex: 0,
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

export default EventDetail;
