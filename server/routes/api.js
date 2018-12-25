const express = require('express')
const router = express.Router()
const request = require('request')
const User = require('../models/user')
const Garden = require('../models/garden')
const Post = require('../models/post')
const Comment = require('../models/comment')
const Event = require('../models/event')

// const moment = require('moment')
//remove user 
router.delete("/user/:userId", function (req, res) {
  User.findByIdAndDelete(req.params.userId).exec(function (err, user) {
    console.log(user)
    res.send("removed")
  })
})
//sign in
router.post('/user', async function (req, res) {
  const user = await User.findOne({ email: req.body.email })
  console.log(user)
  if (user === null)
  {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      birthday: req.body.birthday,
    })
    await newUser.save()
    res.send(newUser)
  } else
  {
    res.send("this email belongs to user")
  }
})
//log in
router.get('/login', async function (req, res) {
  console.log("someone is loging in")
  console.log(req.body)
  if (req.body.email && req.body.password)
  {
    const user = await User.findOne({ email: req.body.email }).populate('gardens')
    if (user.password === req.body.password)
    {
      res.send(user._id)
    } else
    {
      res.send("password is wrong")
    }

  } else
  {
    res.send("login data is wrong...")
  }
})
//get all user info
router.get('/user/:userId', function (req, res) {
  User.findById(req.params.userId)
    .populate('gardens posts')
    .exec(function (err, user) {
      res.send(user)
    })
})
//create comunity + join
router.post('/garden/:userId', async function (req, res) {
  const newGarden = new Garden({
    name: req.body.name,
    location: req.body.location,
    gardenPic: req.body.pic
  })
  await newGarden.save()
  const user = await User.findById(req.params.userId)
  await user.gardens.push(newGarden)
  await user.save()
  res.send(newGarden)
})
//join comunity
router.put('/user/garden/:userId/:gardenId', async function (req, res) {
  const user = await User.findById(req.params.userId).populate('gardens')
  const garden = await Garden.findById(req.params.gardenId)
  await user.gardens.push(garden)
  await user.save()
  res.send(user)
})
//leave comunity
router.delete('/user/garden/:userId/:gardenId', function (req, res) {
  console.log("someone tries to leave a garden")
  User.findById(req.params.userId)
    .populate('gardens')
    .exec(async function (err, user) {
      user.gardens = user.gardens.filter(g => g._id != req.params.gardenId)
      await user.save()
      res.send(user)
    })
})
// get comunity
router.get('/garden/:gardenId', function (req, res) {
  Garden.findById(req.params.gardenId)
    .populate('posts calendar')
    .exec(function (err, garden) {
      res.send(garden)
    })
})
// post new post
router.post('/post/:userId/:gardenId', async function (req, res) {
  const post = new Post({
    user: req.params.userId,
    garden: req.params.gardenId,
    text: req.body.text,
    date: req.body.date
  })
  await post.save()
  await User.findByIdAndUpdate(req.params.userId,
    { $push: { posts: post } })
  await Garden.findByIdAndUpdate(req.params.gardenId,
    { $push: { posts: post } })
  res.send(post)
})
//remove post
router.delete('/post/:postId', function (req, res) {
  User.find({ gardens: { $in } })
  Post.findByIdAndDelete(req.params.postId)
    .exec(function (err, post) {
      res.send("removed")
    })
})
// add comment
//remove comment
//add event
//join


/////////////////////////////////////////////////////////////////////

module.exports = router
