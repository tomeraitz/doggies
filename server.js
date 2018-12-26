const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})