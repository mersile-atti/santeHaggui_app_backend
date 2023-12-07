// controllers/emergencyProfileController.js
import asyncHandler from 'express-async-handler';
import EmergencyMedicalProfile from '../models/EmergencyProfile.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Create or update user's emergency profile
// route POST /api/users/profile/emergency-profile
// @access Private
// Function to create or update an emergency profile
const createOrUpdateEmergencyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // Update user profile
    // Check if the emergency profile already exists using exists()
    const emergencyProfileExists = await EmergencyMedicalProfile.exists({ user: req.user._id });

    if (emergencyProfileExists) {
      // Update the existing emergency profile
      const { _id, ...updateData } = req.body || {};
      const updatedEmergencyProfile = await EmergencyMedicalProfile.findOneAndUpdate(
        { user: req.user._id },
        { $set: updateData },
        { new: true }
      );

      generateToken(res, req.user._id);

      res.status(200).json({
         updatedEmergencyProfile,
      });
    } else {
      // Create a new emergency profile
      const newEmergencyProfile = await EmergencyMedicalProfile.create({
        user: req.user._id,
        ...req.body,
      });

      generateToken(res, req.user._id);

      res.status(201).json({
        emergencyProfile: newEmergencyProfile,
      });
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { createOrUpdateEmergencyProfile };
