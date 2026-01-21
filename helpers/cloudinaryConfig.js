const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let resourceType = "image";

    if (file.mimetype.startsWith("video")) {
      resourceType = "video";
    }

    return {
      folder: "uploads",
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

const parser = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image") ||
      file.mimetype.startsWith("video")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image & video allowed"));
    }
  },
});

module.exports = { cloudinary, parser };
