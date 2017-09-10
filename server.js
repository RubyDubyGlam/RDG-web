var express = require('express')
var registerRoutes = require('./src/routes/routes')
var registerServices = require('./src/services/services')
var mongodb = require("mongodb");
var mongoose = require('mongoose');
var initializeModels = require('./src/schema/schema')
var redis = require("redis")
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var accountSid = process.env.TWILIO_SID || 'ACc25db466a2c0059b6fe9b12b5ec06609'
var authToken = process.env.TWILIO_AUTH || '47da183cb3cf8394b0f260f7c5ada896'

var twilio = require('twilio');
var twilio_client = new twilio(accountSid, authToken);

var path = require('path')

var app = express()

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_6nz6425t:dll89in75qdnq39nsort0gnskv@ds137891.mlab.com:37891/heroku_6nz6425t')

var cache = redis.createClient(process.env.REDIS_URL || 'redis://h:pa253ba6c192c22b45b576a5c93c4576a96617a0f31d5d46271c6330c17b31908@ec2-34-206-162-178.compute-1.amazonaws.com:39849');

cache.flushdb()

initializeModels.initializeModels(mongoose)
registerRoutes.registerRoutes(app, mongoose, twilio_client, cache)
registerServices.registerServices(app, mongoose, twilio_client, cache)

app.get('/', function(req, res, next) {
	if (req.cookies['jwt']) {
		next()
	} else {
		res.sendFile(path.join(__dirname, 'public/landing-index.html'))
	}
})

app.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.use(express.static('public'))

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!')
})