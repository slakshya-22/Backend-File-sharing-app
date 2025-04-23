const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  originalName: String,
  savedName: String,
  filePath: String,
  fileSize: Number,
  fileType: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);
