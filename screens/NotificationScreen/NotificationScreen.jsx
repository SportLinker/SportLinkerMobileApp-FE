import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const mock_data = [
  {
    id: 1,
    icon: "checkcircleo",
    title: "Tài Khoản Đã Xác Minh",
    desc: "Tài khoản của bạn đã được xác minh",
    day: "today",
  },
  {
    id: 2,
    icon: "checkcircleo",
    title: "Đã Nhận Thanh Toán",
    desc: "Chúng tôi đã nhận được thanh toán của bạn",
    day: "today",
  },
  {
    id: 3,
    icon: "closecircleo",
    title: "Thanh Toán Thất Bại",
    desc: "Thanh toán của bạn không thành công. Vui lòng thử lại",
    day: "yesterday",
  },
  {
    id: 4,
    icon: "infocirlceo",
    title: "Tính Năng Mới Được Phát Hành",
    desc: "Xem tính năng mới chúng tôi đã phát hành",
    day: "yesterday",
  },
  {
    id: 5,
    icon: "warning",
    title: "Cảnh Báo Bảo Mật",
    desc: "Phát hiện đăng nhập mới vào tài khoản của bạn",
    day: "yesterday",
  },
  {
    id: 6,
    icon: "mail",
    title: "Tin Nhắn Mới",
    desc: "Bạn đã nhận được tin nhắn mới",
    day: "yesterday",
  },
  {
    id: 7,
    icon: "checkcircleo",
    title: "Gia Hạn Đăng Ký",
    desc: "Đăng ký của bạn đã được gia hạn",
    day: "today",
  },
  {
    id: 8,
    icon: "like2",
    title: "Thích Mới",
    desc: "Ai đó đã thích bài viết của bạn",
    day: "older",
  },
  {
    id: 9,
    icon: "message1",
    title: "Bình Luận Mới",
    desc: "Ai đó đã bình luận về bài viết của bạn",
    day: "older",
  },
  {
    id: 10,
    icon: "bells",
    title: "Nhắc Nhở",
    desc: "Đừng quên kiểm tra các nhiệm vụ của bạn",
    day: "older",
  },
];

export default function NotificationScreen({ navigation }) {
  return (
    <View>
      <ScrollView>
        <View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 20,
              fontWeight: 700,
              color: "#a7a7a7",
            }}
          >
            Hôm nay
          </Text>
          {mock_data
            .filter((item) => item.day === "today")
            .map((item) => (
              <View
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingVertical: 20,
                }}
              >
                <AntDesign
                  name={item.icon}
                  size={24}
                  color="#1646A9"
                  style={{ marginVertical: "auto", marginHorizontal: 30 }}
                />
                <View style={{ width: "80%" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#cccccc",
                      width: "90%",
                      lineHeight: 20,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
        </View>
        <View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 20,
              fontWeight: 700,
              color: "#a7a7a7",
            }}
          >
            Hôm qua
          </Text>
          {mock_data
            .filter((item) => item.day === "yesterday")
            .map((item) => (
              <View
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingVertical: 20,
                }}
              >
                <AntDesign
                  name={item.icon}
                  size={24}
                  color="#1646A9"
                  style={{ marginVertical: "auto", marginHorizontal: 30 }}
                />
                <View style={{ width: "80%" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#cccccc",
                      width: "90%",
                      lineHeight: 20,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
        </View>
        <View>
          <Text
            style={{
              marginTop: 20,
              marginLeft: 20,
              fontWeight: 700,
              color: "#a7a7a7",
            }}
          >
            Cũ hơn
          </Text>
          {mock_data
            .filter((item) => item.day === "older")
            .map((item) => (
              <View
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingVertical: 20,
                }}
              >
                <AntDesign
                  name={item.icon}
                  size={24}
                  color="#1646A9"
                  style={{ marginVertical: "auto", marginHorizontal: 30 }}
                />
                <View style={{ width: "80%" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#cccccc",
                      width: "90%",
                      lineHeight: 20,
                    }}
                  >
                    {item.desc}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
