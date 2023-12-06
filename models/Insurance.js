const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    insuranceProvider: String,
    policyNumber: String,
    groupNumber: String,
    effectiveDate: Date,
    expirationDate: Date,
    coverageDetails: String,
    // Add more insurance-related fields as needed
  });
  
  module.exports = mongoose.model('Insurance', insuranceSchema);
   