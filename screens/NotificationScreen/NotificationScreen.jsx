import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";

const mock_data = [
  {
    id: 1,
    icon: "checkcircleo",
    title: "Account Verified",
    desc: "Your account has been verified",
    day: "today",
  },
  {
    id: 2,
    icon: "checkcircleo",
    title: "Payment Received",
    desc: "We have received your payment",
    day: "today",
  },
  {
    id: 3,
    icon: "closecircleo",
    title: "Payment Failed",
    desc: "Your payment failed. Please try again",
    day: "yesterday",
  },
  {
    id: 4,
    icon: "infocirlceo",
    title: "New Feature Released",
    desc: "Check out the new feature we have released",
    day: "yesterday",
  },
  {
    id: 5,
    icon: "warning",
    title: "Security Alert",
    desc: "A new login to your account was detected",
    day: "yesterday",
  },
  {
    id: 6,
    icon: "mail",
    title: "New Message",
    desc: "You have received a new message",
    day: "yesterday",
  },
  {
    id: 7,
    icon: "checkcircleo",
    title: "Subscription Renewed",
    desc: "Your subscription has been renewed",
    day: "today",
  },
  {
    id: 8,
    icon: "like2",
    title: "New Like",
    desc: "Someone liked your post",
    day: "older",
  },
  {
    id: 9,
    icon: "message1",
    title: "New Comment",
    desc: "Someone commented on your post",
    day: "older",
  },
  {
    id: 10,
    icon: "bells",
    title: "Reminder",
    desc: "Don't forget to check your tasks",
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
            Today
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
                  color="#6f9495"
                  style={{ marginVertical: "auto", marginHorizontal: 30 }}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 700 }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: 700, color: "#d7d7d7" }}
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
            Yesterday
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
                  color="#6f9495"
                  style={{ marginVertical: "auto", marginHorizontal: 30 }}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 700 }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: 700, color: "#d7d7d7" }}
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
            Older
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
                  color="#6f9495"
                  style={{ marginVertical: "auto", marginHorizontal: 30 }}
                />
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 700 }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: 700, color: "#d7d7d7" }}
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
