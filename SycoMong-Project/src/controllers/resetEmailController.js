const Register = require('../models/userRegister');

const resetEmailController = {
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
}

module.exports = resetEmailController;