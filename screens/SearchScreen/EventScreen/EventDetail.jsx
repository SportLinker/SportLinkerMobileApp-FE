import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { convertUTCToVietnamTime, formatCurrency } from "../../../utils";
import { DashCircle } from "../../../component/DashCircle";
import { getEventSelector } from "../../../redux/selectors";
import { useSelector } from "react-redux";

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

  const MemberView = ({ members }) => {
    console.log("members", members);
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
              {eventDetail.place_detail.title}
            </Text>
            <Text style={styles.subText}>
              {eventDetail.place_detail.address}
            </Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <Icon name={fakeData.sportType} size={30} color={"black"} />

          <View style={styles.inlineTextWrapper}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {fakeData.matchType}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: "#707070",
                fontWeight: "bold",
                paddingLeft: 5,
              }}
            >
              • {fakeData.requireLevel}
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
      </View>
    </View>
  );
};

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
});

export default EventDetail;
