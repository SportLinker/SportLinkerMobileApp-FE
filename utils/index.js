import moment from "moment-timezone";

export const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("vi-VN", options);
};

export const formatTime = (time) => {
  return time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  // Format number to currency
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return formatter.format(amount);
}

export function calculateEventTimes(eventDate, eventTime, duration) {
  // Chuyển đổi eventDate và eventTime sang đối tượng Date
  const [day, month, year] = eventDate.split("/");
  const [time, period] = eventTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Chuyển đổi thời gian AM/PM sang 24 giờ
  if (period === "PM" && hours < 12) {
    hours += 12;
  }
  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Tạo đối tượng Date cho thời gian bắt đầu
  const startDate = new Date(year, month - 1, day, hours, minutes);

  // Tạo đối tượng Date cho thời gian kết thúc bằng cách thêm thời lượng (phút) vào thời gian bắt đầu
  const endDate = new Date(startDate.getTime() + duration * 60000);

  // Trả về thời gian bắt đầu và kết thúc dưới dạng ISO 8601
  return {
    start_time: startDate.toISOString(),
    end_time: endDate.toISOString(),
  };
}

// Ví dụ sử dụng hàm
// const eventDate = "2/6/2024";
// const eventTime = "7:00 AM";
// const duration = 30;

// const times = calculateEventTimes(eventDate, eventTime, duration);
// console.log(times);

//timestamp like "2024-08-30T08:00:00.000Z";
const formatDateString = (timestamp) => {
  // Convert timestamp to local date and time
  const localDatetime = moment.tz(timestamp, "Asia/Ho_Chi_Minh");

  // Get today's date in local timezone
  const today = moment().tz("Asia/Ho_Chi_Minh").startOf("day");

  // Check if the date is today
  if (localDatetime.isSame(today, "day")) {
    return "Hôm nay";
  } else {
    // Get the day of the week in Vietnamese
    const weekdays = [
      "Chủ nhật",
      "Thứ hai",
      "Thứ ba",
      "Thứ tư",
      "Thứ năm",
      "Thứ sáu",
      "Thứ bảy",
    ];
    const weekday = weekdays[localDatetime.day()];

    // Format the date string
    return `${weekday}, Ngày ${localDatetime.date()} tháng ${
      localDatetime.month() + 1
    }`;
  }
};
