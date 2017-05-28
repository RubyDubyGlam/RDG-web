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