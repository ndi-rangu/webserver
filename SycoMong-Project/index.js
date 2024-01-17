const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



//creating the models in the mongodb
// const Registered = require('./src/models/userRegister');
// const fare = require('./src/models/userFareCollection');
// const vehicle = require('./src/models/companyVehicles');
const { userRegister, userFareCollection, companyVehicles, userProfile } = require('./src/models/finalModel');

// Now you can use userRegister, userFareCollection, and companyVehicles in your code



const app = express();


//server name
 var corOptions ={
     origin: 'https://localhost:4000'
 }

//middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(body_parser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public_flutter')));


//db connection
require('./src/db/mongoose');

// creating routes
const registerRoute = require('./src/routes/userRegisterRouter');
const loginRoute = require('./src/routes/loginRouter');
const resetPasswordRoute = require('./src/routes/passwordResetRouer');
const fareRoute = require('./src/routes/fareRouter');
const vehicleRoute = require('./src/routes/vehicleRouter');
const profileRoute = require('./src/routes/profile');


//route use
//app.use('/Dashboard', express.static(path.join(__dirname, 'public-flutter')));

app.use("/Register", registerRoute);
app.use("/Login", loginRoute);
app.use("/ResetPassword",resetPasswordRoute);
app.use("/Conductor/Fare",fareRoute);
app.use("/Driver/Vehicle",vehicleRoute);
app.use("/Profile",profileRoute);


//PORT
const port = process.env.PORT || 4000

app.listen(port, "0.0.0.0",() =>{    
    console.log(`Server is running on port http://localhost:${port}`);
});



// app.get('/Dashboard', (req,res) =>{   
//     res.sendFile(path.join(__dirname,'public-flutter/index.html')); 
//     //res.status(200).json();
// });

app.get('/Driver', (req,res) =>{    
    res.status(200).json('Should navigate to driver page');
});

  app.get('/Conductor', (req,res) =>{
    //  Conductor.create(req.body).then((Conductor) => {
    //       res.status(200).send(Conductor);
    // }).catch((error) =>{
    //     res.status(400).send(error);
    //  })     
     res.status(200).json('Should show frontend of Conductor page');
 });

 app.get('/Conductor/Fare', fareRoute ,(req,res) =>{
    res.status(200).json({message:"good"})
 })

//  //saving conductor in the database
//  run()
//  async function run() {
//     const conductor = await Conductor.create({firstName: "Brian", middleName: "Njaramba", surname: "Ndirangu"})
//     // const conductor = new Conductor({ firstName: "Brian", middleName: "Njaramba", surname: "Ndirangu"})
//     // await conductor.save()
//     console.log(conductor)
//  };

//  //saving driver in the database
//  run()
//  async function run() {
//     const driver = new Driver({ firstName: "Joy", middleName: "Wairimu", surname: "Ndirangu", age: 18})
//     await driver.save()
//     console.log(driver)
//  }