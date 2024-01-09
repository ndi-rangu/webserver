const mongoose = require('mongoose');
const Registered = require('../models/userRegister');

const vehicleSchema = new mongoose.Schema({
    numberPlate:{
        type: String,

    },
    model:{
        type: String
    },
    capacity:{
        type: Number,
    },
    status: {
        type: String,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId, 
        refPath: 'positionRef',
        
    },
    positionRef:{
        type: String,
        default: 'Registered account'
    }
});

vehicleSchema.pre('save', async function(next) {
    if (!this.assignedTo) {
        // Logic to find the default driver or conductor ID based on position
        const defaultDriverId = await Registered.findOne({ position: 'driver' });
        this.assignedTo = defaultDriverId; // Set the default driver ID
    }
    next();
});

const vehicle = mongoose.model("Company vehicle", vehicleSchema);

module.exports = vehicle;