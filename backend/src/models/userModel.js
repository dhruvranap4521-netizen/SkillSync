const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true, minlength: 5},
    password: { type: String, required: true, minlength: 8 },
    skillsHave: {type : [String], required: false},
    skillsWant: {type : [String], required: false},
    bio : { type: String, required: false, maxlength: 500 },
    region : { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;  