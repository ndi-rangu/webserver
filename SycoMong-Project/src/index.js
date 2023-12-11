const express = require('express');
const cors = require('cors');

//creating the models in the mongodb
const Conductor = require('./models/conductor');
const Driver = require('./models/driver');
const Login = require('./models/userLogin');
const Registered = require('./models/userRegister');


const app = express();

//server name
var corOptions ={
    origin: 'https://localhost:4000'
}

//middlewares
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//db connection
require('./db/mongoose');

// creating routes
const registerRoute = require('./routes/userRegisterRouter');
const loginRoute = require('./routes/loginRouter');


//route use
app.use("/Register", registerRoute);
app.use("/Login", loginRoute);



//PORT
const PORT = process.env.PORT || 4000

app.listen(PORT, (req,res) =>{    
    console.log(`Server is running on port ${PORT}`);
});



app.get('/', (req,res) =>{    
    res.status(200).json('HOME PAGE MAYBE');
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