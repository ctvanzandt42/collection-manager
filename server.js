//importing middleware
const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mustacheExpress = require('mustache-express');
const Saxophones = require('./models/Saxophones');
const indexRoutes = require('./routes/indexRoutes');
mongoose.Promise = bluebird;

const app = express();
const port = process.env.PORT || 8000;

//connecting mongo to the server
mongoose.connect("mongodb://localhost:27017/saxophones");

//setting up server to listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

//installing some middleware
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

//setting up endpoints
app.use('/', indexRoutes);

app.get("/saxophones", (req, res) => {
    Saxophones.find()
        .then((foundSaxes) => {
            if (!foundSaxes) {
                return res.send({ msg: "no saxes found" });
            }
            //res.send(foundSaxes);
            res.render('directory', { saxophones: foundSaxes })
        })
        .catch((err) => {
            res.status(500).send(err);
        })
});

app.get("/saxophones/addone", (req, res) => {
    res.render('addOne');
});

app.post("/saxophones/addone", (req, res) => {
    let newSax = new Saxophones(req.body);
    newSax.save()
        .then(function (savedSaxophone) {
            res.redirect('/saxophones');
            //res.send(savedSaxophone);
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
            //res.send(foundSax);
            res.render("foundSax");
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
            // res.send(updatedSax);
            res.redirect('/saxophones');
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