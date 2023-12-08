// Register route
const express = require('express');
const router = express.Router();
const Registered = require('../models/userRegister');

//create
router.post("/", async (req,res) =>{
    try{
        const newRegister = new Registered(req.body);
        const savedRegister = await newRegister.save()
        .then((savedRegister)=>{
            console.log(savedRegister);
            res.status(200).json ({message: "Register saved successfully"});
        }) 
        .catch((error) =>{
            console.log(error);
            res.status(500).json({message: "Failed to save the new register"})
        })
    } catch (error) {
        console.log(error);
        res.status(500).json ({message: "Unable to save new register"});
    }
})

module.exports = router;