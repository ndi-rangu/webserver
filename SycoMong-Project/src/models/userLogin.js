const mongoose = require('mongoose');
//const Registered = require('./userRegister')

//creating the schemas of the model
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },    
    password: {
        type: String,
        required: true,
    },
});

//creating the model(table)
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;