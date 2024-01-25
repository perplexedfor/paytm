const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://student:5TZjENePDc7Q0H5o@cluster0.mjyhzbm.mongodb.net/");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type:string,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};