import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname.replace(/\s/g, ""));
//   },
// });

const storage = new CloudinaryStorage({
  cloudinary, 
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "jpeg", "png"],
    resource_type: "auto"
  }
})

const upload = multer({ storage });

export default upload;
