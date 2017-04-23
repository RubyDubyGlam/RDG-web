var passport = require('passport')
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: '1003305543133729',
    clientSecret: '216a6e0705a46d9dfc3f98433fdbcf31',
    callbackURL: "http://localhost:8080/v1/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log(profile)

  	return cb(null, profile)
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


function registerRoutes(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/v1/me', function (req, res) {
  		console.log(req.user)
	})

	app.get('/v1/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

	app.get(
	  '/v1/auth/facebook/callback', 
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {
	  	console.log('sup')
	    // Successful authentication, redirect home.
	    res.redirect('/');
	  });

	app.get('/v1/signup', function (req, res) {
  		console.log('get')
	})

	app.get('/v1/logout', function (req, res) {
  		console.log('get')
	})
}

module.exports = {
	registerRoutes: registerRoutes
}
