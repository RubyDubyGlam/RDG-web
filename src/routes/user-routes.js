var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


function registerRoutes(app, db) {
	passport.use(new Strategy({
	    clientID: '1003305543133729',
	    clientSecret: '216a6e0705a46d9dfc3f98433fdbcf31',
	    callbackURL: "http://localhost:8080/v1/auth/facebook/callback",
	    profileFields: ['id', 'emails', 'name']
	  },
	  function(accessToken, refreshToken, profile, cb) {

	  	var User = db.model('User')

	    User.findOrCreate({ 
	    	facebook_id: profile.id,
	    	first_name: profile.name.givenName,
	    	last_name: profile.name.familyName,
	    	email_address: profile.emails[0].value
		}, function (err, user) {
	      return cb(err, user);
	    })
	  }
	));

	passport.use(new GoogleStrategy({
	    clientID: '246933107573-nbbol2l50kkq4tno95rh96uesskram8b.apps.googleusercontent.com',
	    clientSecret: 's-T5AL86OhUN_ooP2kLijLvK',
	    callbackURL: "http://localhost:8080/v1/auth/google/callback"
	  },
	  function(accessToken, refreshToken, profile, cb) {


	  	   var User = db.model('User')
	       
	       User.findOrCreate({ 
	       	google_id: profile.id,
	    	first_name: profile.name.givenName,
	    	last_name: profile.name.familyName,
	    	email_address: profile.emails[0].value
	       }, function (err, user) {
	         return cb(err, user);
	       });
	  }
	));

	passport.use(new InstagramStrategy({
	    clientID: '7ab71bbbf974497ba441f53dbb133225',
	    clientSecret: 'a85610256de44acb9f2fbaa98d9beee6',
	    callbackURL: "http://localhost:8080/v1/auth/instagram/callback"
	  },
	  function(accessToken, refreshToken, profile, cb) {
	  	   var User = db.model('User')

	  	   var full_name = profile.displayName.split(' ')
	       
	       User.findOrCreate({ 
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
  			res.json(req.user)
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

		User.find({ $or: [{permissions: 1}, {permissions: 2}]}, function(err, users) {
			res.json(users)
		})
	})

	app.get('/v1/user/:id', function(req, res) {
		var User = db.model('User')

		User.findById(req.params.id, function(err, users) {
			res.json(users)
		})
	})
}

module.exports = {
	registerRoutes: registerRoutes
}
