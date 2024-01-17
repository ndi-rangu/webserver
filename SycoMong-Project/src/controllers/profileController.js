const Profile = require('../models/profile');
//const Registered = require('../models/userRegister');
const jwt = require('jsonwebtoken');

const profileController = {
    // display user profile and details.

    getById: async (req,res) =>{
        try{
            // checking if user has token secret key
            const token = req.headers.authorization || req.query.token;

            if(!token){
                console.log("UNAUTHORIZED");
                return res.status(401).json({message: "Unauthorized access"});
            }

            //verify the token
            const decodedToken = jwt.verify(token, 'secretKey'); // replace with your own secret key
            const userId = decodedToken.userId; 
            console.log('Decoded user ID:', userId);           

            const userProfile = await Profile.findOne({ _id: userId });
            console.log('User Profile:', userProfile);

            if(!userProfile){
                console.log('No such user found');
                return res.status(404).json({ message: "No user found"});
            }

            //chech user position based on whether they are a driver or a conductor

            const userPosition = userProfile.position;

            if(userPosition === 'driver'){
                console.log('Driver profile', userPosition);
                res.status(200).json({ status: "SUCCESS", message: "Displaying driver profile", user: userPosition});
            } else if (userPosition === 'conductor'){
                console.log('Conductor profile', userPosition);
                res.status(200).json({ status: "SUCCESS", message: "Displaying conductor profile", user: userPosition});
            } else{
                console.log(error);
                res.status(404).json({ message: "Incorrect role"});
            }
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Something went wrong with displaying user profile", error: error.message})
        }
    }
};

module.exports = profileController;