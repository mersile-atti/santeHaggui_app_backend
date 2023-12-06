const mongoose = require("mongoose");

const vaccinationsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    vaccineName: String,
    vaccinationProvider: String,
    administeredAt: { type: Date, default: Date.now },
    // Add more vaccination-related fields as needed
  });
  
 module.exports = mongoose.model('Vaccinations', vaccinationsSchema);
  