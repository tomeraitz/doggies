// Server setup
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const api = require('./server/routes/api')
const fileUpload = require('express-fileupload');



// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://localhost/doggiesDB',
  { useNewUrlParser: true }
).then(() => console.log("DB Connected"))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(fileUpload())

app.use('/', api)




const port = 4200
app.listen(port, function () {
  console.log(`Running on port ${port} - ${Date()}`)
})
