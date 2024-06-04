import { Dimensions } from "react-native";

export const DEFAULT_DISTACNCE = 10000000;

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
