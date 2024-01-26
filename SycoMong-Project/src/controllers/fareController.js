const Fare = require('../models/userFareCollection');
const Registered = require('../models/userRegister');


//functionality of the controller

const fareController = {
    create: async (req,res) =>{
        try{
            const newFare = req.body.fare;

            if(!newFare === ""){                
                return res.status(400).json({ message: "Fare amount cannot be empty"})
            }

            const newFareAmount = new Fare({ fare: newFare,});

            //saving the fare inserted in the body
            const savedFare = await newFareAmount.save();

            //await savedFare.populate('user', ['firstName', 'surname', 'idNumber']);      
            console.log(savedFare);
            return res.status(200).json({ message: "Fare has been saved", savedFare})
            
        }catch(error){
            console.log(error);
            return res.status(500).json({message: "Something went wrong"});
        }
    }
};

module.exports = fareController;