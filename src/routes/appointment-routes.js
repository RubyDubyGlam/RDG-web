var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google'
};
 
var geocoder = NodeGeocoder(options);

var appointment_controller = require('../controllers/appointment-controller')
var user_controller = require('../controllers/user-controller')

var stripe = require("stripe")(
  process.env.STRIPE_SECRET || "sk_test_Lxwnqx79grhDeKqg0XUWMwUi"
);

var product_list = {
  'blowout': {
    price: 5000,
    duration: 45,
    name: 'Blowout',
  },
  'blowout+braid': {
    price: 7500,
    duration: 50,
    name: 'Blowout & Braid',
  },
  'updo': {
    price: 8500,
    duration: 90,
    name: 'Up-do',
  },
  'makeup': {
    price: 7500,
    duration: 60,
    name: 'Makeup',
  },
  'makeup+lashstrip': {
    price: 10000,
    duration: 60,
    name: 'Makeup & Lash Strip',
  },
  'lashextensions': {
    price: 20000,
    duration: 120,
    name: 'Lash Extensions',
  },
  'lashfill': {
    price: 12500,
    duration: 120,
    name: 'Lash Fill',
  },
}

function registerRoutes(app, db, twilio_client, cache) {
	appointment_controller = appointment_controller.initializeController(app, db.model('Appointment'))
	user_controller = user_controller.initializeController(app, db.model('User'))

	function ensureAdmin(req, res, next) {
		if (req.user.roles.admin) {
			return next()
		}

		res.status(401).send()
	}

	function ensureIsSameStylistOrAdmin(req, res, next) {
		if (req.user.roles.admin) {
			return next()
		}

		appointment_controller.get(
			req.params.id,
			function(appointment) {
				if (appointment.stylist_id.toString() == req.user._id.toString()) {
					return next()
				}

				res.send(401).send()
			},
    		createHandleError(req, res)
		)
	}

	function ensureIsSameUserOrAdmin(req, res, next) {
		if (req.user.roles.admin) {
			return next()
		}

		appointment_controller.get(
			req.params.id,
			function(appointment) {
				if (appointment.customer_id === req.user._id) {
					return next()
				}

				res.send(401).send()
			},
    		createHandleError(req, res)
		)
	}

	function createHandleSuccess(req, res) {
		return function(appointment) {
			res.json(appointment)
		}
	}

	function createHandleSuccessNotify(req, res, notification) {
		return function(appointment) {
			twilio_client.messages.create({
			    body: 'Your stylist is on the way! You can reply to this text to contact them',
			    to: appointment.phone_number,  // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
			twilio_client.messages.create({
			    body: 'You can now reply to this text to contact your client',
			    to: appointment.stylist_phone_number,  // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
			res.json(appointment)
		}
	}

	function createHandleSuccessSingleNotify(req, res, notification) {
		return function(appointment) {
			twilio_client.messages.create({
			    body: notification,
			    to: appointment.phone_number,  // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
			res.json(appointment)
		}
	}

	function createHandleSuccessStylistNotify(req, res, notification) {
		return function(appointment) {
			twilio_client.messages.create({
			    body: notification,
			    to: appointment.stylist_phone_number,  // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
			res.json(appointment)
		}
	}

	function createHandleSuccessCreate(req, res, notification) {
		return function(appointment) {
			twilio_client.messages.create({
			    body: 'You have successfully placed your order. We look forward to seeing you soon!',
			    to: appointment.phone_number,  // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
			twilio_client.messages.create({
			    body: 'A new order has been placed.',
			    to: process.env.ADMIN_PHONE || '+18059158479',  // Text this number
			    from: '+18052108161' // From a valid Twilio number
			})
			res.json(appointment)
		}
	}

	function createHandleError(req, res) {
		return function(err) {
			res.status(400).send(err)
		}
	}

	function createHandleSuccessAssign(req, res) {
	   	return function(stylist) {
    		var status = 1

		    if (req.user._id === req.body.stylist_id) {
		    	status = 2
		    }

			appointment_controller.set(
				req.body.appointment_id,
				{
					stylist_id: req.body.stylist_id, 
					status: status,
					stylist_full_name: stylist.first_name + ' ' + stylist.last_name,
					stylist_phone_number: stylist.phone_number
				},
				createHandleSuccessStylistNotify(req, res, 'You have been assigned an appointment. Please check the app and accept.'),
		    	createHandleError(req, res)
			)			
		}
	}

	app.post('/v1/appointment/book', 
		function(req, res) {

	    geocoder.geocode(req.body.address, function(err, location) {

	    	var sub_total = 0

	    	req.body.products.forEach(function(product) {
	    		sub_total = sub_total + product_list[product].price
	    	})

		    var params = {
		    	customer_id: req.user._id,
		    	customer_full_name: req.user.first_name + ' ' + req.user.last_name,
		    	address: req.body.address,
		    	latitude: location[0].latitude,
		    	longitude: location[0].longitude,
		    	payment_token: req.body.payment_token,
		    	products: req.body.products,
		    	time: req.body.time,
		    	phone_number: req.body.phone_number,
		    	email_address: req.body.email_address,
		    	sub_total: sub_total,
	    	}

	    	if (req.body.discount) {
	    		params.discount = req.body.discount.price
	    	}

	    	appointment_controller.create(
	    		params,
	    		createHandleSuccessCreate(req, res),
	    		createHandleError(req, res)
	    	)
  			
		});
	})

	app.post('/v1/appointment/assign', ensureAdmin, function(req, res) {
	   	user_controller.get(
	   		req.body.stylist_id, 
	   		createHandleSuccessAssign(req, res),
			createHandleError(req, res)
		)
	})

	app.post('/v1/appointment/:id/accept', ensureIsSameStylistOrAdmin, function(req, res) {
	    appointment_controller.set(
				req.params.id,
				{ status: 2 },
				createHandleSuccess(req, res),
				createHandleError(req, res)
	    )
	})

	app.post('/v1/appointment/:id/tip', function(req, res) {
	    appointment_controller.set(
			req.params.id,
			{ gratuity: req.body.gratuity },
			createHandleSuccess(req, res),
	    	createHandleError(req, res)
	    )
	})

	app.post('/v1/appointment/:id/enroute', ensureIsSameStylistOrAdmin, function(req, res) {
		var appointment, stylist
		appointment_controller.get(
			req.params.id,
			function(appointment) {
				user_controller.get(
					appointment.stylist_id.toString(),
					function(stylist) {
						cache.set(appointment.phone_number, stylist.phone_number, 'EX', 5400)
						cache.set(stylist.phone_number, appointment.phone_number, 'EX', 5400)

					    appointment_controller.set(
							req.params.id,
							{ status: 3 },
							createHandleSuccessNotify(req, res, 'Your stylist is on the way! You can reply to this text to contact them'),
					    	createHandleError(req, res)
					    )
					},
					createHandleError(req, res)
				)
			},
			createHandleError(req, res)
		)
	})

	app.post('/v1/appointment/:id/begin', ensureIsSameStylistOrAdmin, function(req, res) {
	    appointment_controller.set(
			req.params.id,
			{ status: 4 },
			createHandleSuccess(req, res),
	    	createHandleError(req, res)
	    )
	})

	app.post('/v1/appointment/:id/complete', ensureIsSameStylistOrAdmin, function(req, res) {
	    appointment_controller.set(
			req.params.id,
			{ status: 5 },
			createHandleSuccessSingleNotify(req, res, 'Your appointment is complete! Thank you for using RD Glam. If you were happy with your service, feel free to leave a tip for your stylist by clicking on the "Add Tip" button on your appointment. If you would like to give us feedback, please send an email to info@rubydubyglam.com'),
	    	createHandleError(req, res)
	    )
	})

	app.post('/v1/appointment/:id/settle', ensureIsSameStylistOrAdmin, function(req, res) {
	    appointment_controller.settle(
			req.params.id,
			{ status: 6 },
			createHandleSuccess(req, res),
	    	createHandleError(req, res)
	    )
	})

	app.post('/v1/appointment/:id/cancel', ensureIsSameUserOrAdmin, function(req, res) {
	    appointment_controller.set(
			req.params.id,
			{ status: -1 },
			createHandleSuccess(req, res),
	    	createHandleError(req, res)
	    )
	})

	app.get('/v1/appointment/appointments', function(req, res) {
		var Appointment = db.model('Appointment')

		if(req.user.roles.admin) {
			appointment_controller.get(
				{},
				createHandleSuccess(req, res),
	    		createHandleError(req, res)
			)
		} else if(req.user.roles.stylist) {
			appointment_controller.get(
				{stylist_id: req.user._id},
				createHandleSuccess(req, res),
	    		createHandleError(req, res)
			)			
		} else {
			appointment_controller.get(
				{customer_id: req.user._id},
				createHandleSuccess(req, res),
	    		createHandleError(req, res)
			)				
		}
	})
}

module.exports = {
	registerRoutes: registerRoutes
}