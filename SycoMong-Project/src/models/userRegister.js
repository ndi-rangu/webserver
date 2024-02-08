const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        validate:{
            validator:function(value){
                const lowercaseValue = value.toLowerCase();
                return ['male','female'].includes(lowercaseValue);
            },
            message: props => `${props.value} is not a valid enum value for path ${props.path}.`,
        },  
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
        validate:{
            validator:function(value){
                const lowercaseValue = value.toLowerCase();
                return ['driver','conductor'].includes(lowercaseValue);
            },
            message: props => `${props.value} is not a valid enum value for path ${props.path}.`,
        },             
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

//encryption and validation of passwords and confirmpassword
registerSchema.pre('save', async function (next) {
     if(!this.isModified('password')) {
         return next();
     }
    try {

         //Ensure password and confirmed password are the same
         if (this.confirmPassword !==  this.password) {
            console.log("Password and confirmPassword do not match");
            throw new Error("Password and confirmPassword do not match");
        } else {
            console.log("Password and confirmPassword match")
        }
        
        //encryption 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);        
        this.password = hashedPassword;
        this.confirmPassword = this.password;  
        
    

        next();
    } catch (error) {
        return next(error);
    }
});
//creating the model(Table)
const Registered = mongoose.model('Accounts', registerSchema);

module.exports = Registered;