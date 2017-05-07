var express = require('express')
var registerRoutes = require('./src/routes/routes')
var mongodb = require("mongodb");
var mongoose = require('mongoose');
var initializeModels = require('./src/schema/schema')

var app = express()

app.use(express.static('public'))
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

mongoose.connect('mongodb://heroku_7fl3kpz2:b26j007ur6e4nmod9k8is6t5l0@ds115701.mlab.com:15701/heroku_7fl3kpz2');

initializeModels.initializeModels(mongoose)

registerRoutes.registerRoutes(app, mongoose)

app.get('/', function (req, res) {
  console.log(req.user)
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
 