const mongoose = require('mongoose');


const vehicleSchema = new mongoose.Schema({
    numberPlate:{
        type: String,
        required: true

    },
    model:{
        type: String,
        required: true
    },
    capacity:{
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    assignedTo: {
        _id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Accounts',
        required: true
        },
        firstName:{
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        idNumber:{
            type: Number,
            required: true
        },
    }
});


const vehicle = mongoose.model("Company vehicle", vehicleSchema);

module.exports = vehicle;