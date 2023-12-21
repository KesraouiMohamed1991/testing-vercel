const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    mail: String,
    token: String,
    phoneNumber: String

});

const User = mongoose.model('users', userSchema);

module.exports = User;




