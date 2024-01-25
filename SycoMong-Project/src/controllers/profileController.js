const Registered = require('../models/userRegister');


const profileController = {
    // display user profile and details.

    getById: async (req,res) =>{
        try{
            // checking if user has token secret key
            // req.query.token manually makes us input token key for now but it will be changed later during development
            //const token = req.headers.authorization || req.query.token; 
            
            const userProfile = await Registered.findById(req.user.id).select('-password -confirmPassword');
            console.log('User Profile:', userProfile);            

            if(!userProfile){
                console.log('No such user found');
                return res.status(404).json({ message: "No user found"});
            } else{
                return res.status(200).json({ message: "Authorization successful", userProfile})
            }

        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Something went wrong with displaying user profile", error: error.message})
        }
    }
};

module.exports = profileController;