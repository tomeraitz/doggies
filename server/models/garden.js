const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gardenSchema = new Schema({
  name: String,
  lat: Number,
  lon: Number,
  gardenPic: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  calendar: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
})

const Garden = mongoose.model('Garden', gardenSchema)
module.exports = Garden
