var stripe = require("stripe")(
  "sk_test_Lxwnqx79grhDeKqg0XUWMwUi"
);

var sku_list = {
	blowout: 'sku_AmiyrOT10UybnS',
	gratuity: "sku_AmlhwO7bnE8PDR",
}

stripe.orders.create({
  currency: 'usd',
  items: [
    {
      type: 'sku',
      amount: 700000,
      parent: 'sku_AmiyrOT10UybnS',
      quantity: 1,
    },
    {
      type: 'shipping',
      amount: 1000
    }
  ],
})

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

				stripe.orders.create({
				  metadata: {stylist_name: appointment.stylist_full_name},
				  currency: 'usd',
				  items: [
				    {
				      type: 'sku',
				      parent: 'sku_AmiyrOT10UybnS',
				    },
				    {
				      type: 'shipping',
				      amount: Appointment.gratuity
				    }
				  ],
				  email: appointment.email_address
				}, function(err, order) {
					if (err) {
						return error_cb(err)
					}

					stripe.orders.pay(order.id, {
					  source: appointment.payment_token // obtained with Stripe.js
					}, function(err, order) {
						if (err) {
							return error_cb(err)
						}
						Appointment.findByIdAndUpdate(
							appointment_id, 
							{order_id: order.id, settled: true},
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