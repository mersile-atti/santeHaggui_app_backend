const mongoose = require("mongoose");

const healthMetricsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    metricsDate: { type: Date, default: Date.now },
    weight: Number,
    height: Number,
    bloodPressure: String,
    heartRate: Number,
    bodyTemperature: Number,
    bloodSugar: Number,
    cholesterol: Number,
    medicalHistory: String,
    physicalActivity: String,
    nutrition: String,   
    indiceMasseCorporelle: Number,
    temperatureCorporelle: Number,
    systolicPressionArterielle: Number,
    distolicPressionArterielle: Number,
    ldlCholesterol: Number,
    hdlCholesterol: Number,
    triglycerides: Number,
    rapportTotalCholesAndHdl: Number, 
    waistCircumference: Number,
  });


  
module.exports = mongoose.model('HealthMetrics', healthMetricsSchema);
  