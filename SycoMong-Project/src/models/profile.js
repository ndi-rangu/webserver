const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Registered accounts',
        required: true
    }

});

const Profile = mongoose.model('User Profile', profileSchema);

module.exports = Profile;