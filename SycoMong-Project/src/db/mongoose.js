const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bakakidb')
.then(()=>{
    console.log('connection successful');
}).catch((error)=>{
    console.log('failed to connect with database',error);
});