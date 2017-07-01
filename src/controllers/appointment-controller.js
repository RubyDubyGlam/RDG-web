var stripe = require("stripe")(
  process.env.STRIPE_SECRET || "sk_test_6vH37zGJp5ZIfHC0bEcMdEXa"
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

function initializeController(app, Appointment) {
	return {
		create: function(params, success_cb, error_cb) {
		    Appointment.create(params, function(err, appointment) {
	    		if (err) {
	    			error_cb(err)
	    		} else {
	    			success_cb(appointment)
	    		}
	    	})	   					
		},
		set: function(appointment_id, changes, success_cb, error_cb) {
			Appointment.findByIdAndUpdate(
				appointment_id, 
				changes,
				{new: true},
				function(err, user) {
					if (err) {
						return error_cb(err)
					}

					success_cb(user)
				}
			)	   					
		},
		settle: function(appointment_id, changes, success_cb, error_cb) {
			Appointment.findById(appointment_id, function(err, appointment) {
				if (err) {
					return error_cb(err)
				}

				console.log(err, appointment, 'starting')

				stripe.charges.create({
				  source: appointment.payment_token,
				  amount: appointment.sub_total + appointment.gratuity - appointment.discount,
				  currency: "usd",
				  email: appointment.email_address,
				  metadata: {
				  	gratuity: appointment.gratuity,
				  	subtotal: appointment.sub_total,
				  	discount: appointment.discount,
				  	service: appointment.products,
				  	customer_id: appointment.customer_id.toString(),
				  	stylist_id: appointment.stylist_id.toString(),
				  	customer_full_name: appointment.customer_full_name,
				  	stylist_full_name: appointment.stylist_full_name,
				  },
				}, function(err, order) {
						console.log(err, order, 'success!')

						if (err && error_cb) {
							return error_cb(err)
						}

						Appointment.findByIdAndUpdate(
							appointment_id, 
							{settled: true, status: 6},
							{new: true},
							function(err, user) {
								if (err && error_cb) {
									return error_cb(err)
								}
								success_cb && success_cb(user)
							}
						)
					})			  
				})
		},
		get: function(params, success_cb, error_cb) {
			function handleFetchResponse(err, appointment) {
				if (err) {
					return error_cb(err)
				}
				success_cb(appointment)
			}

			if (typeof params === 'string') {
				Appointment.findById(params, handleFetchResponse)				
			} else {
				Appointment.find(params, handleFetchResponse)
			}
		}
	}
}

module.exports = {
	initializeController: initializeController
}