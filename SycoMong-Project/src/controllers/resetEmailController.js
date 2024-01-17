const Register = require('../models/userRegister');

const resetEmailController = {
    //Update users password

    getById: async (req,res) =>{
        try {
            const { email } = req.body;
        Register.findOne({ email })
        .then ((registered) =>{
            console.log('Email request for changing password: ',registered);
            res.status(200).json({registered: registered})
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json({message: `We cannot find any registered accounts with search query ${email}`})
        })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Something is wrong with your search query. Please correct it and try again!"})
        }
    },
}

module.exports = resetEmailController;