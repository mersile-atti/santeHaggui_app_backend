const mongoose = require('mongoose')

const pharmacySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    pharmacyName: String,
    prescriptionHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prescriptions' }],
    insuranceProvider: String,
    pharmacyAddress: String,
    pharmacyPhone: String,
  });
  
  module.exports = mongoose.model('Pharmacy', pharmacySchema);
   
