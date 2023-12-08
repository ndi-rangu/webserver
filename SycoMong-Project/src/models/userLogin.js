const mongoose = require('mongoose');
//const Registered = require('./userRegister')

//creating the schemas of the model
const loginSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },    
    password: {
        type:mongoose.SchemaTypes.ObjectId,
        required: true,
    },
});

//creating the model(table)
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;