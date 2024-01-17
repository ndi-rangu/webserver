const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registered = require('../models/userRegister');
const profileController = require('./profileController');

const loginController = {

  //Login in if user has an account
  // function login is a post(create)
  login: async (req, res) => {
    try {
      const userEmail = req.body.email.toLowerCase();
      const password = req.body.password;
      
      

      //prevent empty credentials to log in
      if( userEmail === "" && password === ""){
        res.status(400).json({ mesasge: "Provide credentials to log in!!"})
      }
      else {

      // Check if the user email exists in the database
      console.log('Email:', userEmail);
      const user = await Registered.findOne({email: userEmail});   
      if (!user) {
        console.log(userEmail + 'Email does not exist');
        return res.status(404).json({ message: 'Email does not exist! Please Register' });
        
      }  

      // Check if the provided password matches the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, user.password);     
      
       if (!isValidPassword){
        console.log('Invalid password');
        return res.status(401).json({ message: 'Incorrect password. Please try again.' });
      }else {
        // Generate JWT token if user login is successful
        const token = jwt.sign(
          { userEmail: user.email, userId: user._id },
          "secretKey", // replace with your own secret keydirangu2010
          { expiresIn: '1hr' } //  token expiration time
        );
                
        // Login successful
        console.log(`Email: ${userEmail} has successfully logged in to the server!`)     
        return res.status(200).json({ status: true, message: 'Login successful', token });
      }
    } 
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error during login' });
    }
  }
};

module.exports = loginController;
