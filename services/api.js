import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.x.x:8080/v1/api"; // Replace with your IP address

export const api = axios.create({
  baseURL: API_URL,
});

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (token) {
//       prom.resolve(token);
//     } else {
//       prom.reject(error);
//     }
//   });

//   failedQueue = [];
// };

// api.interceptors.request.use(
//   async (config) => {
//     const accessToken = await AsyncStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["x-authentication"] = accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers["x-authentication"] = token;
//             return api(originalRequest);
//           })
//           .catch((err) => {
//             return Promise.reject(err);
//           });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       const refreshToken = await user.token.refreshToken;
//       return new Promise((resolve, reject) => {
//         axios
//           .post(`${API_URL}/authen/refresh-token`, { refreshToken })
//           .then(async ({ data }) => {
//             // Store tokens in AsyncStorage
//             await AsyncStorage.setItem(
//               "accessToken",
//               data.metadata.token.accessToken
//             );
//             await AsyncStorage.setItem(
//               "refreshToken",
//               data.metadata.token.refreshToken
//             );
//             api.defaults.headers["x-authentication"] = data.accessToken;
//             originalRequest.headers["x-authentication"] = data.accessToken;
//             processQueue(null, data.accessToken);
//             resolve(api(originalRequest));
//           })
//           .catch((err) => {
//             processQueue(err, null);
//             reject(err);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error);
//   }
// );
