const fare = require('../models/userFareCollection');

//functionality of the controller

const fareController = {
    create: async (req,res) =>{
        try{
            const newFare = new fare(req.body);
            await newFare.save()
            .catch((error) => {
                console.log(error);
                if(newFare == ""){
                    res.status(400).json({ message: "Cannot have empty fields"})
                }
            })
            .then((savedFare) =>{
                console.log(savedFare);
                res.status(200).json({ message: "Fare has been saved", savedFare})
            })
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Something went wrong"});
        }
    }
};

module.exports = fareController;