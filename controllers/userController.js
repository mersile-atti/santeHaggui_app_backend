import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'

// @desc Auth user/set token
// route POST /api/users/auth
//@ccess Public
const authUser = asyncHandler(async (req, res) => {
    const { email, phoneNumber, password, uim } = req.body;

    const user = await User.findOne({ 
        $or: [{ email }, { phoneNumber }]
     });

     if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
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
    
    res.status(200).json({message: 'Auth User'})
}); 

// @desc Register a new user user
// route POST /api/users
//@ccess Public
const RegisterUser = asyncHandler(async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    //const user = await User.findOne({ email });
    
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
        generateToken(res, user._id);
        res.status(201).json({
            _id: user.id,
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
        phoneNumber: req.user.phoneNumber
    }
    
    res.status(200).json(user)
}); 

// @desc Update user profile
// route PUT /api/users/profile
//@ccess Private
const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);

    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        //generateToken(res, updatedUser._id);

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
        }); 
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}); 


export { 
    authUser,
    RegisterUser,
    logOutUser,
    getUserProfile,
    updateUserProfile
 };