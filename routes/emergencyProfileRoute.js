// routes/emergencyProfileRoute.js
import express from 'express';
import { createOrUpdateEmergencyProfile } from '../controllers/emergencyProfileController.js';

const router = express.Router();

router.route('/').post(createOrUpdateEmergencyProfile);

export default router;
