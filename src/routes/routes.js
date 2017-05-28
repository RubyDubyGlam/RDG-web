var appointmentRoutes = require('./appointment-routes')
var userRoutes = require('./user-routes')
var authRoutes = require('./auth-routes')

module.exports = {
	registerRoutes: function(app, db, twilio_client, cache) {
		authRoutes.registerRoutes(app, db)
		userRoutes.registerRoutes(app, db)
		appointmentRoutes.registerRoutes(app, db, twilio_client, cache)
	}
}