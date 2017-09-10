var _ = require('lodash')

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var passport = require('passport')

var JwtStrategy = require('passport-jwt').Strategy,
		ExtractJwt = require('passport-jwt').ExtractJwt;
		
const base_url = process.env.HOST || "http://localhost:8080"

var user_controller = require('../controllers/user-controller')

var salt = 'salty salt yum yum'

var options = {
	jwtFromRequest: function(req) {
		var token = null

    if (req && req.cookies) {
        token = req.cookies['jwt']
		}
			
    return token
	},
	secretOrKey: 'shhhhh'
}

passport.serializeUser(function(user, cb) {
	user._id = user._id.toString()
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

function registerRoutes(app, db) {

	var controller = user_controller.initializeController(app, db.model('User'))

	passport.use(new JwtStrategy(options, function(jwt_payload, done) {
			controller.get(
				jwt_payload.id, 
				function(user, err) {
					if (err) {
						return done(err, false);
					}
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				}, 
				function(err) { 
					return done(err, false) 
				}
			)
	}));

	app.post("/v1/auth/login", function(req, res) {
		
		var email_address = req.body.email_address
		var password = req.body.password

		if (!email_address) {
			return res.status(401).json({message:"No email address"})
		} else if (!password) {
			return res.status(401).json({message:"No password"})
		} else {
			controller.get(
				{ email_address: email_address },
				function(user, err) {
					if (!user.length) {
						return res.status(401).json({message:"Invalid user"})
					}

					bcrypt.compare(password, user[0].password, function(err, is_same) {

						if (is_same == true) {
							var payload = {id: user[0]._id}
							var token = jwt.sign(payload, options.secretOrKey)

							res.cookie('jwt', token);

							res.redirect('/')
						} else {
							res.status(401).json({message:"Invalid password"})
						}
					})
				},
				function(err) {
					res.status(401).json({message:"User not found"})
				}
			)
		}
	})

	app.post("/v1/auth/register", function(req, res) {
		var email_address = req.body.email_address
		var password = req.body.password

		if(!email_address){
			return res.status(401).json({message:"Invalid: email address"})
		} else if (!password) {
			return res.status(401).json({message:"Invalid: password"})
		} else {
			controller.get(
				{ email_address: email_address },
				function(user, err) {
					if (user.length && user[0].password) {
						return res.status(401).json({message:"Email address taken"})
					} else if (user.length && !user[0].password) {

						bcrypt.genSalt(10, function(err, salt) {
							bcrypt.hash(password, salt, function(err, hash) {

								controller.set(
									user[0]._id, 
									{ password: hash }, 
									function(user) {
										var payload = {id: user._id}
										var token = jwt.sign(payload, options.secretOrKey)

										res.cookie('jwt', token);

										res.redirect('/')
									},
									function(err) { res.status(401).json({message:"Invalid: something went wrong"}) }
								)
							})
						})
					} else {
						bcrypt.genSalt(10, function(err, salt) {
							bcrypt.hash(password, salt, function(err, hash) {
								var user = controller.create({ email_address: email_address, password: hash }, function(user) {
									var payload = {id: user._id}
									var token = jwt.sign(payload, options.secretOrKey)

									res.cookie('jwt', token);

									res.redirect('/')
								})
							})
						})						
					}
				},
				function(err) {
					return res.status(401).json({message:"Email address taken"})
				}
			)
		}
	})

	app.get('/v1/auth/logout', function(req, res){
		res.cookie('jwt', '')
		res.redirect('/')
	});

	app.use('/v1/*', passport.authenticate('jwt', { session: false }))
}

module.exports = {
	registerRoutes: registerRoutes
}