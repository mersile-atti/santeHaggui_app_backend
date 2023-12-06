import mongoose from "mongoose";


const EmergencyMedicalProfileSchema = mongoose.Schema({
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


const EmergencyMedicalProfile = mongoose.model("EmergencyProfile", EmergencyMedicalProfileSchema);

export default EmergencyMedicalProfile;