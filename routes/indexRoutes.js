const express = require('express');
const indexRoutes = express.Router();

indexRoutes.get("/", (req, res) => {
    res.render('home');
});

indexRoutes.get("/whoops", (req, res) => {
    res.render('whoops');
});

module.exports = indexRoutes;