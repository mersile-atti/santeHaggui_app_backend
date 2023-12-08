import express from 'express';
const router = express.Router();
import {  authUser,
    RegisterUser,
    logOutUser,
    getUserProfile,
    createUserEmeergencyProfile,
    updateUserEmergencyProfile } from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';




router.post('/', RegisterUser)
router.post('/auth', authUser)
router.post('/logout', logOutUser)
router.route('/profile').get(protect, getUserProfile).post(protect, createUserEmeergencyProfile).put(protect, updateUserEmergencyProfile)



export default router