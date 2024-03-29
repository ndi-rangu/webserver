const Registered = require('../models/userRegister');
const jwt = require('jsonwebtoken');

//Here you will find all the CRUD functionality of the registered accounts model

const registerController = {

    // first is create
    create: async (req,res) =>{
        try{
            const {
                firstName,
                middleName,
                surname,
                age,
                gender,
                email,
                contact,
                idNumber,
                position,
                password,
                confirmPassword
            } = req.body;
    
            const newRegister = new Registered({firstName,middleName,surname,age,gender,email,contact,idNumber,position,password,confirmPassword}); 
            try{
                if(Object.values(newRegister).some(field => field === "")){
                 return res.status(400).json({ message: "Empty input fields"})
             }
             else if (!/^[a-zA-Z ]*$/.test(newRegister.firstName, newRegister.middleName,newRegister.surname)){
                 return res.status(400).json({ message: "Invalid first name entered"})
             }
             else if (!/^[a-zA-Z ]*$/.test(newRegister.middleName)){
                return res.status(400).json({ message: "Invalid middle name entered"})
            }
            else if (!/^[a-zA-Z ]*$/.test(newRegister.surname)){
                return res.status(400).json({ message: "Invalid surname entered"})
            }
            else if(newRegister.age >1 && newRegister.age<18){
                return res.status(400).json({message:"Please be of legal age to register"})
            }else if(newRegister.age >60){
                return res.status(400).json({message:"You are not allowed to register as you have reached the past the age of work"})
            }else if(!['male', 'female'].includes(newRegister.gender.toLowerCase())){
                return res.status(400).json({message: "Invalid gender entered"})
             }
             else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newRegister.email)){
                return res.status(400).json({ message: "Invalid email entered"})
             } else if(!['driver', 'conductor'].includes(newRegister.position.toLowerCase())){
                return res.status(400).json({message: "Invalid position entered"})
            } 
            } catch(error){
                console.log(error);
                res.status(500).json({message: "There is a problem with your registration data. Please check and try again"})
            }
            await newRegister.save()            
            .then((savedRegister)=>{            
            //Register user successful
            console.log(savedRegister); //payload
            res.status(200).json ({status:true , message: "Register saved successfully", user: savedRegister}); //token
                
        })                
            .catch((error) =>{
                console.log(error);
                
                //prevent users from creating duplicate accounts using the same email.
                if (error.code === 11000 && error.keyPattern && error.keyPattern.email){
                     return res.status(400).json({message: "Email already exists! Register with an unregistered email"})
                }
                else if (error.message.includes('Password and confirmPassword do not match'))  {
                     return res.status(400).json({ message: "Password and confirmPassword do not match"});
                }
                else {
                    return res.status(400).json({message: "Failed to save the new register"})
                }
            })

            //pass in token key
            
        } catch (error) {
            console.log(error);
            res.status(500).json ({message: "Unable to save new register"});
        }
    },

    //Second is to get data of all registered accounts
    getAll: async (req,res) =>{
        try{
            Registered.find()
            .then((registered) =>{
                console.log(registered);
                res.status(200).json({registered: registered});
            }).catch((error) =>{
                console.log(error);
            res.status(400).json({message: "Unable to find any Registered accounts"})
            });
        } catch (error) {
            console.log(error);
            res.status(500).json ({message: "Unable to find register"});
        }
    },

    //third function is to get data by id only
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

    //find registered accounts using general search data
    getById: async (req,res) =>{
        try{
            const searchTerm = req.query.searchTerm;
            console.log(searchTerm);

            //convert search terms to be case insensitive
            const searchRegex = new RegExp(searchTerm, "i");

            await Registered.find({
                $or: [
                    { firstName: searchRegex},
                    { middleName: searchRegex},
                    { surname: searchRegex},
                    { gender: searchRegex},
                    { email: searchRegex},
                    { position: searchRegex},
                    
                ]
            })
            .then((registered) =>{
                if (registered.length){
                console.log(registered);
                res.status(200).json({registered: registered});
                } else{
                console.log("No registered account found in our database");
                res.status(200).json({registered: [], message: "No registered account found in our database"});
                }
            }).catch ((error) =>{
                console.log(error);
                res.status(400).json({ message: "Unable to find registerd accounts that matches your search"})
            })

        } catch (error){
            console.log(error);
            res.status(500).json({ message: "No matching records found"});
        }
    },

    //updating data in the register thats saved by a specified user.
    update: async (req,res) =>{
        try{
            const id = req.params.id;
            const updatedRegistered = req.body;
            await Registered.findOneAndUpdate({_id:id}, updatedRegistered, {new:true})
            .then((updatedRegistered) =>{
                console.log(updatedRegistered);
                res.status(200).json({message: "Registered account has been updates successfully",updatedRegistered:updatedRegistered});

            })
            .catch((error) =>{
                console.log(error);
                res.status(400).json({message: "Failed to update registered account"})
            }) 


        } catch(error){
            console.log(error);
            res.status(500).json({ message: "Something went wrong with updating the registered account!"})
        }
    },

    //deleting data already registered/exists
    delete: async (req,res) =>{
        try{
            const id = req.params.id;            
            await Registered.deleteOne({_id:id})
            .then((deleteRegistered)=>{
                console.log(deleteRegistered);
                res.status(200).json({message: "Registered account has been successfully deleted", registered: deleteRegistered});
            })
            .catch((error) =>{
                console.log(error);
                res.status(400).json({message: "Failed to delete the registered account"})
            })
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Cannot delete the Registered account.Something went wrong"})
        }
    }    
};

module.exports = registerController;