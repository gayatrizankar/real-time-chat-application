import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js"; // ✅ Import Cloudinary configuration

// ✅ Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const allowedFormats = ["jpeg", "png", "jpg"];

    // ✅ Check file format before uploading
    const fileFormat = file.mimetype.split("/")[1]; // Extract format from mimetype
    if (!allowedFormats.includes(fileFormat)) {
      throw new Error("Unsupported file format");
    }

    return {
      folder: "profile_pictures", // ✅ Cloudinary folder
      format: fileFormat, // ✅ Store with correct format
      transformation: [{ width: 500, height: 500, crop: "limit" }], // ✅ Resize if needed
    };
  },
});

// ✅ Multer Upload Middleware
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // ✅ Set max file size (2MB)
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

// ✅ Export Upload Middleware
export default upload;
