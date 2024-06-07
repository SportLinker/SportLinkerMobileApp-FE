import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Pressable,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { DashCircle } from "../../../component/DashCircle";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../redux/selectors";
import { getDetailEvent } from "../../../redux/slices/eventSlice";

// const listData = [
//   {
//     date: "Monday, July 15",
//     match_group_by_date: [
//       {
//         time: "07:30",
//         matches: [
//           {
//             match_id: "clwyoaaz30015vz3u17zdvbon",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-07-15T00:30:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Wednesday, July 31",
//     match_group_by_date: [
//       {
//         time: "07:30",
//         matches: [
//           {
//             match_id: "clwyoby480019vz3ukvjdyi7q",
//             match_name: "Ninh",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-07-31T00:30:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Saturday, August 3",
//     match_group_by_date: [
//       {
//         time: "07:30",
//         matches: [
//           {
//             match_id: "clwynqboe000dvz3ud8uojm7y",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-08-03T00:30:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//       {
//         time: "10:00",
//         matches: [
//           {
//             match_id: "clwynuhur000hvz3uzzsk60yn",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-08-03T03:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Saturday, August 17",
//     match_group_by_date: [
//       {
//         time: "08:00",
//         matches: [
//           {
//             match_id: "clwyoec2x001jvz3uclg10652",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-08-17T01:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Thursday, August 29",
//     match_group_by_date: [
//       {
//         time: "13:00",
//         matches: [
//           {
//             match_id: "clwye601l0001v14txjenvr9o",
//             match_name: "Vui vẻ 5-5",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 10,
//             start_time: "2024-08-29T06:00:00.576Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//           {
//             match_id: "clwynlaze0009vz3ubbqee4bg",
//             match_name: "Vui vẻ 5-5",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 10,
//             start_time: "2024-08-29T06:00:00.576Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Friday, August 30",
//     match_group_by_date: [
//       {
//         time: "15:00",
//         matches: [
//           {
//             match_id: "clwyczroe000l57d2rfholqw3",
//             match_name: "Vui vẻ 5-5",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 10,
//             start_time: "2024-08-30T08:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Thursday, October 3",
//     match_group_by_date: [
//       {
//         time: "10:00",
//         matches: [
//           {
//             match_id: "clwynvvjm000lvz3uf40bc1ty",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-10-03T03:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//       {
//         time: "11:00",
//         matches: [
//           {
//             match_id: "clwynz85g000pvz3u8wv7voxd",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-10-03T04:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Sunday, November 3",
//     match_group_by_date: [
//       {
//         time: "11:00",
//         matches: [
//           {
//             match_id: "clwyo394u000tvz3uyxoc938a",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-11-03T04:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Tuesday, December 3",
//     match_group_by_date: [
//       {
//         time: "11:00",
//         matches: [
//           {
//             match_id: "clwyo3pg9000xvz3uu2iadle5",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-12-03T04:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
//   {
//     date: "Friday, December 6",
//     match_group_by_date: [
//       {
//         time: "11:00",
//         matches: [
//           {
//             match_id: "clwyo5mug0011vz3u7lc0hf57",
//             match_name: "D",
//             cid: "12022315892551549787",
//             sport_name: "Bóng đá",
//             total_join: 1,
//             maximum_join: 40,
//             start_time: "2024-12-06T04:00:00.000Z",
//             status: "upcomming",
//             user_create_id: "clwxu3soj000014ox8yfejzg3",
//             match_join: [
//               {
//                 user_join: {
//                   id: "clwxu3soj000014ox8yfejzg3",
//                   name: "bảo",
//                   avatar_url: null,
//                 },
//               },
//             ],
//             is_owner: false,
//             place_detail: {
//               position: 1,
//               title: "Sân Bóng Đá Cỏ Nhân Tạo Hòa Thảo",
//               address:
//                 "25 Chu Mạnh Trinh, P. Hội Phú, Thành phố Pleiku, Gia Lai, Vietnam",
//               latitude: 13.9607689,
//               longitude: 107.9947693,
//               rating: 3.7,
//               ratingCount: 6,
//               type: "Athletic field",
//               types: ["Athletic field"],
//               phoneNumber: "+84 903 603 697",
//               thumbnailUrl:
//                 "https://lh5.googleusercontent.com/p/AF1QipM8Da8SfIagchUyqBaVQ-dboEALO7Ljz7yoEY90",
//               cid: "12022315892551549787",
//               placeId: "ChIJIVTkH9IhbDERW4MReZvY16Y",
//             },
//             distance: {
//               text: "525.35 km",
//               value: 525353,
//             },
//           },
//         ],
//       },
//     ],
//   },
// ];

const EventScheduleTable = ({ eventListData, loading }) => {
  const dispatch = useDispatch();
  const [eventList, setEventList] = useState(null);
  const navigation = useNavigation();
  const userSelctor = useSelector(getUserSelector);

  useEffect(() => {
    //convert data to suitable format data for the section list
    if (eventListData) {
      console.log("eventListData", eventListData);
      const newData = eventListData?.map((event) => ({
        title: event.date,
        data: event.match_group_by_date,
      }));
      console.log("newData", newData);
      setEventList(newData);
    }
  }, [eventListData]);

  const eventView = ({ item, index }) => {
    //handle render member avatar
    const maxItems = 5;
    // Prepare the data to render
    let renderData = item?.match_join?.slice(0, maxItems);

    // If members are less than 5, add placeholders
    if (renderData?.length < maxItems) {
      for (let i = renderData?.length; i < maxItems; i++) {
        renderData.push({ id: `placeholder-${i}`, isPlaceholder: true });
      }
    }

    // Add remaining count indicator if members are more than 5
    if (item?.total_join > maxItems) {
      renderData.push({
        id: "more",
        remaining: item?.total_join - maxItems,
      });
    }

    return (
      <Pressable
        onPress={() => {
          dispatch(getDetailEvent(item.match_id)).then((res) => {
            navigation.navigate("EventDetailScreen");
          });
        }}
      >
        <View
          style={[
            {
              display: "flex",
              paddingVertical: 10,
            },
            index != 0 && {
              borderTopColor: "#707070",
              borderTopWidth: 1,
            },
          ]}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <Icon2
              name={item?.sport_name == "Bóng đá" && "soccer"}
              size={30}
              style={{
                color: "black",
              }}
            />
            {item.user_create_id == userSelctor?.id && (
              <Text
                style={{
                  backgroundColor: "#5BD027",
                  color: "white",
                  height: 25,
                  borderRadius: 15,
                  overflow: "hidden",
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                }}
              >
                Tổ chức
              </Text>
            )}
            {item.user_create_id != userSelctor?.id &&
              item?.total_join == item?.maximum_join && (
                <Text
                  style={{
                    backgroundColor: "#1646a9",
                    color: "white",
                    height: 25,
                    borderRadius: 15,
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                  }}
                >
                  Đủ người
                </Text>
              )}
            {item.user_create_id != userSelctor?.id &&
              item?.total_join != item?.maximum_join && (
                <Text
                  style={{
                    backgroundColor: "#9a9a98",
                    color: "white",
                    height: 25,
                    borderRadius: 15,
                    overflow: "hidden",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                  }}
                >
                  Chưa Đủ Người
                </Text>
              )}
          </View>
          <View
            style={{
              display: "flex",
              gap: 10,
              paddingLeft: 40,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item?.match_name}
            </Text>
            <Text style={{ fontSize: 15, color: "#717171" }}>
              <Icon name="enviromento" size={16} color={"#717171"} />
              {item?.place_detail.title}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "500" }}
              >{`${item?.total_join}/${item?.maximum_join}`}</Text>
              <Text>•</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {renderData?.map((newItem, index) => {
                  if (newItem?.isPlaceholder) {
                    return <DashCircle key={newItem?.id + index} />;
                  } else if (newItem?.remaining) {
                    return (
                      <Text
                        key={newItem?.id + index}
                        style={{
                          color: "#717171",
                          fontWeight: "bold",
                          fontSize: 16,
                          marginLeft: 5,
                        }}
                      >
                        +{newItem?.remaining}
                      </Text>
                    );
                  } else {
                    return (
                      <Avatar.Image
                        key={index}
                        size={30}
                        source={{
                          uri: newItem.user_join?.avatar_url
                            ? newItem.user_join?.avatar_url
                            : "https://www.redditstatic.com/avatars/avatar_default_03_FF8717.png",
                        }}
                      />
                    );
                  }
                })}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const scheduleItem = ({ item: scheduleItem }) => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderColor: "#707070",
          borderWidth: 1,
        }}
      >
        <View
          style={{
            width: "20%",
            borderColor: "#707070",
            borderRightWidth: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {scheduleItem?.time}
          </Text>
        </View>
        <View style={{ width: "80%", paddingHorizontal: 10 }}>
          <FlatList
            data={scheduleItem?.matches}
            renderItem={eventView}
            keyExtractor={(item, index) => {
              return index + "" + scheduleItem?.time;
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {loading && <Loading message={"Loading..."} visible={loading}></Loading>}
      {!loading && eventList && (
        <SectionList
          stickySectionHeadersEnabled
          sections={eventList}
          keyExtractor={(item, index) => index}
          renderItem={scheduleItem}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <Text
                style={{
                  paddingBottom: 10,
                  paddingTop: 20,
                  paddingLeft: 20,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#1646A9",
                  backgroundColor: "#F7F7F7",
                }}
              >
                {title}
              </Text>
            </View>
          )}
        />
      )}

      {!loading && !eventList && (
        <View>
          <Text
            style={{
              color: "#1646A9",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 30,
            }}
          >
            Không tìm thấy trận đấu nào!
          </Text>
        </View>
      )}
    </View>
  );
};

export default EventScheduleTable;
