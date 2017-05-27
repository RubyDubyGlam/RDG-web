var NodeGeocoder = require('node-geocoder');
var passport = require('passport')

var options = {
  provider: 'google'
};
 
var geocoder = NodeGeocoder(options);


function registerRoutes(app, db, twilio_client) {

	app.post('/v1/appointment/book', 
		function(req, res) {
	    var Appointment = db.model('Appointment')

	    geocoder.geocode(req.body.address, function(err, location) {
	    	console.log(req.body, req.user)
		    Appointment.create({
		    	customer_id: req.user._id,
		    	customer_full_name: req.user.first_name + ' ' + req.user.last_name,
		    	address: req.body.address,
		    	latitude: location[0].latitude,
		    	longitude: location[0].longitude,
		    	payment_token: req.body.payment_token,
		    	products: req.body.products,
		    	time: req.body.time,
		    	phone_number: req.body.phone_number
	    	}, function(err, Appointment) {
	    		if (err) {
	    			res.json(err)
	    		} else {
	    			res.json(Appointment)
	    		}
	    	})
  			
		});
	})

	app.post('/v1/appointment/assign', function(req, res) {
	    var Appointment = db.model('Appointment')
	    var User = db.model('User')
	    var status
	   	var user_model

	   	User.findById(req.body.stylist_id, function(err, stylist) {
		    if (req.user._id === req.body.stylist_id) {
		    	status = 2
		    } else {
		    	status = 1
		    }

			Appointment.findByIdAndUpdate(
				req.body.appointment_id,
				{
					stylist_id: req.body.stylist_id, 
					status: status,
					stylist_full_name: stylist.first_name + ' ' + stylist.last_name
				},
				{new: true},
				function(err, appointment) {
					res.json(appointment)
				}
			)			
		})
	})

	app.post('/v1/appointment/:id/accept', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findByIdAndUpdate(
			req.params.id, 
			{
				status: 2
			},
			{new: true},
			function(err, appointment) {
				res.json(appointment)
			}
		)
	})

	app.post('/v1/appointment/:id/enroute', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findByIdAndUpdate(
			req.params.id, 
			{
				status: 3
			},
			{new: true},
			function(err, appointment) {
				twilio_client.messages.create({
				    body: 'Your stylist is on the way!',
				    to: '+1' + appointment.phone_number,  // Text this number
				    from: '+18052108161' // From a valid Twilio number
				})
				res.json(appointment)
			}
		)
	})

	app.post('/v1/appointment/:id/begin', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findByIdAndUpdate(
			req.params.id, 
			{
				status: 4
			},
			{new: true},
			function(err, appointment) {
				res.json(appointment)
			}
		)
	})

	app.post('/v1/appointment/:id/complete', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findByIdAndUpdate(
			req.params.id, 
			{
				status: 5
			},
			{new: true},
			function(err, appointment) {
				res.json(appointment)
			}
		)
	})

	app.post('/v1/appointment/:id/cancel', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findByIdAndUpdate(
			req.params.id, 
			{
				status: -1
			},
			{new: true},
			function(err, appointment) {
				res.json(appointment)
			}
		)
	})

	app.get('/v1/appointments', function(req, res) {
		var Appointment = db.model('Appointment')

		if(req.user.roles.admin) {
			return Appointment.find({}, function(err, appointments) {
				res.json(appointments)
			})			
		}

		if(req.user.roles.stylist) {
			return Appointment.find({stylist_id: req.user._id}, function(err, appointments) {
				res.json(appointments)
			})			
		}
		
		return Appointment.find({customer_id: req.user._id}, function(err, appointments) {
			res.json(appointments)
		})
	})
}

module.exports = {
	registerRoutes: registerRoutes
}