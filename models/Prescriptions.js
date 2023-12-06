const mongoose = require('mongoose');

const prescriptionsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    prescriptionId: { type: String, required: true, unique: true }, // Unique ID for the prescription
    doctorName: String,
    pharmacyName: String,
    prescriptionDate: { type: Date, default: Date.now },
    notes: String,
    medicationName: String,
    dosage: String,
    instructions: String,
    // Add more prescription-related fields as needed
  });
  
  module.exports = mongoose.model('Prescriptions', prescriptionsSchema);
