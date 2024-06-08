// StackNavigator.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

// Import screen components
import EditAccountScreen from "../screens/AccountScreen/EditAccountScreen";
import PasswordScreen from "../screens/AccountScreen/PasswordScreen";
import ChatDetail from "../screens/ChatScreen/ChatDetail";
import ListLikeScreen from "../screens/HomeScreen/ListLikeScreen";
import LoginScreen from "../screens/LoginScreen";
import NotificationScreen from "../screens/NotificationScreen/NotificationScreen";
import OTPInputScreen from "../screens/OTPScreen";
import PostLinkerScreen from "../screens/PostLinkerScreen/PostLinkerScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DetailCoachScreen from "../screens/SearchScreen/CoachScreen/DetailCoachScreen";
import DetailYardScreen from "../screens/SearchScreen/YardScreen/DetailYardScreen";
import DetailTransaction from "../screens/WalletScreen/DetailTransaction";
import WalletHome from "../screens/WalletScreen/WalletHomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RatingYardList from "../screens/YardOwner/RatingYardScreen/RatingYardList";
import BottomTabCoachNavigator from "../tabs/BottomTabCoachNavigator";
import BottomTabNavigator from "../tabs/BottomTabNavigator";
import BottomTabYardOwnerNavigator from "../tabs/BottomTabYardOwnerNavigator";
import EventDetailTabs from "../tabs/EventDetailTabs";
import WithDrawScreen from "../screens/YardOwner/WithDrawScreen";
import RatingYardItem from "../screens/YardOwner/RatingYardScreen/RatingYardItem";
import CoachCoursesScreen from "../screens/Coach/CourseCoach/CoachCoursesScreen";
import OrderYardScreen from "../screens/YardOwner/OrderYardScreen/OrderYardScreen";
import BookingScreen from "../screens/YardOwner/OrderYardScreen/BookingScreen";
import CreateBookingScreen from "../screens/YardOwner/OrderYardScreen/CreateBookingScreen";
import ListYardScreen from "../screens/YardOwner/ListYardScreen/ListYardScreen";
import ScheduleScreen from "../screens/Coach/ScheduleScreen/ScheduleScreen";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      options={{
        headerShown: false,
      }}
      component={WelcomeScreen}
    />
    <Stack.Screen
      name="Login"
      options={{
        headerShown: false,
      }}
      component={LoginScreen}
    />
    <Stack.Screen
      name="Register"
      options={{
        headerShown: false,
      }}
      component={RegisterScreen}
    />
    <Stack.Screen
      name="OTPScreen"
      options={{
        headerShown: false,
      }}
      component={OTPInputScreen}
    />
    <Stack.Screen
      name="BottomTabs"
      options={{
        headerShown: false,
      }}
      component={BottomTabNavigator}
    />
    <Stack.Screen
      name="BottomTabYardOwnerNavigator"
      options={{
        headerShown: false,
      }}
      component={BottomTabYardOwnerNavigator}
    />
    <Stack.Screen
      name="BottomTabCoachNavigator"
      options={{
        headerShown: false,
      }}
      component={BottomTabCoachNavigator}
    />
    <Stack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{
        title: "Thông Báo",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="WithDrawScreen"
      component={WithDrawScreen}
      options={{
        title: "Rút tiền",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="RatingYardListScreen"
      component={RatingYardList}
      options={{
        title: "Đáng giá sân",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="RatingYardItemScreen"
      component={RatingYardItem}
      options={{
        title: "Sân TSN",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="WalletHomeScreen"
      component={WalletHome}
      options={{
        title: "Ví tiền",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
        // headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="ChatDetailScreen"
      options={{
        headerShown: false,
      }}
      component={ChatDetail}
    />
    <Stack.Screen
      name="EventDetailScreen"
      options={{
        title: "Event Detail",
      }}
      component={EventDetailTabs}
    />
    <Stack.Screen
      name="EditAccountScreen"
      component={EditAccountScreen}
      options={{
        title: "",
        headerMode: "screen",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="PasswordScreen"
      component={PasswordScreen}
      options={{
        title: "",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="DetailCoachScreen"
      component={DetailCoachScreen}
      options={{
        title: "Chi Tiết Huấn Luyện Viên",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="ListLikeScreen"
      component={ListLikeScreen}
      options={{
        headerShown: false,
        headerLeft: () => null,
      }}
    />
    <Stack.Screen
      name="DetailYardScreen"
      component={DetailYardScreen}
      options={{
        title: "Chi Tiết Sân",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="PostLinkerScreen"
      component={PostLinkerScreen}
      options={{
        title: "Tạo bài đăng",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="DetailTransaction"
      component={DetailTransaction}
      options={{
        title: "Chi tiết giao dịch",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="CoachCoursesScreen"
      component={CoachCoursesScreen}
      options={{
        title: "Danh sách khóa học",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="OrderYardScreen"
      component={OrderYardScreen}
      options={{
        title: "Đơn đặt sân",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="Booking"
      component={BookingScreen}
      options={{
        title: "",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="CreateBooking"
      component={CreateBookingScreen}
      options={{
        title: "Đơn đặt sân",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="ListYard"
      component={ListYardScreen}
      options={{
        title: "Danh sách sân",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
    <Stack.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        title: "Lịch Đặt Sân",
        headerStyle: { backgroundColor: "#1646a9" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerBackTitle: " ",
      }}
    />
  </Stack.Navigator>
);

export default StackNavigator;
