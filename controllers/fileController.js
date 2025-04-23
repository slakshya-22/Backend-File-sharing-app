const File = require("../models/fileModel");
const path = require("path");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const newFile = new File({
      originalName: req.file.originalname,
      savedName: req.file.filename,
      filePath: req.file.path,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
    });

    await newFile.save();
    res.status(201).json({ message: "File uploaded", file: newFile });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Unable to get files" });
  }
};

const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const filePath = path.resolve(file.filePath);
    res.download(filePath, file.originalName);
  } catch (error) {
    console.error("Download error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { uploadFile, getFiles, downloadFile };
