var user_controller = require('../controllers/user-controller')
var phone = require('phone');

function registerRoutes(app, db) {

	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated())
	    return next();
	  else
	    res.status(401).send()
	}

	function ensureAdmin(req, res, next) {
		if (req.user.roles.admin) {
			return next()
		}

		res.status(401).send()
	}

	function createHandleSuccess(req, res) {
		return function(user) {
			console.log(user, 'user')
			res.json(user)
		}
	}

	function createHandleError(req, res) {
		return function(err) {
			console.log(err, 'err')
			res.status(400).send(err)
		}
	}

	var controller = user_controller.initializeController(app, db.model('User'))

	app.use('/v1/user/*', ensureAuthenticated)

	app.get('/v1/user/me', function (req, res) {
	   	controller.get(
	   		req.user._id,
	   		createHandleSuccess(req, res),
	   		createHandleError(req, res)
	   	)	
	})

	app.get('/v1/user/stylists', ensureAdmin, function(req, res) {
	   	controller.get(
	   		{ 'roles.stylist' : true },
	   		createHandleSuccess(req, res),
	   		createHandleError(req, res)
	   	)
	})

	app.get('/v1/user/:id', ensureAdmin, function(req, res) {
	   	controller.get(
	   		req.params._id,
	   		createHandleSuccess(req, res),
	   		createHandleError(req, res)
	   	)		
	})

	app.get('/v1/user/logout', function(req, res){
	  req.logout();
	  res.redirect('/')
	});

	app.post('/v1/user/change-phone-number', function(req, res) {
		var formatted_phone_number = phone(req.body.phone_number)

		if (!formatted_phone_number.length) {
			return res.status(401).send('Invalid phone number')
		}

	   	controller.set(
	   		req.user._id,
	   		{'phone_number': formatted_phone_number[0]},
	   		createHandleSuccess(req, res),
	   		createHandleError(req, res)
	   	)
	  }
	)
	
	app.post('/v1/user/change-email-address', function(req, res) {
		var email_test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    	if (!email_test.test(req.body.email_address)) {
			return res.status(401).send('Invalid email address')
    	}

	   	controller.set(
	   		req.user._id,
	   		{'email_address': req.body.email_address},
	   		createHandleSuccess(req, res),
	   		createHandleError(req, res)
	   	)
	  }
	)

	app.post('/v1/user/subscribe', function(req, res) {
	   	controller.set(
	   		req.user._id,
	   		{'subscribed': true},
	   		createHandleSuccess(req, res),
	   		createHandleError(req, res)
	   	)
	  }
	)

	app.post('/v1/user/unsubscribe', function(req, res) {
	   	controller.set(
	   		req.user._id,
	   		{'subscribed': false},
	   		createHandleSuccess(req, res),
	   		createHandleError(req, res)
	   	)
	  }
	)
}

module.exports = {
	registerRoutes: registerRoutes
}
