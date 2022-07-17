var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {

    },
    email: {

    },
    password: {

    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    rol: {
        type: String,
        default: 'user'
    }
})

const User = mongoose.model("User", UserSchema, "users");
module.exports = User;