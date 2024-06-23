import axios from "axios";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET_NAME } from "@env";
import { Platform } from "react-native";

export const uploadImageToCloudinary = async (uri, type, fileName) => {
  console.log("uri:", uri, "type:", type, "file:", fileName);
  const data = new FormData();
  data.append("file", {
    uri: uri,
    type: Platform.OS == "android" ? "image/jpeg" : "image/jpg",
    name: `upload_${Date.now()}.jpg`,
  });

  data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET_NAME); // Tạo upload preset trong Cloudinary
  data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Image uploaded successfully: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error uploading image: ", error);
  }
};
