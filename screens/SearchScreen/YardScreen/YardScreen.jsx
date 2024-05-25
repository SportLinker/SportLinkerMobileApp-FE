import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import YardItem from "./YardItem";
import FilterEventOptionList from "../EventScreen/FilterEventOptionList";

const fake_data = [
  {
    id: 1,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN BÓNG NHÀ VĂN HÓA SINH VIÊN",
    location: "Quận 09",
    openTime: "7h00 - 22h00",
    openDay: "T2 đến CN mỗi tuần",
  },
  {
    id: 2,
    image: "https://ipsc.edu.vn/uploads/news/2020_07/hoi-boi-dhqg-hcm-3a.jpg",
    yardName: "HỒ BƠI ĐẠI HỌC QUỐC GIA",
    location: "Thủ Đức",
    openTime: "6h00 - 21h00",
    openDay: "T2 đến T7",
  },
  {
    id: 3,
    image:
      "https://yousport.vn/Media/Blog/san-bong-ro-tp-hcm/san-bong-ro-hcm-17.jpg",
    yardName: "SÂN BÓNG RỔ CÔNG VIÊN GIA ĐỊNH",
    location: "Phú Nhuận",
    openTime: "5h30 - 23h00",
    openDay: "Cả tuần",
  },
  {
    id: 4,
    image:
      "https://tinyfilms.vn/wp-content/uploads/2018/08/TinyFilms_L%E1%BB%85-khai-tr%C6%B0%C6%A1ng-s%C3%A2n-tennis-Ho%C3%A0ng-Gia.jpg",
    yardName: "SÂN TENNIS HOÀNG GIA",
    location: "Quận 7",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
  },
  {
    id: 5,
    image: "https://ts.huit.edu.vn/tttstt/images/tin-tuc/rlsk9.jpg",
    yardName: "HỒ BƠI ĐẠI HỌC CÔNG NGHIỆP",
    location: "Gò Vấp",
    openTime: "7h00 - 20h00",
    openDay: "T2 đến T6",
  },
  {
    id: 6,
    image: "https://sieuthicaulong.vn/userfiles/files/san-cau-long-mega.jpg",
    yardName: "SÂN CẦU LÔNG QUỐC TẾ",
    location: "Quận 1",
    openTime: "6h30 - 21h30",
    openDay: "T2 đến CN",
  },
  {
    id: 7,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN BÓNG ĐÁ TÂN BÌNH",
    location: "Tân Bình",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
  },
  {
    id: 8,
    image:
      "https://sport360.vn/wp-content/uploads/2019/08/Kich-thuoc-san-bong-chuyen-hoi-tieu-chuan-sport360vn-4.jpg",
    yardName: "SÂN BÓNG CHUYỀN PHÚ THỌ",
    location: "Quận 11",
    openTime: "6h00 - 21h00",
    openDay: "Cả tuần",
  },
  {
    id: 9,
    image:
      "https://www.myuc.vn/uploads/products/2019/01/28/pvcredcolortabletennisfloor.jpg",
    yardName: "SÂN BÓNG BÀN THỦ THIÊM",
    location: "Quận 2",
    openTime: "6h00 - 23h00",
    openDay: "T2 đến CN",
  },
  {
    id: 10,
    image:
      "https://sport360.vn/wp-content/uploads/2019/08/Kich-thuoc-san-bong-chuyen-hoi-tieu-chuan-sport360vn-4.jpg",
    yardName: "SÂN BÓNG CHUYỀN HÀ ĐÔ",
    location: "Quận 10",
    openTime: "5h00 - 22h00",
    openDay: "Cả tuần",
  },
  {
    id: 11,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN BÓNG ĐÁ VÕ VĂN TẦN",
    location: "Quận 3",
    openTime: "6h00 - 21h00",
    openDay: "T2 đến T7",
  },
];

export default function YardScreen() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location) {
        console.log("latitude: ", location.coords.latitude);
        console.log("longitude: ", location.coords.longitude);

        let addressArray = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        if (addressArray && addressArray.length > 0) {
          setAddress(addressArray[0]);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FilterEventOptionList />
      <View style={styles.locationWrapper}>
        {address ? (
          <Text style={styles.locationText}>
            Current Location: {address.street || ""}, {address.city || ""},{" "}
            {address.region || ""}, {address.country || ""}
          </Text>
        ) : location ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Text>{errorMsg || "Waiting..."}</Text>
        )}
      </View>
      <ScrollView style={{ height: "90%" }}>
        <YardItem data={fake_data} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  locationWrapper: {
    marginVertical: 20,
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    color: "black",
  },
});
