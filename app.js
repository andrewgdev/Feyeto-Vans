// SERVER

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;

app.use(express.static("public"));

var connectLiveReload = require("connect-livereload");
var livereload = require('livereload');
var livereloadServer = livereload.createServer({extraExts: ['ejs']});
livereloadServer.watch([__dirname + "/public",__dirname + "/views"]);

livereloadServer.server.once("connection", () => {
    setTimeout(() => {
        livereloadServer.refresh("/");
    }, 100);
  });

app.use(connectLiveReload())


app.get('/', (req, res) => {
    res.render("index");
});

app.get('/register', (req, res) => {
    res.render("register");
});

app.get('/signin', (req, res) => {
    res.render("signin");
});

app.get('/sell', (req, res) => {
    res.render("sell");
});

app.get('/buy', (req, res) => {
    res.render("buy");
});

app.post('/register', (req, res) => {
    res.render("userdashboard");
});

// GET RID OF APP.GET FOR USERDASHBOARD AND ONLY SHOW THIS WHEN USER LOGINS THROUGH REGISTER PAGE
// app.get('/userdashboard', (req, res) => {
//     res.render("userdashboard");
// });

app.listen(port, (req, res) => {
    console.log("Listening on port 3000!");
});


// MongoDB DATABASE

mongoose.connect("mongodb://localhost:27017/fruitsDB");

