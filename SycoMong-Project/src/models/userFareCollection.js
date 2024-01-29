const mongoose = require('mongoose');


const fareCollectionSchema = new mongoose.Schema ({
    user: {
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Accounts',
            required: true,
        },
        firstName:{
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        idNumber: {
            type: Number,
            required: true,
        },
    },
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