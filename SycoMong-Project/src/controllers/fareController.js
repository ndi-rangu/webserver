const Fare = require('../models/userFareCollection');
const Registered = require('../models/userRegister');


//functionality of the controller

const fareController = {
    create: async (req,res) =>{
        try{

            const newFare = req.body.fare;

            if( newFare === ""){
                return res.status(400).json({ message: "Fare amount cannot be empty"})
            }

            const userDetails = await Registered.findById(req.user.id ,['firstName', 'surname', 'idNumber']);

            if (!userDetails) {
                return res.status(404).json({ message: "User not found" });
            }

            const newFareAmount = new Fare({
                fare: newFare,
                user: {
                    _id: userDetails._id,
                    firstName: userDetails.firstName,
                    surname: userDetails.surname,
                    idNumber: userDetails.idNumber
                }
                });

            //saving the fare inserted in the body
            const savedFare = await newFareAmount.save();

            //await savedFare.populate('Registered accounts', ['firstName', 'surname', 'idNumber']);
            console.log(savedFare, userDetails);
            return res.status(200).json({ message: "Fare has been saved", savedFare, userDetails})

        }catch(error){
            console.log(error);
            return res.status(500).json({message: "Something went wrong"});
        }
    }
};

module.exports = fareController;