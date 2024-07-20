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
  // Clean up input strings
  const cleanedEventDate = eventDate.trim();
  const cleanedEventTime = eventTime.trim().replace(/\u202F/g, " "); // Replace non-breaking spaces

  // Debugging checks
  console.log(`Cleaned Event Date: ${cleanedEventDate}`);
  console.log(`Cleaned Event Time: ${cleanedEventTime}`);
  console.log(`Duration: ${duration}`);

  // Parse eventDate (expected format: MM/DD/YYYY)
  const [month, day, year] = cleanedEventDate.split("/").map(Number);

  // Parse eventTime (expected format: hh:mm AM/PM)
  const [time, period] = cleanedEventTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Debugging checks
  console.log(`Parsed Date: Year ${year}, Month ${month}, Day ${day}`);
  console.log(
    `Parsed Time: Hours ${hours}, Minutes ${minutes}, Period ${period}`
  );

  // Validate date components
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    throw new Error("Invalid date components");
  }

  // Validate time components
  if (isNaN(hours) || isNaN(minutes) || !period) {
    throw new Error("Invalid time components");
  }

  // Convert 12-hour time to 24-hour time
  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  // Validate hour and minute ranges
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error("Invalid time range");
  }

  // Create Date object for start time
  const startDate = new Date(year, month - 1, day, hours, minutes);

  // Validate start date
  if (isNaN(startDate.getTime())) {
    throw new Error("Invalid start date");
  }

  // Calculate end time by adding duration (in minutes)
  const endTime = new Date(startDate.getTime() + duration * 60000);

  // Return ISO 8601 formatted strings for start and end time
  return {
    start_time: startDate.toISOString(),
    end_time: endTime.toISOString(),
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

// USE AT TRANSACTION REVIEW
export function formatISODate(isoDateStr) {
  // Parse the ISO date string
  const date = new Date(isoDateStr);

  // Extract components
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  // Format the date and time
  return `${hours}:${minutes} - ${day}/${month}/${year}`;
}

// Get an array string sport name from array sport object - Register ,Edit Account Screen
export const getArrStringSportName = (sportArrObj) => {
  const sportNameArr = sportArrObj.map((sport) =>
    sport.sport_name ? sport.sport_name : sport
  );
  console.log("sportNameArr", sportNameArr);
  return sportNameArr;
};

//get the time distance from the blog created
export function getDistanceTime(timestamp) {
  const postDate = new Date(timestamp);
  const currentDate = new Date();
  const timeDifference = currentDate - postDate;

  const millisecondsInAnHour = 1000 * 60 * 60;
  const millisecondsInADay = millisecondsInAnHour * 24;

  if (timeDifference < millisecondsInADay) {
    //if the distance time less than 24hours ago
    const hoursAgo = Math.floor(timeDifference / millisecondsInAnHour);
    return `${hoursAgo}h`;
  } else if (timeDifference < millisecondsInADay * 7) {
    //if the distance time less than 7 days ago
    const daysAgo = Math.floor(timeDifference / millisecondsInADay);
    return `${daysAgo} ngày`;
  } else {
    //if the distance time more than 7 days ago
    const day = postDate.getDate();
    const month = postDate.getMonth() + 1;
    const year = postDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

// CONVERT HTTP TO HTTPS
export function convertHttpToHttps(url) {
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
}
