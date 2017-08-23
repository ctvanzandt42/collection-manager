//importing middleware
const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Saxophones = require('./models/Saxophones');
mongoose.Promise = bluebird;
const app = express();
const port = process.env.PORT || 8000;

//connecting mongo to the server
//REQUIRED IMPORTANT *******************************
mongoose.connect("mongodb://localhost:27017/saxophones");

//setting up server to listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

//installing some middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));


