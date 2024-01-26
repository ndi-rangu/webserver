const mongoose = require('mongoose');


const fareCollectionSchema = new mongoose.Schema ({
    fare: {
        type: Number,
        required: true,
    },
    dateSubmitted: {
        type: Date,
        immutable: true,
        default: () => Date.now ()
    },
    timeSubmitted:{
        type: Date,
        immutable: true,
        default: () => Date.now()
    }
});

const fare = mongoose.model('Fare Collection', fareCollectionSchema);
module.exports = fare;