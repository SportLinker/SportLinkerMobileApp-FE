import { Dimensions } from "react-native";

export const DEFAULT_DISTACNCE = 10000000;

export const listYardData = [
  {
    id: 1,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN 1",
    openTime: "7h00 - 22h00",
    openDay: "T2 đến CN mỗi tuần",
    status: "active",
    price: "100.000 VNĐ/giờ",
    description: "Sân bóng chuyền ngoài trời, đẹp và rộng rãi.",
  },
  {
    id: 2,
    image: "https://ipsc.edu.vn/uploads/news/2020_07/hoi-boi-dhqg-hcm-3a.jpg",
    yardName: "SÂN 2",
    openTime: "6h00 - 21h00",
    openDay: "T2 đến T7",
    status: "inactive",
    price: "150.000 VNĐ/giờ",
    description:
      "Sân bóng đá sân 7, không gian lý tưởng cho các trận đấu nhóm nhỏ.",
  },
  {
    id: 3,
    image:
      "https://yousport.vn/Media/Blog/san-bong-ro-tp-hcm/san-bong-ro-hcm-17.jpg",
    yardName: "SÂN 3",
    openTime: "5h30 - 23h00",
    openDay: "Cả tuần",
    status: "active",
    price: "120.000 VNĐ/giờ",
    description:
      "Sân bóng đá sân 5 với cỏ nhân tạo chất lượng cao, phù hợp cho cả gia đình và bạn bè.",
  },
  {
    id: 4,
    image:
      "https://tinyfilms.vn/wp-content/uploads/2018/08/TinyFilms_L%E1%BB%85-khai-tr%C6%B0%C6%A1ng-s%C3%A2n-tennis-Ho%C3%A0ng-Gia.jpg",
    yardName: "SÂN 4",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
    status: "inactive",
    price: "110.000 VNĐ/giờ",
    description:
      "Sân tennis chuyên nghiệp, đáp ứng mọi nhu cầu chơi tennis cá nhân và nhóm.",
  },
  {
    id: 5,
    image: "https://ts.huit.edu.vn/tttstt/images/tin-tuc/rlsk9.jpg",
    yardName: "SÂN 5",
    openTime: "7h00 - 20h00",
    openDay: "T2 đến T6",
    status: "active",
    price: "130.000 VNĐ/giờ",
    description:
      "Sân đá bóng mini, tiện lợi và phù hợp cho các trận đấu nhẹ nhàng vào buổi chiều.",
  },
  {
    id: 6,
    image: "https://sieuthicaulong.vn/userfiles/files/san-cau-long-mega.jpg",
    yardName: "SÂN 6",
    openTime: "6h30 - 21h30",
    openDay: "T2 đến CN",
    status: "inactive",
    price: "140.000 VNĐ/giờ",
    description:
      "Sân cầu lông trong nhà, thiết kế đẹp và sạch sẽ, phục vụ cho mọi trình độ chơi cầu lông.",
  },
  {
    id: 7,
    image:
      "https://www.nhavanhoasinhvien.vn/wp-content/uploads/2022/12/%E1%BA%A2nh-ch%E1%BB%A5p-M%C3%A0n-h%C3%ACnh-2022-12-08-l%C3%BAc-10.09.05.png",
    yardName: "SÂN 7",
    openTime: "6h00 - 22h00",
    openDay: "T2 đến CN",
    status: "active",
    price: "115.000 VNĐ/giờ",
    description:
      "Sân tennis ngoài trời, đẹp và phù hợp cho các hoạt động thể thao gia đình và bạn bè.",
  },
  {
    id: 8,
    image:
      "https://sport360.vn/wp-content/uploads/2019/08/Kich-thuoc-san-bong-chuyen-hoi-tieu-chuan-sport360vn-4.jpg",
    yardName: "SÂN 8",
    openTime: "6h00 - 21h00",
    openDay: "Cả tuần",
    status: "inactive",
    price: "125.000 VNĐ/giờ",
    description:
      "Sân bóng chuyền chuyên nghiệp, phù hợp cho các giải đấu và huấn luyện viên.",
  },
  {
    id: 9,
    image:
      "https://www.myuc.vn/uploads/products/2019/01/28/pvcredcolortabletennisfloor.jpg",
    yardName: "SÂN 9",
    openTime: "6h00 - 23h00",
    openDay: "T2 đến CN",
    status: "active",
    price: "135.000 VNĐ/giờ",
    description:
      "Sân bóng đá sân 7 với cỏ nhân tạo cao cấp, phục vụ cho các trận đấu chuyên nghiệp.",
  },
  {
    id: 10,
    image:
      "https://sport360.vn/wp-content/uploads/2019/08/Kich-thuoc-san-bong-chuyen-hoi-tieu-chuan-sport360vn-4.jpg",
    yardName: "SÂN 10",
    openTime: "5h00 - 22h00",
    openDay: "Cả tuần",
    status: "inactive",
    price: "145.000 VNĐ/giờ",
    description:
      "Sân bóng đá sân 5, sân bóng 5 người rộng rãi và tiện nghi cho các trận đấu nhóm.",
  },
];

export const yard_data = [
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

export const courses = [
  {
    id: 1,
    title: "Bài tập toàn thân",
    description:
      "Kế hoạch tập luyện toàn thân toàn diện để tăng cường sức mạnh và sức bền.",
    duration: "4 tuần",
    benefits: "Tăng cường sức mạnh, đốt cháy mỡ, cải thiện sức khỏe tim mạch",
    price: "$49.99",
  },
  {
    id: 2,
    title: "Yoga cho người mới bắt đầu",
    description:
      "Khóa học yoga dành cho người mới bắt đầu giúp cải thiện linh hoạt và giảm căng thẳng.",
    duration: "6 tuần",
    benefits: "Tăng cường sự linh hoạt, giảm căng thẳng, cải thiện tinh thần",
    price: "$29.99",
  },
  {
    id: 3,
    title: "Nền tảng Gymnastics",
    description:
      "Học cách làm các động tác cơ bản của gymnastics bao gồm nhảy, lăn, và đứng trên tay.",
    duration: "8 tuần",
    benefits: "Tăng cường độ linh hoạt, sức mạnh, và cân bằng",
    price: "$39.99",
  },
  {
    id: 4,
    title: "Chạy dành cho người mới bắt đầu",
    description:
      "Một hướng dẫn cho người mới bắt đầu về chạy, bao gồm mọi thứ từ kiểu dáng chính xác đến việc tăng cường sức bền.",
    duration: "3 tháng",
    benefits: "Cải thiện sức khỏe tim mạch, giảm cân, giảm căng thẳng",
    price: "$19.99",
  },
  {
    id: 5,
    title: "Thiền và Tâm lý học",
    description:
      "Học các kỹ thuật thiền và tâm lý học để giảm căng thẳng và tạo ra sự bình an bên trong.",
    duration: "6 tuần",
    benefits:
      "Giảm căng thẳng, tăng cảnh giác về bản thân, tăng trạng thái tâm trí",
    price: "$34.99",
  },
  {
    id: 6,
    title: "Tập thể dục cường độ cao (HIIT)",
    description:
      "Một lịch trình tập thể dục nhanh chóng kết hợp các đợt tập luyện cường độ cao với các đợt nghỉ hoặc tập luyện cường độ thấp hơn.",
    duration: "4 tuần",
    benefits:
      "Đốt cháy calo, cải thiện sức khỏe tim mạch, tăng cường trao đổi chất",
    price: "$44.99",
  },
  {
    id: 7,
    title: "Pilates cho Sức mạnh Cơ bản",
    description:
      "Tập trung vào việc xây dựng sức mạnh cơ bản và cải thiện tư thế qua các bài tập Pilates.",
    duration: "5 tuần",
    benefits: "Sức mạnh cơ bản, linh hoạt, tư thế tốt hơn",
    price: "$39.99",
  },
  {
    id: 8,
    title: "Dinh dưỡng Cơ bản",
    description:
      "Học các kiến thức cơ bản về dinh dưỡng bao gồm các chất dinh dưỡng lớn, các chất dinh dưỡng vi lượng, và thói quen ăn uống lành mạnh.",
    duration: "6 tuần",
    benefits: "Cải thiện sức khỏe tổng thể, quản lý cân nặng, tăng năng lượng",
    price: "$49.99",
  },
  {
    id: 9,
    title: "Tập Luyện Sức mạnh cho Phụ nữ",
    description:
      "Một chương trình tập luyện sức mạnh được thiết kế đặc biệt cho phụ nữ để xây dựng cơ bắp và tăng sức mạnh.",
    duration: "3 tháng",
    benefits: "Tạo hình cơ bắp, tăng trao đổi chất, cải thiện độ dày của xương",
    price: "$54.99",
  },
  {
    id: 10,
    title: "Thái Cực Đạo để Giảm Căng Thẳng",
    description:
      "Học các động tác dịu dàng của Thái Cực Đạo để giảm căng thẳng và tạo ra sự thư giãn.",
    duration: "8 tuần",
    benefits: "Giảm căng thẳng, cải thiện cân bằng, rõ ràng tinh thần",
    price: "$29.99",
  },
];

export const sports = [
  {
    sport_name: "Bóng đá",
    value: "soccer",
    icon: "soccer",
  },
  {
    sport_name: "Bóng rổ",
    value: "basketball",
    icon: "basketball",
  },
  {
    sport_name: "Bóng chuyền",
    value: "volleyball",
    icon: "volleyball",
  },
  {
    sport_name: "Cầu lông",
    value: "badminton",
    icon: "badminton",
  },
  {
    sport_name: "Bơi lội",
    value: "swimming",
    icon: "swim",
  },
  {
    sport_name: "Đua xe",
    value: "racing",
    icon: "bike",
  },
  {
    sport_name: "Bóng bàn",
    value: "table-tennis",
    icon: "table-tennis",
  },
  // Add more sports as needed
];

// find icon base on sport name like "Bóng đá"
export function getSportIcon(sportName) {
  // Tìm môn thể thao trong mảng sports
  const sport = sports.find((s) => s.sport_name === sportName);

  return sport ? sport.icon : "soccer";
}

//find sport onject from sport name
export function getSportObj(sportName) {
  const sport = sports.find((s) => s.sport_name === sportName);

  return sport ? sport : null;
}

export const locations = [
  { id: 1, name: "Gò Vấp", description: "Gò Vấp, Ho Chi Minh, Viet Nam" },
  { id: 2, name: "Phú Nhuận", description: "Phú Nhuận, Ho Chi Minh, Viet Nam" },
  { id: 3, name: "Quận 1", description: "Quận 1, Ho Chi Minh, Viet Nam" },
  { id: 4, name: "Quận 2", description: "Quận 2, Ho Chi Minh, Viet Nam" },
  { id: 5, name: "Quận 3", description: "Quận 3, Ho Chi Minh, Viet Nam" },
  { id: 6, name: "Quận 4", description: "Quận 4, Ho Chi Minh, Viet Nam" },
  { id: 7, name: "Quận 5", description: "Quận 5, Ho Chi Minh, Viet Nam" },
  { id: 8, name: "Quận 6", description: "Quận 6, Ho Chi Minh, Viet Nam" },
  { id: 9, name: "Quận 7", description: "Quận 7, Ho Chi Minh, Viet Nam" },
  { id: 10, name: "Quận 8", description: "Quận 8, Ho Chi Minh, Viet Nam" },
  { id: 11, name: "Quận 9", description: "Quận 9, Ho Chi Minh, Viet Nam" },
  { id: 12, name: "Quận 10", description: "Quận 10, Ho Chi Minh, Viet Nam" },
  { id: 13, name: "Quận 11", description: "Quận 11, Ho Chi Minh, Viet Nam" },
  { id: 14, name: "Quận 12", description: "Quận 12, Ho Chi Minh, Viet Nam" },
  { id: 15, name: "Tân Bình", description: "Tân Bình, Ho Chi Minh, Viet Nam" },
  { id: 16, name: "Tân Phú", description: "Tân Phú, Ho Chi Minh, Viet Nam" },
  {
    id: 17,
    name: "Bình Thạnh",
    description: "Bình Thạnh, Ho Chi Minh, Viet Nam",
  },
  { id: 18, name: "Thủ Đức", description: "Thủ Đức, Ho Chi Minh, Viet Nam" },
  { id: 19, name: "Bình Tân", description: "Bình Tân, Ho Chi Minh, Viet Nam" },
  { id: 20, name: "Củ Chi", description: "Củ Chi, Ho Chi Minh, Viet Nam" },
  { id: 21, name: "Hóc Môn", description: "Hóc Môn, Ho Chi Minh, Viet Nam" },
  { id: 22, name: "Nhà Bè", description: "Nhà Bè, Ho Chi Minh, Viet Nam" },
  { id: 23, name: "Cần Giờ", description: "Cần Giờ, Ho Chi Minh, Viet Nam" },
  {
    id: 24,
    name: "Bình Chánh",
    description: "Bình Chánh, Ho Chi Minh, Viet Nam",
  },
];

// Lấy ngày hiện tại
const currentDate = new Date();

// Tính ngày tối thiểu (ngày hiện tại)
export const minDate = new Date(currentDate);

// Tính ngày tối đa (1 năm sau)
export const maxDate = new Date(
  currentDate.setFullYear(currentDate.getFullYear() + 1)
);

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");
