const mongoose = require('mongoose');

const EmergencyMedicalProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  profilePicture: String,
  name: String,
  birthday: Date,
  bloodType: String,
  sex: String,
  allergies: [String],
  medications: [String],
  treatmentsAndProcedures: [String],
  address: String,
  emergencyContact: {
    name: String,
    address: String,
    phoneNumber: String,
    relationship: String,
  },
});


module.exports = mongoose.model("EmergencyProfile", EmergencyMedicalProfileSchema);
