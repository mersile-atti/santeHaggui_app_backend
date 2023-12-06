const mongoose = require('mongoose')

const lifestyleSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    smoking: Boolean,
    alcoholConsumption: Boolean,
    exerciseFrequency: String,
    // Add more lifestyle-related fields as needed
  });
  
  
  module.exports = mongoose.model('Lifestyle', lifestyleSchema);
