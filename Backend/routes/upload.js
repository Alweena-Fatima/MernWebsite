import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'notes_pdfs',
    resource_type: 'auto',
    format: async (req, file) => 'pdf',
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage });

// Route
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: 'Upload failed' });
  }

  res.status(200).json({
    message: 'Upload successful',
    fileUrl: req.file.path,
  });
});

export default router;
