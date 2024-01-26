const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://student:5TZjENePDc7Q0H5o@cluster0.mjyhzbm.mongodb.net/");


// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
	User
};