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
	    clientID: process.env.GOOGLE_ID || '246933107573-8mf4fgcjqsf448980ct165jm5b44sgsc.apps.googleusercontent.com',
	    clientSecret: process.env.GOOGLE_SECRET || 'YtznwHibfajEG5TT1DEVmLtC',
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

	app.get('/v1/auth/instagram', passport.authenticate('instagram'));

	app.get('/v1/auth/instagram/callback', 
	  passport.authenticate('instagram', { failureRedirect: '/', scope: ['email', 'profile'] }),
	  function(req, res) {
	    res.redirect('/appointment');
	  });

	app.get('/v1/auth/google',
	  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email', 'profile'] }));

	app.get('/v1/auth/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/', scope: ['email', 'profile'] }),
	  function(req, res) {
	    res.redirect('/appointment');
	  });

	app.get('/v1/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

	app.get(
	  '/v1/auth/facebook/callback', 
	  passport.authenticate('facebook', { failureRedirect: '/' }),
	  function(req, res) {
	    res.redirect('/appointment')
	  }
	)
}

module.exports = {
	registerRoutes: registerRoutes
}