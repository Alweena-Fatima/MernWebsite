import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js"; // use centralized config

const router = express.Router();

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "notes_pdfs",
    resource_type: "auto",
    public_id: (req, file) => {
      // remove .pdf from originalname if present
      const name = file.originalname.replace(/\.pdf$/i, "");
      return Date.now() + "-" + name;
    },
  },
});


const upload = multer({ storage });

// Route
router.post("/", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      console.error("Multer/Cloudinary upload error:", err);
      return res.status(500).json({ message: "Upload failed", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    res.status(200).json({
      message: "Upload successful",
      fileUrl: req.file.path, // Cloudinary URL
    });
  });
});

export default router;
