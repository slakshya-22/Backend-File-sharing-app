const express = require("express");
const multer = require("multer");
const {
  uploadFile,
  getFiles,
  downloadFile,
} = require("../controllers/fileController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", getFiles);
router.get("/download/:id", downloadFile);

module.exports = router;
