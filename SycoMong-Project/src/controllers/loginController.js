const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registered = require('../models/userRegister');


const loginController = {

  //Login in if user has an account
  // function login is a post(create)
  login: async (req, res) => {
    try {
      const userEmail = req.body.email;
      const password = req.body.password;
      
      if (!userEmail) {
        console.log('Email is missing in the request body');
        return res.status(400).json({ message: 'Email is required.' });
      }

      //prevent empty credentials to log in
      if(!userEmail && !password ){
        res.status(400).json({ mesasge: "Provide credentials to log in!!"})
      }
      else {

      // Check if the user email exists in the database
      console.log('Email:', userEmail);
      const user = await Registered.findOne({email: userEmail});   
      if (!user) {
        console.log(userEmail + ' Email does not exist');
        return res.status(404).json({ message: 'Incorrect Email or password.' });
        
      }  

      // Check if the provided password matches the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, user.password);     
      
       if (!isValidPassword){
        console.log('Invalid password');
        return res.status(401).json({ message: 'Incorrect Email or password.' });
      }else {

        const payload = {
          user:{
              id: user._id,
              firstName: user.firstName,
              surname: user.surname,
              age: user.age,
              gender: user.gender,
              email: user.email,
              contact: user.contact,
              idNumber: user.idNumber,
              position: user.position,             
              password: user.password
              
          }
      }
        // Generate JWT token if user login is successful
        const token = jwt.sign(
          payload,
          "secretKey", 
          { expiresIn: 36000 } //change token expiration later
        );
                
        // Login successful
        console.log(`Email: ${userEmail} has successfully logged in to the server!`)     
        return res.status(200).json({status:true, message: 'Login successful', token });
      }
    } 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error during login' });
    }
  }
};

module.exports = loginController;
