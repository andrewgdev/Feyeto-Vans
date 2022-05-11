// SERVER
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();


app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3000, (req, res) => {
    console.log("Listening on port 3000!");
});


// DART-SASS PACKAGE
const sass = require('sass');

// const result = sass.compile();


// MongoDB DATABASE
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB");


