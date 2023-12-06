const express = require('express')
const bodyParser = require('body-parser');

// 👇️ if you use CommonJS require()
// const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

// ✅ Register the bodyParser middleware here
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const User = require('../models/User');
const CryptoJS = require('crypto-js');


module.exports = {

    //Register a new user
   // createUser function
   createUser: async (req, res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_MESSAGE).toString(),
    });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },  

   //login function
   // login function
   loginUser: async (req, res) => {
    try {
      // Find the user by email
      const user = await User.findOne({ email: req.body.email });
      // If user doesn't exist, return error
      if (!user) {
        return res.status(401).json(`${req.body.email}: Invalid invalid`);
      }
    
      console.log(req.body.phoneNumber)
    return res.status(200).json();
      
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }

  
}

//$or: [{ email: req.body.email }, 

/*
// Decrypt and compare passwords
      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_MESSAGE);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      console.log("Original Password:", originalPassword);
      console.log("Entered Password:", req.body.password);
      
      // If passwords don't match, return error
      if (originalPassword !== req.body.password) {
        return res.status(401).json("Wrong password");
      }
      // If everything is correct, send user data without password
      const { password, ...others } = user._doc;
      return res.status(200).json(others);
*/