import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import YardItem from "./YardItem";
import { ScrollView } from "react-native-gesture-handler";

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
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "HỒ BƠI ĐẠI HỌC QUỐC GIA",
    location: "Thủ Đức",
    openTime: "6h00 - 21h00",
    openDay: "T2 đến T7",
  },
  {
    id: 3,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN BÓNG RỔ CÔNG VIÊN GIA ĐỊNH",
    location: "Phú Nhuận",
    openTime: "5h30 - 23h00",
    openDay: "Cả tuần",
  },
  {
    id: 4,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN TENNIS HOÀNG GIA",
    location: "Quận 7",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
  },
  {
    id: 5,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "HỒ BƠI ĐẠI HỌC CÔNG NGHIỆP",
    location: "Gò Vấp",
    openTime: "7h00 - 20h00",
    openDay: "T2 đến T6",
  },
  {
    id: 6,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
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
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN BÓNG CHUYỀN PHÚ THỌ",
    location: "Quận 11",
    openTime: "6h00 - 21h00",
    openDay: "Cả tuần",
  },
  {
    id: 9,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN BÓNG BÀN THỦ THIÊM",
    location: "Quận 2",
    openTime: "6h00 - 23h00",
    openDay: "T2 đến CN",
  },
  {
    id: 10,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
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
  return (
    <SafeAreaView>
      <ScrollView>
        <YardItem data={fake_data} />
      </ScrollView>
    </SafeAreaView>
  );
}
