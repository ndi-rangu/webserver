const mongoose = require('mongoose');


const conductorSchema = new mongoose.Schema({   
    firstName: String,
    middleName: String,
    surname: String,
    age: String,
    gender: String,
    email: mongoose.SchemaTypes.ObjectId,
    contact: Number,
    idNumber: Number,
    position: String,
    driver: mongoose.SchemaTypes.ObjectId,
    createdAt: Date,
    updatedAt: Date,
});

const Conductor = mongoose.model('Conductor', conductorSchema);

module.exports = Conductor;