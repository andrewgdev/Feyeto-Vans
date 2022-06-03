// SERVER
require('dotenv').config();
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

// MongoDB DATABASE

mongoose.connect("mongodb://localhost:27017/feyetovansDB");

const userSchema = new mongoose.Schema ({
    email: String,
    username: String,
    password: String,
})


userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);

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
    const newUser = new User ({
        email: req.body.username,
        password: req.body.password,
        username: req.body.username
    })
    newUser.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.render("userdashboard");
        }
    });
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("userdashboard");
                }
            } 
        }
    })
});

app.listen(port, (req, res) => {
    console.log("Listening on port 3000!");
});


