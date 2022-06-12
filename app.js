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

//SCHEMAS
const userSchema = new mongoose.Schema ({
    username: String,
    email: String,
    password: String
})

const createListingSchema = new mongoose.Schema ({
    titleOfListing: String,
    description: String,
    year: String,
    make: String,
    model: String,
    mileage: String,
    wheelbase: String,
    price: String,
    image: Buffer
})

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

//MODELS
const User = new mongoose.model("Users", userSchema);
const Listing = new mongoose.model("Listings", createListingSchema);

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

app.post('/sell', (req, res) => {
    const newListing = new Listing ({
        titleOfListing: req.body.titleOfListing,
        description: req.body.description,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        wheelbase: req.body.wheelbase,
        price: req.body.price,
        image: req.body.image,
    });

    newListing.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/buy");
        }
    });
});

app.post('/register', (req, res) => {
    const newUser = new User ({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    newUser.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/buy");
        }
    });
});

 
app.post('/signin', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.redirect("/buy");
                }
            } 
        }
    })
});

app.listen(port, (req, res) => {
    console.log("Listening on port 3000!");
});


