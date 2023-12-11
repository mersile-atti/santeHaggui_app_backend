import express from 'express';
const router = express.Router();
import {  authUser,
    RegisterUser,
    logOutUser,
    getUserProfile,
    createUserEmergencyProfile,
    updateUserEmergencyProfile } from '../controllers/userController.js';

import { validateToken } from '../middleware/validateTokenHandler.js';




router.post('/', RegisterUser)
router.post('/auth', authUser)
router.post('/logout', logOutUser)
router.route('/profile').get(validateToken, getUserProfile).post(validateToken, createUserEmergencyProfile).put(validateToken, updateUserEmergencyProfile)



export default router