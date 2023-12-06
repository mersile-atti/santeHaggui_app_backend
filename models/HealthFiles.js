const mongoose = require('mongoose');

const healthFilesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    fileName: String,
    fileType: String,
    fileUrl: String,
    uploadedAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('HealthFiles', healthFilesSchema);
  
  