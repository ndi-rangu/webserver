const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    surname: String,
    age: Number,    
    gender: String,
    email: String,
    idNumber: Number,
    position: String,
    contact: Number,
    drivingLicenseNumber: {
        type: Number,
        require: true,
    },
    conductor: mongoose.SchemaTypes.ObjectId,
    createdAt: Date,
    updatedAt: Date,
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;