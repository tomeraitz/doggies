const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profilePic: String,
    gender: String,
    birthday: Date,
    dogs: [Object],
    gardens: [{ type: Schema.Types.ObjectId, ref: 'Garden' }]
})

const User = mongoose.model('User', userSchema)
module.exports = User
