// SERVER
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
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

app.get('/join', (req, res) => {
    res.render("join");
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

app.listen(port, (req, res) => {
    console.log("Listening on port 3000!");
});


// MongoDB DATABASE
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB");


