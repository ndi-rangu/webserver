const bcrypt = require('bcrypt');
const Registered = require('../models/userRegister');

const resetPasswordController = {
    //Update users password

    getById: async (req,res) =>{
        try {
            const id = req.params.id;
        Registered.findById(id)
        .then ((registered) =>{
            console.log(registered);
            res.status(200).json({registered: registered})
        })
        .catch((error) =>{
            console.log(error);
            res.status(400).json({message: `We cannot find any registered accounts with search query ${id}`})
        })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Something is wrong with your search query. Please correct it and try again!"})
        }
    },

    update: async (req,res) => {
        try{
            const id = req.params.id;
            const newPassword = req.body.password;
            console.log('New Password:', newPassword);
            const newConfirmPassword = req.body.confirmPassword;
            const salt = await bcrypt.genSalt(10);
            console.log('Request Body:', req.body);            

            const hashedPassword = await bcrypt.hash(newPassword, salt); 

            const updatedRegistered = {
                password: hashedPassword,
                confirmPassword: hashedPassword
            }
            //const updatedRegistered = req.body;
            await Register.findOneAndUpdate({_id:id}, updatedRegistered, {new:true})
            .then((updatedRegistered) =>{
                console.log(updatedRegistered);
                res.status(200).json({message: "Password has been successfully changed",updatedRegistered:updatedRegistered});

            })
            .catch((error) =>{
                console.log(error);
                res.status(400).json({message: "Failed to change password"})
            }) 
        } catch(error){
            console.log(error);
            res.status(500).json({message: 'Something went wrong'});
        }
    }
}

module.exports = resetPasswordController;