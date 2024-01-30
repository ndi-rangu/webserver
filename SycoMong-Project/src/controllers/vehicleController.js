const vehicle = require('../models/companyVehicles');
const Registered = require('../models/userRegister');


const vehicleController = {
    create: async (req,res) =>{
        try{
        
            // capturing the data sent to the body
            const { numberPlate, model, capacity, status } = req.body;
            
            if (numberPlate === "" || model === "" || capacity === "" || status === "") {
                return res.status(400).json({ message: "Cannot have empty fields" });
            }
            
            const assignedUser = await Registered.findById(req.user.id, ['firstName', 'surname', 'idNumber']);
            if (!assignedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const newVehicle = new vehicle({
                numberPlate,
                model,
                capacity,
                status,
                assignedTo: {
                     _id: assignedUser._id,
                    firstName: assignedUser.firstName,
                    surname: assignedUser.surname,
                     idNumber: assignedUser.idNumber
                 }
            }); 

            const savedVehicle = await newVehicle.save();            
            console.log(savedVehicle);
            return res.status(200).json({ message: "Vehicle data saved", savedVehicle, assignedUser});
            
        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Unable to save vehicle data"});
        }
        
    }
};

module.exports = vehicleController;