const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Registered = require('../models/userRegister');

const loginController = {

  //Login in if user has an account
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if the user email exists in the database
      console.log('Email:', email);
      const user = await Registered.findOne({ email: email.toLowerCase() });

      if (!user) {
        console.log('Email does not exist');
        return res.status(404).json({ message: 'Email does not exist! Please Register' });
      }

      // Check if the provided password matches the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        console.log('Invalid password');
        return res.status(401).json({ message: 'Incorrect password. Please try again.' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        "secretKey", // replace with your own secret keydirangu2010
        { expiresIn: '1hr' } //  token expiration time
      );

      // Login successful
      console.log(`Email: ${email} has successfully logged in to the server!`)     
      res.status(200).json({ status: true, message: 'Login successful', token });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error during login' });
    }
  }
};

module.exports = loginController;
