import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Pressable,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { DashCircle } from "../../../component/DashCircle";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/selectors";
import { getDetailEvent } from "../../../redux/slices/eventSlice";
import { getSportIcon } from "../../../utils/constant";

const EventScheduleTable = ({ eventListData, loading }) => {
  const dispatch = useDispatch();
  const [eventList, setEventList] = useState(null);
  const navigation = useNavigation();
  const userSelctor = useSelector(getUserSelector);

  useEffect(() => {
    //convert data to suitable format data for the section list
    if (eventListData) {
      // console.log("eventListData", eventListData);
      const newData = eventListData?.map((event) => ({
        title: event.date,
        data: event.match_group_by_date,
      }));
      setEventList(newData);
    }
  }, [eventListData]);

  const eventView = ({ item, index }) => {
    //handle render member avatar
    const maxItems = 5;
    // Prepare the data to render
    let renderData = item?.match_join?.slice(0, maxItems);

    // If members are less than 5, add placeholders
    if (renderData?.length < maxItems) {
      for (let i = renderData?.length; i < maxItems; i++) {
        renderData.push({ id: `placeholder-${i}`, isPlaceholder: true });
      }
    }

    // Add remaining count indicator if members are more than 5
    if (item?.total_join > maxItems) {
      renderData.push({
        id: "more",
        remaining: item?.total_join - maxItems,
      });
    }

    return (
      <Pressable
        onPress={() => {
          dispatch(getDetailEvent(item.match_id)).then((res) => {
            navigation.navigate("EventDetailScreen");
          });
        }}
      >
        <View
          style={[
            {
              display: "flex",
              paddingVertical: 10,
            },
            index != 0 && {
              borderTopColor: "#707070",
              borderTopWidth: 1,
            },
          ]}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Icon2
              name={getSportIcon(item?.sport_name)}
              size={30}
              style={{
                color: "black",
              }}
            />
            {item.user_create_id == userSelctor?.id && (
              <Text
                style={{
                  backgroundColor: "#5BD027",
                  color: "white",
                  height: 25,
                  borderRadius: 15,
                  overflow: "hidden",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                }}
              >
                Tổ chức
              </Text>
            )}
            {item.user_create_id != userSelctor?.id &&
              item?.total_join == item?.maximum_join && (
                <Text
                  style={{
                    backgroundColor: "#1646a9",
                    color: "white",
                    height: 25,
                    borderRadius: 15,
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                  }}
                >
                  Đủ người
                </Text>
              )}
            {item.user_create_id != userSelctor?.id &&
              item?.total_join != item?.maximum_join && (
                <Text
                  style={{
                    backgroundColor: "#9a9a98",
                    color: "white",
                    height: 25,
                    borderRadius: 15,
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                  }}
                >
                  Chưa Đủ Người
                </Text>
              )}
          </View>
          <View
            style={{
              display: "flex",
              gap: 10,
              paddingLeft: 40,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item?.match_name}
            </Text>
            <Text style={{ fontSize: 15, color: "#717171" }}>
              <Icon name="enviromento" size={16} color={"#717171"} />
              {item?.place_detail.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500" }}
              >{`${item?.total_join}/${item?.maximum_join}`}</Text>
              <Text>•</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {renderData?.map((newItem, index) => {
                  if (newItem?.isPlaceholder) {
                    return <DashCircle key={newItem?.id + index} />;
                  } else if (newItem?.remaining) {
                    return (
                      <Text
                        key={newItem?.id + index}
                        style={{
                          color: "#717171",
                          fontWeight: "bold",
                          fontSize: 16,
                          marginLeft: 5,
                        }}
                      >
                        +{newItem?.remaining}
                      </Text>
                    );
                  } else {
                    return (
                      <Avatar.Image
                        key={index}
                        size={30}
                        source={{
                          uri: newItem.user_join?.avatar_url
                            ? newItem.user_join?.avatar_url
                            : "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
                        }}
                      />
                    );
                  }
                })}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const scheduleItem = ({ item: scheduleItem }) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderColor: "#707070",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            width: "20%",
            borderColor: "#707070",
            borderRightWidth: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {scheduleItem?.time}
          </Text>
        </View>
        <View style={{ width: "80%", paddingHorizontal: 10 }}>
          <FlatList
            data={scheduleItem?.matches}
            renderItem={eventView}
            keyExtractor={(item, index) => {
              return index + "" + scheduleItem?.time;
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {loading && <Loading message={"Loading..."} visible={loading}></Loading>}
      {!loading && (!eventList || eventList?.length == 0) && (
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              color: "#1446a9",
              marginTop: 20,
              fontWeight: "bold",
            }}
          >
            Không tìm thấy trận đấu nào!
          </Text>
        </View>
      )}
      {!loading && eventList && (
        <SectionList
          stickySectionHeadersEnabled
          sections={eventList}
          keyExtractor={(item, index) => index}
          renderItem={scheduleItem}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <Text
                style={{
                  paddingBottom: 10,
                  paddingTop: 20,
                  paddingLeft: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#1646A9",
                  backgroundColor: "#F7F7F7",
                }}
              >
                {title}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default EventScheduleTable;
