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

const fakeData = [
  {
    id: 1,
    title: "Hôm nay",
    data: [
      {
        time: "16:00",
        items: [
          {
            id: "e1",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 1,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
            ],
          },
          {
            id: "e1",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 1,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
            ],
          },
        ],
      },
      {
        time: "18:00",
        items: [
          {
            id: "e3",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 1,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
            ],
          },
          {
            id: "e3",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 6,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
              {
                id: "m2",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
              {
                id: "m3",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
              {
                id: "m4",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
              {
                id: "m5",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
              {
                id: "m6",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Thứ Hai, Ngày 13 Tháng 5",
    data: [
      {
        time: "16:00",
        items: [
          {
            id: "e4",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 1,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
            ],
          },
          {
            id: "e5",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 1,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
              {
                id: "m2",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
            ],
          },
        ],
      },
      {
        time: "18:00",
        items: [
          {
            id: "e6",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 1,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
              },
            ],
          },
          {
            id: "e7",
            title: "Football với Thăng Long",
            address: "Sân bóng Mai Anh",
            distance: "2,1km",
            totalMember: 20,
            currentMember: 20,
            sportType: "soccer",
            members: [
              {
                id: "m1",
                name: "Phong",
                avatar:
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.redditstatic.com%2Favatars%2Favatar_default_03_FF8717.png&f=1&nofb=1&ipt=2662429651646512d327c4c2c6cf0c002324d9b1cc6a751f01c0e707753ae114&ipo=images",
              },
            ],
          },
        ],
      },
    ],
  },
];

const EventScheduleTable = () => {
  // const renderEventItem = ({ item }) => {
  //   return <View>Item</View>;
  // };

  const DashCircle = ({ styles }) => (
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

  const eventView = ({ item, index }) => {
    //handle render member avatar
    const maxItems = 5;
    console.log(item);
    // Prepare the data to render
    let renderData = item.members.slice(0, maxItems);

    // If members are less than 5, add placeholders
    if (renderData.length < maxItems) {
      for (let i = renderData.length; i < maxItems; i++) {
        renderData.push({ id: `placeholder-${i}`, isPlaceholder: true });
      }
    }

    // Add remaining count indicator if members are more than 5
    if (item.members.length > maxItems) {
      renderData.push({
        id: "more",
        remaining: item.members.length - maxItems,
      });
    }

    return (
      <Pressable onPress={() => console.log("Pressed")}>
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
              name={item.sportType}
              size={30}
              style={{
                color: "black",
              }}
            />
            {item.currentMember == item.totalMember && (
              <Text
                style={{
                  backgroundColor: "#a237cd",
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
          </View>
          <View
            style={{
              display: "flex",
              gap: 10,
              paddingLeft: 40,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#717171" }}
            >
              <Icon name="enviromento" size={16} color={"#717171"} />
              Sân bóng Mai Anh
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
                style={{ fontSize: 16, fontWeight: "bold" }}
              >{`${item.currentMember}/${item.totalMember}`}</Text>
              <Text>•</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {renderData.map((newItem, idx) => {
                  if (newItem.isPlaceholder) {
                    return <DashCircle key={`placeholder-${idx}`} />;
                  } else if (newItem.remaining) {
                    return (
                      <Text
                        key={`remaining-${idx}`}
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
                        key={`member-${newItem.id}`}
                        size={30}
                        source={{
                          uri: newItem.avatar,
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

  const scheduleItem = ({ item }) => {
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
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.time}</Text>
        </View>
        <View style={{ width: "80%", paddingHorizontal: 10 }}>
          <FlatList
            data={item.items}
            renderItem={eventView}
            keyExtractor={(item, index) => item.id + "-" + index}
          />
        </View>
      </View>
    );
  };
  return (
    <View>
      <SectionList
        sections={fakeData}
        keyExtractor={(item, index) => item.id + "-" + index}
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
    </View>
  );
};

export default EventScheduleTable;
