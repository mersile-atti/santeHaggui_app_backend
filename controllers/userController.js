import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import EmergencyMedicalProfile from '../models/EmergencyProfile.js';
import jwt from 'jsonwebtoken';



// @desc Auth user/set token
// route POST /api/users/auth
//@ccess Public
const authUser = asyncHandler(async (req, res) => {
    const { email, phoneNumber, password } = req.body;

    const user = await User.findOne({ 
        $or: [{ email }, { phoneNumber }]
     });

     if(user && (await user.matchPassword(password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        res.status(200).json(accessToken);    
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            umi: user.umi,
        }); 
    } else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }
    
}); 

// @desc Register a new user user
// route POST /api/users
//@ccess Public
const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    
    const userExists = await User.findOne({ 
        $or: [{ email }, { phoneNumber }]
     });

    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        username,
        email,
        phoneNumber,
        password
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
        }); 
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}); 

// @desc Logout User
// route POST /api/users/logout
//@ccess Public
const logOutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    }); 
    
    res.status(200).json({message: 'Logged out'})
}); 

// @desc Get user profile
// route Get /api/users/profile
//@ccess Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
    }
    
    res.status(200).json(user)
}); 

// @desc Create user EmergencyProfile
// route POST /api/users/profile
//@ccess Private
    
const createUserEmergencyProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    try {
        const emergencyProfileExists = await EmergencyMedicalProfile.exists({
            user: req.user._id
        });

        if (!emergencyProfileExists) {
            const newEmergencyProfile = await EmergencyMedicalProfile.create({
                user: req.user._id,
                ...req.body,
            });

            res.status(201).json({
                _id: newEmergencyProfile._id,
                user: newEmergencyProfile.user,
                ...req.body,
            });
        } else {
            res.status(400).json({ error: 'Emergency Profile Already Exists!' });
        }
    } catch (err) {
        if (err.code === 'NotFound') {
            res.status(404).json({ error: 'User not found' });
        } else {
            throw err;
        }
    }
});



// @desc Update user EmergencyProfile
// route PUT /api/users/profile
//@ccess Private
const updateUserEmergencyProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    try {
        if (!user) {
            throw new Error('User not found');
        }

        const emergencyProfileExists = await EmergencyMedicalProfile.exists({
            user: req.user._id
        });

        if (!emergencyProfileExists) {
            throw new Error('Emergency Profile does not exist for this user');
        }

        const { _id, ...updateData } = req.body || {};
        const updatedEmergencyProfile = await EmergencyMedicalProfile.findOneAndUpdate(
            { user: req.user._id },
            { $set: updateData },
            { new: true }
        );
        res.status(200).json({
            updatedEmergencyProfile
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});
 

export { 
    authUser,
    RegisterUser,
    logOutUser,
    getUserProfile,
    createUserEmergencyProfile,
    updateUserEmergencyProfile
 };