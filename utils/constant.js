import { Dimensions } from "react-native";

export const DEFAULT_DISTACNCE = 10000000;

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
  // Add more sports as needed
];

// find icon base on label name
export function getSportIcon(sportName) {
  // Tìm môn thể thao trong mảng sports
  const sport = sports.find((s) => s.sport_name === sportName);

  return sport ? sport.icon : "soccer";
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
