import express from 'express';
const router = express.Router();
import {  authUser,
    RegisterUser,
    logOutUser,
    getUserProfile,
    updateUserProfile } from '../controllers/userController.js';
import emergencyProfileRouter from './emergencyProfileRoute.js';

import { protect } from '../middleware/authMiddleware.js';



router.post('/', RegisterUser)
router.post('/auth', authUser)
router.post('/logout', logOutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.use('/profile/emergency-profile', emergencyProfileRouter);



export default router