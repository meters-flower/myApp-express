var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    createTime: { type: Date, default: Date.now }
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel