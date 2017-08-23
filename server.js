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

app.get("/saxophones", (req, res) => {
    Saxophones.find()
        .then((foundSaxes) => {
            if (!foundSaxes) {
                return res.send({ msg: "no saxes found" });
            }
            res.send(foundSaxes);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.post("/saxophones", (req, res) => {
    let newSax = new Saxophones(req.body);
    newSax.save()
        .then(function (savedSaxophone) {
            res.send(savedSaxophone);
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
});

app.get("/saxophones/:id", (req, res) => {
    Saxophones.findById(req.params.id)
        .then((foundSax) => {
            if (!foundSax) {
                return res.send({ msg: "no saxes found" });
            }
            res.send(foundSax);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.put("/saxophones/:id", (req, res) => {
    Saxophones.findByIdAndUpdate(req.params.id, req.body)
        .then((updatedSax) => {
            if (!updatedSax) {
                return res.send({ msg: "could not update sax" });
            }
            res.send(updatedSax);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.delete("/saxophones/:id", (req, res) => {
    Saxophones.findByIdAndRemove(req.params.id)
        .then(function (message) {
            console.log("Message: " + message);
            res.send(message);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});