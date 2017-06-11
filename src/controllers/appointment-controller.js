var stripe = require("stripe")(
  "sk_test_Lxwnqx79grhDeKqg0XUWMwUi"
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
	'blowout+updo': {
		price: 8500,
		duration: 90,
		name: 'Blowout & Up-do',
	},
	'makeup': {
		price: 6500,
		duration: 60,
		name: 'Makeup',
	},
	'makeup+lashstrip': {
		price: 8500,
		duration: 60,
		name: 'Makeup & Lash Strip',
	},
	'lashextensions': {
		price: 20000,
		duration: 120,
		name: 'Lash Extensions',
	},
	'lashextensions+fill': {
		price: 32500,
		duration: 120,
		name: 'Lash Extensions & Fill',
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

				stripe.charges.create({
				  source: appointment.payment_token,
				  amount: parseInt(product_list[appointment.products].price + appointment.gratuity),
				  currency: "usd",
				  description: "Example charge",
				  metadata: {
				  	gratuity: appointment.gratuity,
				  	subtotal: product_list[appointment.products].price,
				  	service: appointment.products,
				  	customer_id: appointment.customer_id.toString(),
				  	stylist_id: appointment.stylist_id.toString(),
				  	customer_full_name: appointment.customer_full_name,
				  	stylist_full_name: appointment.stylist_full_name,
				  },
				  source: appointment.payment_token,
				}, function(err, order) {
						if (err) {
							return error_cb(err)
						}
						Appointment.findByIdAndUpdate(
							appointment_id, 
							{settled: true, status: 5},
							{new: true},
							function(err, user) {
								if (err) {
									return error_cb(err)
								}

								success_cb(user)
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