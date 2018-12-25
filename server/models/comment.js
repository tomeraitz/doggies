const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    date: Date
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
