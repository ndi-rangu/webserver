const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



//creating the models in the mongodb
const Conductor = require('./src/models/conductor');
const Driver = require('./src/models/driver');
const Registered = require('./src/models/userRegister');


const app = express();


//server name
 var corOptions ={
     origin: 'https://localhost:4000'
 }

//middlewares
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(body_parser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public_flutter')));


//db connection
require('./src/db/mongoose');

// creating routes
const registerRoute = require('./src/routes/userRegisterRouter');
const loginRoute = require('./src/routes/loginRouter');


//route use
app.use("/Register", registerRoute);
app.use("/Login", loginRoute);



//PORT
const port = process.env.PORT || 4000

app.listen(port, "0.0.0.0",() =>{    
    console.log(`Server is running on port http://localhost:${port}`);
});



app.get('/', (req,res) =>{   
    res.sendFile(path.join(__dirname,'public-flutter/index.html')); 
    //res.status(200).json();
});

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