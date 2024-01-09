const mongoose = require('mongoose');

const fareCollectionSchema = new mongoose.Schema ({
    userName: {
        type: String,

    },
    fare: {
        type: Number,
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