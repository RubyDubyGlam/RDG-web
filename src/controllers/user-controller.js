function initializeController(app, User) {
	return {
		create: function(params, success_cb, error_cb) {
		    User.create(params, function(err, user) {
	    		if (err) {
	    			error_cb(err)
	    		} else {
	    			success_cb(user)
	    		}
	    	})	   					
		},
		set: function(user_id, changes, success_cb, error_cb) {
			User.findByIdAndUpdate(
				user_id, 
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
			function handleFetchResponse(err, user) {

				if (err) {
					return error_cb(err)
				}
				success_cb(user)
			}

			if (typeof params === 'string') {
				User.findById(params, handleFetchResponse)				
			} else {
				User.find(params, handleFetchResponse)
			}
		},
		getById: function(id, success_cb, error_cb) {
			function handleFetchResponse(err, user) {

				if (err) {
					return error_cb(err)
				}
				success_cb(user)
			}

			User.findById(id, handleFetchResponse)
		}
	}
}

module.exports = {
	initializeController: initializeController
}