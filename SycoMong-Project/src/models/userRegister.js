const mongoose = require('mongoose');

// creating the fields inside the model(Schema)
// Validators check if users entered their names without using any number
const registerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: 3,
        maxLength: 20,        
        validate: {
            validator: (value) => {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message: "First name must contain only alphabetic characters"
        }
    },
    middleName: {
        type: String,
        required: [true, "Middle name is required"],
        minLength: 3,
        maxLength: 20,        
        validate: {
            validator: (value) => {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message: "Middle name must contain only alphabetic characters"
        }
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        minLength: 3,
        maxLength: 20,        
        validate: {
            validator: (value) => {
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message: "Last name must contain only alphabetic characters"
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 60,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: Number,
        required: true,
        minLength: 10,
        maxLength: 10,
    },
    idNumber: {
        type: Number,
        required: true,
        minLength: 8,
        maxLength: 8,
    },
    position:{   
        type: String,     
        required: true,    
        enum:['Driver', 'Conductor'],   
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20,
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
}, {discriminatorKey:'position'});

//validation of passwords and confirmpassword
registerSchema.pre('validate',(next) =>{
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match');
    }
    next();
})

//creating the model(Table)
const Registered = mongoose.model('Registered accounts', registerSchema);

module.exports = Registered;