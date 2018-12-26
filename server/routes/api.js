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
router.put('/login', async function (req, res) {
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
      res.send()
    }

  } else
  {
    res.send(null)
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
    lat: req.body.lat,
    lon: req.body.lon,
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
  const user = await User.findById(req.params.userId).populate('gardens').exec()
  const garden = await Garden.findById(req.params.gardenId).populate('posts').exec()
  await user.gardens.push(garden)
  await user.save()
  res.send(garden)
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
  console.log(`new post: ${post.text}`)
  await post.save()
  await User.findByIdAndUpdate(req.params.userId,
    { $push: { posts: post } })
  await Garden.findByIdAndUpdate(req.params.gardenId,
    { $push: { posts: post } })
  res.send(post)
})

//remove post
// router.delete('/post/:postId', async function (req, res) {
//   // const post =
//   Post.findById(req.params.postId)
//     .exec(async function (err, post) {
//       User.findById(post.user)
//         .populate('posts').exec(async function (err, user) {
//           user.posts = user.posts.filter(p => p._id != req.params.postId)
//           await user.save()
//           console.log(user.posts)
//         })
//       await Garden.findById(post.garden)
//         .populate('posts').exec(async function (err, garden) {
//           garden.posts = garden.posts.filter(p => p._id != req.params.postId)
//           await garden.save()
//         })

//       post.delete()
//     })
//   res.send("removed")
// })

//create and join event
router.post('/event/', async function (req, res) {
  const event = new Event({
    garden: req.body.gardenId,
    date: req.body.time,
    users: [req.body.userId]
  })
  await event.save()
  Garden.findById(req.body.gardenId)
    .populate('calendar')
    .exec(function (err, garden) {
      garden.calendar.push(event)
      garden.save().then(res.send(garden))
    })
})
//join event
router.put('/event/', async function (req, res) {
  Event.findById(req.body.eventId)
    .populate('users')
    .exec(function (err, event) {
      event.users.push(req.body.userId)
      event.save().then(res.send(event))
    })
})
// add comment
router.post('/comment/:userId/:postId', async function (req, res) {
  const comment = new Comment({
    user: req.params.userId,
    post: req.params.postId,
    text: req.body.text,
    date: req.body.date
  })
  console.log(`new comment: ${comment.text}`)
  await comment.save()
  await Post.findByIdAndUpdate(req.params.postId,
    { $push: { comments: comment } })
  res.send(comment)
})


//remove comment
// router.delete('/comment/:userId/:commentId', async function (req, res) {
//   const comment = await Comment.findById(req.params.commentId)

// })

/////////////////////////////////////////////////
router.get('/allposts', function (req, res) {
  Post.find({}).exec(function (err, posts) {
    res.send(posts)
  })
})
router.get('/allusers', function (req, res) {
  User.find({}).exec(function (err, users) {
    res.send(users)
  })
})
router.get('/allgardens', function (req, res) {
  Garden.find({}).exec(function (err, gardens) {
    res.send(gardens)
  })
})
///////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////

module.exports = router
