const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gardenSchema = new Schema({
  name: String,
  location: String,
  visitHistory: [Date],
  gardenPic: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
})

const Garden = mongoose.model('Garden', gardenSchema)
module.exports = Garden
