const vehicle = require('../models/companyVehicles');
const Registered = require('../models/userRegister');


const vehicleController = {
    create: async (req,res) =>{
        try{
            const { id } = req.params;

            const assignedUser = await Registered.findOne({ _id: id});

            if (!assignedUser || assignedUser.position !== 'driver') {
                return res.status(400).json({ message: "Vehicles can only be assigned to drivers" });
              }


            // capturing and saving the data
            const { numberPlate, model, capacity, status } = req.body;
            const newVehicle = new vehicle({
                numberPlate,
                model,
                capacity,
                status,
                assignedTo: assignedUser._id
            });

            const savedVehicle = await newVehicle.save();            
            console.log(savedVehicle);
            res.status(200).json({ message: "Vehicle data saved", savedVehicle: savedVehicle, assignedTo: assignedUser});
            
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Unable to save vehicle data"});
        }
        
    }
};

module.exports = vehicleController;