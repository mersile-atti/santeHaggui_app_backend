// controllers/emergencyProfileController.js
import asyncHandler from 'express-async-handler';
import EmergencyMedicalProfile from '../models/EmergencyProfile.js';
import User from '../models/userModel.js';

// @desc Create or update user's emergency profile
// route POST /api/users/profile/emergency-profile
// @access Private
const createOrUpdateEmergencyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // Check if the emergency profile already exists using exists()
    const emergencyProfileExists = await EmergencyMedicalProfile.exists({ user: req.user._id });

    if (emergencyProfileExists) {
      // Update the existing emergency profile
      const updatedEmergencyProfile = await EmergencyMedicalProfile.findOneAndUpdate(
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updatedEmergencyProfile);
    } else {
      // Create a new emergency profile
      const newEmergencyProfile = await EmergencyMedicalProfile.create({
        ...req.body,
      });

      res.status(201).json(newEmergencyProfile);
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



export { createOrUpdateEmergencyProfile };
