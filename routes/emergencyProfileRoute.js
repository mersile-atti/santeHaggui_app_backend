// routes/emergencyProfileRoute.js
import express from 'express';
import { createOrUpdateEmergencyProfile } from '../controllers/emergencyProfileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createOrUpdateEmergencyProfile);

export default router;
