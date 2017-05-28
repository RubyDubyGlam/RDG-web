var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var _ = require('lodash')


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


function registerRoutes(app, db) {
	const base_url = process.env.HOST || "http://localhost:8080"

	passport.use(new Strategy({
	    clientID: '1003305543133729',
	    clientSecret: '216a6e0705a46d9dfc3f98433fdbcf31',
	    callbackURL: base_url + "/v1/auth/facebook/callback",
	    profileFields: ['id', 'emails', 'name']
	  },
	  function(accessToken, refreshToken, profile, cb) {

	  	var User = db.model('User')

	    User.findOrCreate({facebook_id: profile.id}, { 
	    	facebook_id: profile.id,
	    	first_name: profile.name.givenName,
	    	last_name: profile.name.familyName,
	    	email_address: profile.emails[0].value,
		}, function (err, user) {
	      return cb(err, user);
	    })
	  }
	));

	passport.use(new GoogleStrategy({
	    clientID: process.env.GOOGLE_ID,
	    clientSecret: process.env.GOOGLE_SECRET,
	    callbackURL: base_url + "/v1/auth/google/callback"
	  },
	  function(accessToken, refreshToken, profile, cb) {
	  	   var User = db.model('User')

			var photo = _.get(profile, 'photos[0].value')

		    User.findOrCreate({google_id: profile.id}, { 
		    	google_id: profile.id,
		    	first_name: profile.name.givenName,
		    	last_name: profile.name.familyName,
		    	email_address: profile.emails[0].value,
		    	profile_picture: photo
			}, function (err, user) {
		      return cb(err, user);
		    })
	  }
	));

	passport.use(new InstagramStrategy({
	    clientID: '7ab71bbbf974497ba441f53dbb133225',
	    clientSecret: 'a85610256de44acb9f2fbaa98d9beee6',
	    callbackURL: base_url + "/v1/auth/instagram/callback"
	  },
	  function(accessToken, refreshToken, profile, cb) {
	  	   var User = db.model('User')

	  	   var full_name = profile.displayName.split(' ')
	       
	       User.findOrCreate({instagram_id: profile.id}, { 
	       	instagram_id: profile.id,
	    	first_name: full_name[0],
	    	last_name: full_name[1],
	       }, function (err, user) {
	         return cb(err, user);
	       });
	  }
	));

	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/v1/me', function (req, res) {
		if (req.user) {
		   	var User = db.model('User')

			User.findById(req.user._id, 
				function(err, user) {
					console.log(err, user)
					res.json(user)
				}
			)
		} else {
			res.send(400, 'Unauthenticated')
		}
	})

	app.get('/v1/auth/instagram',
		passport.authenticate('instagram') 
	);

	app.get('/v1/auth/instagram/callback', 
	  passport.authenticate('instagram', { failureRedirect: '/', scope: ['email', 'profile'] }),
	  function(req, res) {
	    res.redirect('/');
	  });

	app.get('/v1/auth/google',
	  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email', 'profile'] }));

	app.get('/v1/auth/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/', scope: ['email', 'profile'] }),
	  function(req, res) {
	    res.redirect('/');
	  });

	app.get('/v1/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

	app.get(
	  '/v1/auth/facebook/callback', 
	  passport.authenticate('facebook', { failureRedirect: '/' }),
	  function(req, res) {
	    res.redirect('/')
	  }
	)

	app.get('/v1/stylists', function(req, res) {
		var User = db.model('User')
		
		User.find({ 'roles.stylist' : true }, function(err, users) {
			res.json(users)
		})
	})

	app.get('/v1/user/:id', function(req, res) {
		var User = db.model('User')

		User.findById(req.params.id, function(err, users) {
			res.json(users)
		})
	})

	app.get('/v1/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	app.post( '/v1/user/change-phone-number', function(req, res) {
	   	var User = db.model('User')

		User.findByIdAndUpdate(
			req.user._id, 
			{
				phone_number: req.body.phone_number
			},
			{new: true},
			function(err, user) {
				res.json(user)
			}
		)
	  }
	)
	
	app.post( '/v1/user/change-email-address', function(req, res) {
	   	var User = db.model('User')

		User.findByIdAndUpdate(
			req.user._id, 
			{
				email_address: req.body.email_address
			},
			{new: true},
			function(err, user) {
				res.json(user)
			}
		)
	  }
	)

	app.post( '/v1/user/subscribe', function(req, res) {
	   	var User = db.model('User')

		User.findByIdAndUpdate(
			req.user._id, 
			{
				subscribed: true
			},
			{new: true},
			function(err, user) {
				res.json(user)
			}
		)
	  }
	)

	app.post( '/v1/user/unsubscribe', function(req, res) {
	   	var User = db.model('User')

		User.findByIdAndUpdate(
			req.user._id, 
			{
				subscribed: false
			},
			{new: true},
			function(err, user) {
				console.log(err, user)
				res.json(user)
			}
		)
	  }
	)
}

module.exports = {
	registerRoutes: registerRoutes
}
