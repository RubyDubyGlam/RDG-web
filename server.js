var express = require('express')
var registerRoutes = require('./src/routes/user-routes')
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express()

app.use(express.static('public'))
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

registerRoutes.registerRoutes(app)

console.log(process.env)

var db

app.get('/', function (req, res) {
  console.log(req.user)
})

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})