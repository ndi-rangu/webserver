// login route
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post("/",loginController.login);

module.exports = router;

// // Validating if email/account is already registered
// async function loginValidator (email, password){
//     const user = await Login.findOne({email});

//     if (!user) {
//         console.log("No account found with that email");
//         res.status(500).json({message: "No existing account found!"})
//         return false;
//     } 
//     const isValidPassword = await bcrypt.compare(password, user.password);

//     return isValidPassword;
// }

// module.exports = loginValidator;