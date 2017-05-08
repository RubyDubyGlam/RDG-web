var NodeGeocoder = require('node-geocoder');
var passport = require('passport')

var options = {
  provider: 'google'
};
 
var geocoder = NodeGeocoder(options);


function registerRoutes(app, db) {

	app.post('/v1/appointment/book', 
		function(req, res) {
	    var Appointment = db.model('Appointment')

	    geocoder.geocode(req.body.address, function(err, location) {
	    	console.log(req.body, req.user)
		    Appointment.create({
		    	customer_id: req.user._id,
		    	address: req.body.address,
		    	latitude: location[0].latitude,
		    	longitude: location[0].longitude,
		    	payment_token: req.body.payment_token,
		    	type: 1,
		    	time: req.body.time,
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

		Appointment.findByIdAndUpdate(
			req.body.appointment_id, 
			{stylist_id: req.body.stylist_id, status: 1},
			{new: true},
			function(err, appointment) {
				res.json(appointment)
			}
		)
	})

	app.post('/v1/appointment/:id/accept', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findByIdAndUpdate(
			req.params.id, 
			{
				stylist_id: req.user._id, 
				status: 2
			},
			{new: true},
			function(err, appointment) {
				res.json(appointment)
			}
		)
	})

	app.post('/v1/appointment/complete', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findByIdAndUpdate(
			req.body.appointment_id, 
			{status: 2},
			{new: true},
			function(err, appointment) {
				console.log(err)
				res.json(appointment)
			}
		)
	})

	app.post('/v1/appointment/cancel', function(req, res) {
	    var Appointment = db.model('Appointment')		

		Appointment.findOneAndUpdate(
			{id: req.body.appointment_id}, 
			{status: 3},
			{new: true},
			function(err, appointment) {
				res.json(appointment)
			}
		)
	})

	app.get('/v1/appointments', function(req, res) {
		var Appointment = db.model('Appointment')

		if(req.user.permissions === 2) {
			Appointment.find({}, function(err, users) {
				res.json(users)
			})			
		}

		if(req.user.permissions === 1) {
			Appointment.find({stylist_id: req.user._id}, function(err, users) {
				res.json(users)
			})			
		}		

		if(req.user.permissions === 0) {
			Appointment.find({customer_id: req.user._id}, function(err, users) {
				res.json(users)
			})			
		}	
	})
}

module.exports = {
	registerRoutes: registerRoutes
}