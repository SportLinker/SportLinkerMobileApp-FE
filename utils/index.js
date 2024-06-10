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

export function convertUTCToVietnamTime(utcStr) {
  // Tạo đối tượng Date từ chuỗi UTC
  let utcDate = new Date(utcStr);

  // Lấy giờ và phút theo giờ Việt Nam (GMT+7)
  let vietnamHours = utcDate.getUTCHours() + 7;
  let vietnamMinutes = utcDate.getUTCMinutes();

  // Nếu giờ vượt quá 24, chuyển sang ngày tiếp theo
  if (vietnamHours >= 24) {
    vietnamHours -= 24;
    utcDate.setUTCDate(utcDate.getUTCDate() + 1);
  }

  // Định dạng lại giờ và phút
  let hours = vietnamHours.toString().padStart(2, "0");
  let minutes = vietnamMinutes.toString().padStart(2, "0");

  // Lấy ngày tháng năm
  let year = utcDate.getUTCFullYear();
  let month = (utcDate.getUTCMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  let day = utcDate.getUTCDate().toString().padStart(2, "0");

  // Kết hợp thành chuỗi kết quả
  return `${year}-${month}-${day} ${hours}h${minutes}`;
}

// 2024-06-09T03:11:56.622Z to  Output: "3:11 AM"
export function convertTo12HourFormat(isoString) {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Get the hours and minutes
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always have two digits
  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  // Return the formatted time
  return `${hours}:${minutesFormatted} ${ampm}`;
}
